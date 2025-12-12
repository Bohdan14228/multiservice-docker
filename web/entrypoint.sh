#!/bin/sh
set -e

MONGO_USER="$(cat /run/secrets/mongo_root_user)"
MONGO_PASS="$(cat /run/secrets/mongo_root_password)"

export MONGO_URL="mongodb://${MONGO_USER}:${MONGO_PASS}@mongo:27017/appdb?authSource=admin"

exec npm start
