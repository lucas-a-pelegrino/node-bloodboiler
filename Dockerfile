FROM node:14-alpine AS base

# Installing the latest version of NPM for performance improvements
RUN npm i -g npm@latest

EXPOSE 3000

ENV NODE_ENV=production

WORKDIR /node

COPY package*.json ./
RUN mkdir app && chown -R node:node .
USER node

# Using npm ci here so only the package-lock.json file is used
RUN npm ci \
    && npm cache clean --force

# Development environment only
FROM base AS development

ENV NODE_ENV=development

ENV PATH=/node/node_modules/.bin:$PATH

WORKDIR /node

RUN npm install

WORKDIR /node/app

# This gets the source code into the builder for use in the next two stages,
# it gets its own stage so there's no need to copy it twice.
#
# This stage starts from the first one and skips the last two
FROM base as source

WORKDIR /node/app

COPY . .

# Used for unit/integration testing only
FROM source as test

ENV NODE_ENV=development
ENV PATH=/node/node_modules/.bin:$PATH

# This copies all dependencies (prod + dev)
COPY --from=development /node/node_modules /node/node_modules

# Runs linters as part of build
RUN eslint . 

# Final production stage
FROM base as production

WORKDIR /node/app

COPY . .