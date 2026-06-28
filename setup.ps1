# =============================================================================
#  setup.ps1  --  One-command setup for a fresh Windows machine (NO ADMIN NEEDED)
# =============================================================================
#  Downloads a self-contained PHP + Composer toolchain into .\tools, installs all
#  PHP and Node dependencies, builds the React frontend, and prepares a local
#  SQLite database with migrations + seed data.
#
#  Prerequisites: none (Node is auto-downloaded if not already installed).
#
#  Usage:
#      .\setup.ps1            # full local setup (portable PHP/Node, SQLite) -> .\serve.ps1
#      .\setup.ps1 -Docker    # one-click Docker: installs Docker Desktop + WSL2 if
#                             #   missing, then builds the image and starts the stack
#                             #   (app, perf-tuned) -> http://localhost:8002
#
#  Re-running is safe: existing downloads/installs are reused. For -Docker on a
#  fresh machine: run once (installs Docker), reboot, run again (builds + starts).
# =============================================================================
param([switch]$Docker)

$ErrorActionPreference = 'Stop'
[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12
$ProgressPreference = 'SilentlyContinue'

$root     = $PSScriptRoot
$src      = Join-Path $root 'src'
$tools    = Join-Path $root 'tools'
$phpDir   = Join-Path $tools 'php'
$php      = Join-Path $phpDir 'php.exe'
$composer = Join-Path $tools 'composer.phar'

function Step($m) { Write-Host "`n==> $m" -ForegroundColor Cyan }

function Find-DockerExe {
    $cmd = Get-Command docker -ErrorAction SilentlyContinue
    if ($cmd) { return $cmd.Source }
    $p = 'C:\Program Files\Docker\Docker\resources\bin\docker.exe'
    if (Test-Path $p) { return $p }
    return $null
}

function Test-RebootPending {
    return (Test-Path 'HKLM:\SOFTWARE\Microsoft\Windows\CurrentVersion\Component Based Servicing\RebootPending')
}

function Test-DockerEngine($exe) {
    # Probe the daemon without letting a stderr-writing failure throw under
    # $ErrorActionPreference = 'Stop' (the engine-down case writes to stderr).
    $prev = $ErrorActionPreference
    $ErrorActionPreference = 'SilentlyContinue'
    & $exe info > $null 2>&1
    $ok = ($LASTEXITCODE -eq 0)
    $ErrorActionPreference = $prev
    return $ok
}

# -----------------------------------------------------------------------------
# Docker path: install Docker Desktop + WSL2 if needed, then build & start the
# whole stack (app, nginx, Postgres/PostGIS). One click -
# the only manual step is the unavoidable Windows reboot after a fresh install.
# -----------------------------------------------------------------------------
if ($Docker) {
    Set-Location $root
    $dockerExe = Find-DockerExe

    # 1) Install Docker Desktop + WSL2 if Docker isn't present yet.
    if (-not $dockerExe) {
        if (-not (Get-Command winget -ErrorAction SilentlyContinue)) {
            Write-Error 'winget not found. Install Docker Desktop from https://www.docker.com/products/docker-desktop/ then re-run: .\setup.ps1 -Docker'
            exit 1
        }
        Step 'Installing Docker Desktop (approve the UAC prompt if it appears) ...'
        winget install --id Docker.DockerDesktop -e --accept-package-agreements --accept-source-agreements
        Step 'Enabling the WSL2 backend (approve the UAC prompt if it appears) ...'
        wsl --install --no-distribution
        Write-Host "`n==============================================================" -ForegroundColor Yellow
        Write-Host " Docker Desktop + WSL2 installed - a RESTART is required." -ForegroundColor Yellow
        Write-Host "   1) Reboot Windows." -ForegroundColor Yellow
        Write-Host "   2) Run again:  .\setup.ps1 -Docker   (finishes build + start)" -ForegroundColor Yellow
        Write-Host "==============================================================" -ForegroundColor Yellow
        exit 0
    }

    # 2) Make sure the Docker engine is running (start Docker Desktop, wait).
    if (-not (Test-DockerEngine $dockerExe)) {
        if (Test-RebootPending) {
            Write-Host "`nA restart is still pending. Reboot Windows, then run: .\setup.ps1 -Docker" -ForegroundColor Yellow
            exit 0
        }
        Step 'Starting Docker Desktop and waiting for the engine (up to 5 min) ...'
        $dd = 'C:\Program Files\Docker\Docker\Docker Desktop.exe'
        if (Test-Path $dd) { Start-Process -FilePath $dd }
        $engineUp = $false
        for ($i = 0; $i -lt 60; $i++) {
            Start-Sleep -Seconds 5
            if (Test-DockerEngine $dockerExe) { $engineUp = $true; break }
        }
        if (-not $engineUp) {
            Write-Error 'Docker engine did not start. Open Docker Desktop, wait for "Engine running", then re-run: .\setup.ps1 -Docker'
            exit 1
        }
    }

    # 3) Build the image and start the stack (perf tuning baked into the image/compose).
    Step 'Building the Docker image ...'
    & $dockerExe compose build
    if ($LASTEXITCODE -ne 0) { Write-Error 'Docker build failed.'; exit 1 }
    Step 'Starting the stack (docker compose up -d) ...'
    & $dockerExe compose up -d
    if ($LASTEXITCODE -ne 0) { Write-Error 'docker compose up failed.'; exit 1 }
    Write-Host "`n==============================================================" -ForegroundColor Green
    Write-Host " Docker stack is up (app, nginx, Postgres/PostGIS)." -ForegroundColor Green
    Write-Host " App:    http://localhost:8002  (first load builds in-container, ~1-2 min)" -ForegroundColor Green
    Write-Host "==============================================================" -ForegroundColor Green
    exit 0
}

New-Item -ItemType Directory -Force -Path $tools | Out-Null

# -----------------------------------------------------------------------------
# 1. Portable PHP 8.4 (NTS x64)
# -----------------------------------------------------------------------------
if (-not (Test-Path $php)) {
    Step 'Downloading portable PHP 8.4 ...'
    $base = 'https://windows.php.net/downloads/releases/'
    $rel  = (Invoke-WebRequest $base -UseBasicParsing).Links.href |
                Where-Object { $_ -match 'php-8\.4\.\d+-nts-Win32-vs17-x64\.zip$' } |
                Select-Object -First 1
    if (-not $rel) {
        # Older patch releases get moved to the archives directory.
        $base = 'https://windows.php.net/downloads/releases/archives/'
        $rel  = (Invoke-WebRequest $base -UseBasicParsing).Links.href |
                    Where-Object { $_ -match 'php-8\.4\.\d+-nts-Win32-vs17-x64\.zip$' } |
                    Select-Object -Last 1
    }
    if (-not $rel) { throw 'Could not locate a PHP 8.4 NTS x64 build to download.' }
    $url = $base + [System.IO.Path]::GetFileName($rel)
    $zip = Join-Path $tools 'php.zip'
    Invoke-WebRequest -Uri $url -OutFile $zip -UseBasicParsing
    if (Test-Path $phpDir) { Remove-Item -Recurse -Force $phpDir }
    Expand-Archive -Path $zip -DestinationPath $phpDir -Force
    Remove-Item $zip -Force
    Write-Host "    installed $([System.IO.Path]::GetFileName($url))"
} else {
    Write-Host '==> PHP already present, skipping download.' -ForegroundColor DarkGray
}

# Configure php.ini (enable the extensions this app needs)
Step 'Configuring php.ini ...'
$ini = Join-Path $phpDir 'php.ini'
Copy-Item (Join-Path $phpDir 'php.ini-development') $ini -Force
$content = Get-Content $ini -Raw
$extPath = ((Join-Path $phpDir 'ext') -replace '\\','/')
$content = $content -replace '(?m)^;?\s*extension_dir\s*=\s*"ext"', ('extension_dir = "' + $extPath + '"')
foreach ($e in @('bcmath','curl','fileinfo','gd','gmp','intl','mbstring','exif','openssl','pdo_sqlite','sqlite3','pdo_pgsql','pgsql','zip','sockets')) {
    $content = $content -replace ('(?m)^;extension=' + [regex]::Escape($e) + '\s*$'), ('extension=' + $e)
}
Set-Content -Path $ini -Value $content -Encoding utf8
$env:PATH = "$phpDir;" + $env:PATH   # so `php` and Wayfinder/Vite resolve it

# -----------------------------------------------------------------------------
# 2. Composer
# -----------------------------------------------------------------------------
if (-not (Test-Path $composer)) {
    Step 'Downloading Composer ...'
    $installer = Join-Path $tools 'composer-setup.php'
    Invoke-WebRequest -Uri 'https://getcomposer.org/installer' -OutFile $installer -UseBasicParsing
    & $php $installer --install-dir=$tools --filename=composer.phar --quiet
    Remove-Item $installer -Force
} else {
    Write-Host '==> Composer already present, skipping download.' -ForegroundColor DarkGray
}
$env:COMPOSER_HOME = Join-Path $tools 'composer-home'

# -----------------------------------------------------------------------------
# 3. Node.js (use system install if present, otherwise download a portable copy)
# -----------------------------------------------------------------------------
$nodeCmd = Get-Command node -ErrorAction SilentlyContinue
if ($nodeCmd) {
    $npm = 'npm'
    Write-Host "==> Using system Node.js ($($nodeCmd.Source))" -ForegroundColor DarkGray
} else {
    $nodeDir = Join-Path $tools 'node'
    if (-not (Test-Path (Join-Path $nodeDir 'node.exe'))) {
        Step 'Node.js not found - downloading a portable copy (v22 LTS) ...'
        $idx  = 'https://nodejs.org/dist/latest-v22.x/'
        $file = (Invoke-WebRequest $idx -UseBasicParsing).Links.href |
                    Where-Object { $_ -match '^node-v22\.[\d.]+-win-x64\.zip$' } |
                    Select-Object -First 1
        if (-not $file) { throw 'Could not locate a Node.js v22 win-x64 build to download.' }
        $zip = Join-Path $tools 'node.zip'
        Invoke-WebRequest -Uri ($idx + $file) -OutFile $zip -UseBasicParsing
        $tmp = Join-Path $tools 'node-tmp'
        if (Test-Path $tmp) { Remove-Item -Recurse -Force $tmp }
        Expand-Archive -Path $zip -DestinationPath $tmp -Force
        Move-Item (Get-ChildItem $tmp -Directory | Select-Object -First 1).FullName $nodeDir
        Remove-Item $zip -Force; Remove-Item -Recurse -Force $tmp
    }
    $env:PATH = "$nodeDir;" + $env:PATH
    $npm = Join-Path $nodeDir 'npm.cmd'
}

# -----------------------------------------------------------------------------
# 4. Environment file (.env) + APP_KEY + SQLite database
# -----------------------------------------------------------------------------
Step 'Preparing environment (.env) and SQLite database ...'
$envFile = Join-Path $src '.env'
if (-not (Test-Path $envFile)) {
    Copy-Item (Join-Path $src '.env.example') $envFile -Force
    # Local dev runs on the built-in PHP server at :8000
    (Get-Content $envFile -Raw) -replace '(?m)^APP_URL=.*', 'APP_URL=http://localhost:8000' |
        Set-Content $envFile -Encoding utf8
}
# DB_CONNECTION=sqlite (from .env.example); Laravel resolves the file to
# src/database/database.sqlite by default, so no absolute path is needed.
$dbDir = Join-Path $src 'database'
New-Item -ItemType Directory -Force -Path $dbDir | Out-Null
$dbFile = Join-Path $dbDir 'database.sqlite'
if (-not (Test-Path $dbFile)) { New-Item -ItemType File -Path $dbFile | Out-Null }

# -----------------------------------------------------------------------------
# 5. Install dependencies, build, migrate
# -----------------------------------------------------------------------------
Set-Location $src

Step 'Installing PHP dependencies (composer install) ...'
& $php $composer install --no-interaction --no-progress

if (-not (Select-String -Path $envFile -Pattern '^APP_KEY=base64:' -Quiet)) {
    Step 'Generating application key ...'
    & $php artisan key:generate
}

Step 'Installing Node dependencies (npm install) ...'
& $npm install --no-fund --no-audit

Step 'Building frontend assets (npm run build) ...'
& $npm run build

Step 'Running migrations + seeders ...'
& $php artisan migrate --seed --force

Set-Location $root
Write-Host "`n==============================================================" -ForegroundColor Green
Write-Host " Setup complete." -ForegroundColor Green
Write-Host " Start the app with:   .\serve.ps1" -ForegroundColor Green
Write-Host " Then open:            http://localhost:8000" -ForegroundColor Green
Write-Host "==============================================================" -ForegroundColor Green
