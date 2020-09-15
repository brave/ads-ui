FROM node:latest

WORKDIR /ui
COPY . .

ARG REACT_APP_SERVER_ADDRESS="http://localhost:4000/v1"

ENV PORT 3000

EXPOSE ${PORT}

RUN npm install

RUN npm run build

CMD [ "npm", "run", "container" ]
