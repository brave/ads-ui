FROM node:current-alpine

WORKDIR /ui
COPY . .

ARG REACT_APP_SERVER_ADDRESS="http://localhost:4000/v1"

RUN apk --no-cache add ca-certificates

RUN npm install

RUN npm run build

ENV PORT 3000

EXPOSE ${PORT}

CMD [ "npm", "run", "container" ]
