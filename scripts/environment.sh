#!/bin/bash
echo "NODE_ENV=development
PORT=3000
CLIENT_URL=http://localhost:3000

JWT_SECRET=$JWT_SECRET

RESET_TOKEN_EXPIRES_TIME=30
RESET_TOKEN_EXPIRES_TIME_FORMAT=minutes

DB_NAME=node-bloodboiler
DB_HOST=localhost
DB_PORT=27017
DB_USER=
DB_PASSWORD=

MAIL_FROM=no-reply <apps@ioasys.com.br>
MAIL_HOST=smtp.gmail.com
MAIL_PORT=465
MAIL_USER=apps@ioasys.com.br
MAIL_PASS=$MAIL_PASS" > .env