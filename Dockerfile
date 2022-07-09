FROM node:17.9-alpine AS BUILD
WORKDIR /usr/src/app
RUN export NODE_ENV=production
COPY . .
RUN yarn install --frozen-lockfile --non-interactive --network-timeout 1000000
RUN yarn build

FROM node:17.9-alpine AS DEPS
WORKDIR /usr/src/app
COPY --from=BUILD /usr/src/app/yarn.lock /usr/src/app/package.json ./
RUN yarn install --production --frozen-lockfile --non-interactive --network-timeout 1000000


FROM node:17.9-alpine AS RUN
WORKDIR /usr/src/app
COPY --from=DEPS /usr/src/app/node_modules ./node_modules
COPY --from=BUILD /usr/src/app/out ./out

CMD [ "yarn", "start" ]
