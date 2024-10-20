ARG PHP_IMAGE

FROM ${PHP_IMAGE}

ARG UID
ARG GID
ARG GIT_USER_EMAIL
ARG GIT_USER_NAME

RUN if [ ! -z "$UID" ] && [ ! -z "$GID" ]; then apk add shadow && usermod -u $UID www-data && groupmod -g $GID www-data; fi

RUN apk add --no-cache icu-dev libzip-dev
RUN docker-php-ext-install intl mysqli pdo pdo_mysql zip

RUN apk add --no-cache bash

RUN apk add --no-cache curl

RUN apk add --no-cache wget

RUN apk add --no-cache less

RUN apk add --no-cache git
RUN git config --system user.email "$GIT_USER_EMAIL"
RUN git config --system user.name "$GIT_USER_NAME"

RUN apk add --no-cache openssh

RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/bin --filename=composer

RUN apk add --no-cache mysql-client

RUN apk add --no-cache ssmtp

RUN apk add --no-cache nodejs npm

RUN wget https://get.symfony.com/cli/installer -O - | bash
RUN mv /root/.symfony5/bin/symfony /usr/local/bin/symfony


RUN echo "PS1='\[\033[01;36m\]\u@\h\[\033[00m\]:\[\033[01;35m\]\w\[\033[00m\]\$ '" >> /home/www-data/.bashrc
RUN echo "TERM=xterm-256color" >> /home/www-data/.bashrc

RUN chown -R $UID:$GID /home/www-data
