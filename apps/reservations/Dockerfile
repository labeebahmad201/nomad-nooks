# this file has two stages.
FROM node:alpine As development

WORKDIR /usr/src/app

COPY package.json ./

COPY yarn.lock ./

RUN npm install -g yarn --force

RUN yarn install

COPY . ./

RUN yarn run build

FROM node:alpine as production

# setting NODE_ENV=production enables various optimizations, actually other node packages will respect this env variable and optimize their behavior for production builds.  
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package.json ./
COPY yarn.lock ./

RUN npm install -g yarn --force
RUN yarn install --prod

COPY --from=development /usr/src/app/dist ./dist

CMD ["node", "dist/apps/reservations/main"]



