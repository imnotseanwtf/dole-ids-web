#!/usr/bin/env bash
# Starts the Market Analysis app on macOS / Linux.
# Usage:
#   ./serve.sh           # start the Laravel server on http://localhost:8000
#   ./serve.sh --vite    # also start the Vite dev server (HMR) on :5173
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# Use the portable Node copy if setup.sh downloaded one (otherwise system Node)
[ -d "$ROOT/tools/node/bin" ] && export PATH="$ROOT/tools/node/bin:$PATH"

cd "$ROOT/src"

if [ "${1:-}" = "--vite" ]; then
    echo "Starting Vite dev server (HMR) on http://localhost:5173 ..."
    npm run dev &
fi

echo "Starting Laravel server on http://localhost:8000 ..."
exec php artisan serve --host=127.0.0.1 --port=8000
