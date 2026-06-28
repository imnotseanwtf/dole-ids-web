#!/usr/bin/env bash
# =============================================================================
#  setup.sh  --  Cross-platform setup for macOS / Linux (mirror of setup.ps1)
# =============================================================================
#  Prepares everything needed to run the app:
#    - ensures PHP 8.3+ and Composer are available (uses your system install, or
#      installs via Homebrew / apt / dnf when missing)
#    - downloads a portable Node.js into ./tools only if Node isn't installed
#    - installs PHP + Node dependencies, builds the frontend
#    - creates a local SQLite database with migrations + seed data
#
#  Usage:
#      ./setup.sh        # one-time setup
#      ./serve.sh        # then start the app -> http://localhost:8000
#
#  Re-running is safe. On Linux, installing PHP via apt/dnf may prompt for sudo.
# =============================================================================
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
SRC="$ROOT/src"
TOOLS="$ROOT/tools"
mkdir -p "$TOOLS"

OS="$(uname -s)"
ARCH="$(uname -m)"

step()  { printf '\n==> %s\n' "$1"; }
have()  { command -v "$1" >/dev/null 2>&1; }
# in-place sed that works on both GNU (Linux) and BSD (macOS)
sed_i() { if sed --version >/dev/null 2>&1; then sed -i "$@"; else sed -i '' "$@"; fi; }

# Docker path: build the image and start the stack.
if [ "${1:-}" = "--docker" ]; then
    have docker || { echo "Docker is not installed or not on PATH. Install Docker, then retry."; exit 1; }
    cd "$ROOT"
    step "Building the Docker image ..."
    docker compose build
    step "Starting the stack (docker compose up -d) ..."
    docker compose up -d
    cat <<'DONE'

==============================================================
 Docker stack is up (app, nginx, Postgres/PostGIS).
 App:   http://localhost:8002  (first load builds in-container, ~1-2 min)
==============================================================
DONE
    exit 0
fi

# -----------------------------------------------------------------------------
# 1. PHP 8.3+
# -----------------------------------------------------------------------------
PHP="php"
if have php && php -r 'exit(version_compare(PHP_VERSION,"8.3.0",">=")?0:1);' 2>/dev/null; then
    : # system PHP is fine
else
    step "PHP 8.3+ not found - attempting to install it ..."
    case "$OS" in
        Darwin)
            if have brew; then brew install php
            else echo "Please install Homebrew (https://brew.sh) or PHP 8.3+, then re-run."; exit 1; fi ;;
        Linux)
            if   have apt-get; then sudo apt-get update && sudo apt-get install -y php-cli php-sqlite3 php-mbstring php-xml php-curl php-zip php-gd php-intl php-bcmath
            elif have dnf;     then sudo dnf install -y php-cli php-pdo php-mbstring php-xml php-gd php-intl php-bcmath php-process
            else echo "No supported package manager found. Install PHP 8.3+ and re-run."; exit 1; fi ;;
        *) echo "Unsupported OS: $OS. Install PHP 8.3+ manually and re-run."; exit 1 ;;
    esac
fi
echo "Using PHP: $($PHP -v | head -n1)"
if ! $PHP -m | grep -qi '^pdo_sqlite$'; then
    echo "WARNING: the 'pdo_sqlite' PHP extension is not enabled - the app needs it for SQLite."
fi

# -----------------------------------------------------------------------------
# 2. Composer
# -----------------------------------------------------------------------------
COMPOSER_PHAR=""
if ! have composer; then
    step "Downloading Composer ..."
    $PHP -r "copy('https://getcomposer.org/installer', '$TOOLS/composer-setup.php');"
    $PHP "$TOOLS/composer-setup.php" --install-dir="$TOOLS" --filename=composer.phar --quiet
    rm -f "$TOOLS/composer-setup.php"
    COMPOSER_PHAR="$TOOLS/composer.phar"
fi
export COMPOSER_HOME="$TOOLS/composer-home"
run_composer() {
    if [ -n "$COMPOSER_PHAR" ]; then "$PHP" "$COMPOSER_PHAR" "$@"; else composer "$@"; fi
}

# -----------------------------------------------------------------------------
# 3. Node.js (system install preferred; otherwise download a portable v22)
# -----------------------------------------------------------------------------
if ! have npm; then
    step "Node.js not found - downloading a portable copy (v22 LTS) ..."
    case "$OS"   in Darwin) NOS=darwin;; Linux) NOS=linux;; *) echo "Unsupported OS for portable Node."; exit 1;; esac
    case "$ARCH" in x86_64|amd64) NARCH=x64;; aarch64|arm64) NARCH=arm64;; *) echo "Unsupported arch: $ARCH"; exit 1;; esac
    IDX="https://nodejs.org/dist/latest-v22.x/"
    FILE="$(curl -fsSL "$IDX" | grep -oE "node-v22\.[0-9.]+-$NOS-$NARCH\.tar\.(gz|xz)" | head -n1)"
    [ -n "$FILE" ] || { echo "Could not find a Node v22 build for $NOS-$NARCH."; exit 1; }
    curl -fsSL "$IDX$FILE" -o "$TOOLS/node.tar"
    rm -rf "$TOOLS/node"; mkdir -p "$TOOLS/node"
    tar -xf "$TOOLS/node.tar" -C "$TOOLS/node" --strip-components=1
    rm -f "$TOOLS/node.tar"
    export PATH="$TOOLS/node/bin:$PATH"
fi
echo "Using Node: $(node -v)  npm: $(npm -v)"

# -----------------------------------------------------------------------------
# 4. Environment file (.env) + SQLite database
# -----------------------------------------------------------------------------
step "Preparing environment (.env) and SQLite database ..."
ENVFILE="$SRC/.env"
if [ ! -f "$ENVFILE" ]; then
    cp "$SRC/.env.example" "$ENVFILE"
    sed_i 's#^APP_URL=.*#APP_URL=http://localhost:8000#' "$ENVFILE"
fi
# DB_CONNECTION=sqlite comes from .env.example; Laravel resolves the file to
# src/database/database.sqlite by default (portable - no absolute path needed).
mkdir -p "$SRC/database"
[ -f "$SRC/database/database.sqlite" ] || : > "$SRC/database/database.sqlite"

# -----------------------------------------------------------------------------
# 5. Install dependencies, build, migrate
# -----------------------------------------------------------------------------
cd "$SRC"

step "Installing PHP dependencies (composer install) ..."
run_composer install --no-interaction --no-progress

if ! grep -q '^APP_KEY=base64:' "$ENVFILE"; then
    step "Generating application key ..."
    "$PHP" artisan key:generate
fi

step "Installing Node dependencies (npm install) ..."
npm install --no-fund --no-audit

step "Building frontend assets (npm run build) ..."
npm run build

step "Running migrations + seeders ..."
"$PHP" artisan migrate --seed --force

cd "$ROOT"
cat <<'DONE'

==============================================================
 Setup complete.
 Start the app with:   ./serve.sh
 Then open:            http://localhost:8000
==============================================================
DONE
