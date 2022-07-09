FROM node:17.9-alpine as BUILDER

WORKDIR /usr/src/app
RUN export NODE_ENV=production
COPY . .
RUN yarn install --frozen-lockfile --non-interactive --network-timeout 1000000
RUN yarn build


FROM node:17.9-alpine as RUNNER

WORKDIR /usr/src/app
COPY --from=BUILDER /usr/src/app/yarn.lock /usr/src/app/package.json ./
COPY --from=BUILDER /usr/src/app/out ./out
RUN yarn install --production=true --frozen-lockfile --non-interactive --network-timeout 1000000
ENV PATH /usr/src/app/node_modules/.bin:$PATH
CMD [ "yarn", "start" ]
