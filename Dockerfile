FROM node:5.10.1
ADD . /app
WORKDIR /app
ENTRYPOINT node index.js