FROM anapsix/nodejs

RUN apk add --no-cache make gcc g++ python ruby bash
RUN npm install npm-run-all
RUN npm install grunt -g

EXPOSE 1337

