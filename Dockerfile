FROM node:13.7.0


COPY . /app
WORKDIR /app

COPY package.json /app

RUN yarn 
RUN yarn build

EXPOSE 3000

ENV NUXT_PORT=3000
ENV NUXT_HOST=0.0.0.0

CMD ["yarn", "start"]
