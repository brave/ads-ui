FROM node:latest

COPY . /ui
WORKDIR /ui

ENV PORT 3000

ENV REACT_APP_SERVER_ADDRESS "http://localhost:3000"

EXPOSE ${PORT}

RUN npm install

ENTRYPOINT [ "npm", "run", "container" ]
