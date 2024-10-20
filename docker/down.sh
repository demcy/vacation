#!/usr/bin/env bash

export UID
GID=$(id -g)
export GID
GIT_USER_EMAIL=$(git config user.email)
export GIT_USER_EMAIL
GIT_USER_NAME=$(git config user.name)
export GIT_USER_NAME

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

cd "$DIR" || exit

docker compose down
