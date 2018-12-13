FROM node:latest

WORKDIR /ui
COPY . .

ENV PORT 3000

ENV REACT_APP_SERVER_ADDRESS "http://localhost:3000/v1"

EXPOSE ${PORT}

RUN npm install

RUN npm run build

CMD [ "npm", "run", "container" ]
