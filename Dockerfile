FROM php:8.4-fpm

# Create user
RUN useradd -m -g www-data doleuser

# Copy application files
COPY src/ /var/www/html/
COPY src/storage/ /var/www/html/storage
WORKDIR /var/www/html/

# Install PHP extensions
COPY --from=mlocati/php-extension-installer /usr/bin/install-php-extensions /usr/local/bin/
RUN install-php-extensions ctype openssl bcmath curl mbstring pdo_pgsql pgsql tokenizer xml zip exif sockets gd intl

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Install Node.js
RUN curl -fsSL https://deb.nodesource.com/setup_22.x | bash - \
    && apt-get install -y nodejs

# Install base packages
RUN apt-get update && apt-get install -y \
    mariadb-client \
    procps \
    supervisor \
    wget \
    ca-certificates \
    fontconfig \
    libfreetype6 \
    libjpeg62-turbo \
    libpng16-16 \
    libx11-6 \
    libxcb1 \
    libxext6 \
    libxrender1 \
    xfonts-75dpi \
    xfonts-base \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Install wkhtmltopdf - try multiple versions for compatibility
RUN cd /tmp \
    && (wget -q https://downloads.wkhtmltopdf.org/0.12/0.12.5/wkhtmltox_0.12.5-1.buster_amd64.deb \
        && dpkg -i wkhtmltox_0.12.5-1.buster_amd64.deb \
        && apt-get install -f -y) \
    || (wget -q https://github.com/wkhtmltopdf/packaging/releases/download/0.12.6-1/wkhtmltox_0.12.6-1.buster_amd64.deb \
        && dpkg -i wkhtmltox_0.12.6-1.buster_amd64.deb \
        && apt-get install -f -y) \
    || echo "wkhtmltopdf installation failed - continuing without it" \
    && rm -f /tmp/wkhtmltox*.deb

# Set permissions
RUN chown -R doleuser:www-data /var/www/html
RUN chmod -R 775 /var/www/html

# Copy configuration files
COPY ./docker/entrypoint.sh /usr/local/bin/entrypoint.sh
COPY ./php/php.ini /usr/local/etc/php/php.ini
COPY ./php/performance.ini /usr/local/etc/php/conf.d/zz-performance.ini
COPY ./php/fpm-performance.conf /usr/local/etc/php-fpm.d/zz-perf.conf
COPY ./supervisor/dole-ids-web.conf /etc/supervisor/conf.d/dole-ids-web.conf

# Make entrypoint executable
RUN chmod +x /usr/local/bin/entrypoint.sh

EXPOSE 9000

ENTRYPOINT ["entrypoint.sh"]
