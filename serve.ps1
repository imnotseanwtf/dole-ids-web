# Starts the Market Analysis app locally using the portable PHP toolchain.
# Usage:
#   .\serve.ps1          # start the Laravel server on http://localhost:8000
#   .\serve.ps1 -Vite    # also start the Vite dev server (HMR) on :5173
param([switch]$Vite)

$ErrorActionPreference = 'Stop'
$root = $PSScriptRoot
$php  = Join-Path $root 'tools\php\php.exe'
$src  = Join-Path $root 'src'

# Put portable PHP on PATH (Wayfinder/Vite shell out to `php artisan`)
$env:PATH = (Join-Path $root 'tools\php') + ';' + $env:PATH

# Use the portable Node copy if setup.ps1 downloaded one (otherwise system Node)
$nodeDir = Join-Path $root 'tools\node'
if (Test-Path (Join-Path $nodeDir 'node.exe')) { $env:PATH = "$nodeDir;" + $env:PATH }

Set-Location $src

if ($Vite) {
    Write-Host "Starting Vite dev server (HMR) on http://localhost:5173 ..." -ForegroundColor Cyan
    Start-Process -FilePath 'npm.cmd' -ArgumentList 'run','dev' -WorkingDirectory $src
}

Write-Host "Starting Laravel server on http://localhost:8000 ..." -ForegroundColor Green
& $php artisan serve --host=127.0.0.1 --port=8000
