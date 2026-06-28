#!/bin/bash

cd /var/www/html/

export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

# Install PHP dependencies only when missing. Vendor is platform-independent, so
# a host-built vendor/ mounted in is reused as-is (skips a slow bind-mount run).
if [ ! -f vendor/autoload.php ]; then
    composer install --no-interaction
fi

# Build the frontend only when it hasn't been built yet. When the host already
# shipped public/build (the common transfer case), this is skipped entirely.
if [ ! -f public/build/manifest.json ]; then
    npm install
    npm run build
fi

# Generate an app key only if one isn't set (so we don't rotate it every boot).
if ! grep -q '^APP_KEY=base64:' .env 2>/dev/null; then
    php artisan key:generate
fi

php artisan optimize

# Make the runtime-writable dirs group-writable for www-data. Targeted (not a
# recursive chown of the whole bind-mounted tree, which is slow and a no-op on
# Windows mounts).
chgrp -R www-data storage bootstrap/cache 2>/dev/null || true
chmod -R ug+rwx storage bootstrap/cache 2>/dev/null || true

exec /usr/bin/supervisord -c /etc/supervisor/supervisord.conf
