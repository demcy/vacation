#!/usr/bin/env bash

export UID=$(id -u)
export GID=$(id -g)
export GIT_USER_EMAIL=$(git config user.email)
export GIT_USER_NAME=$(git config user.name)

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

cd "$DIR" || exit

docker compose up "$@"
