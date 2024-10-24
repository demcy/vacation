#!/usr/bin/env bash

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
LINE=$(grep COMPOSE_PROJECT_NAME "$DIR"/.env | head -n 1 | xargs)
COMPOSE_PROJECT_NAME=${LINE#COMPOSE_PROJECT_NAME=}

docker exec -ti -u "$(id -u)":"$(id -g)" "${COMPOSE_PROJECT_NAME}_react" sh
