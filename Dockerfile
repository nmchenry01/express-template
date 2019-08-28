FROM keymetrics/pm2:10-alpine

RUN apk update && apk upgrade && \
  apk add --no-cache bash git openssh python2 alpine-sdk

RUN mkdir -p /express-template
WORKDIR /express-tempate

COPY . .

RUN npm i --quiet

EXPOSE 8080
ENTRYPOINT ["pm2-runtime", "npm", "--", "start"]
