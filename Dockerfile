FROM node:14-slim

WORKDIR /app

COPY package.json .
COPY package-lock.json .

RUN npm install -g serve
RUN npm install

COPY . .

RUN npm run build

EXPOSE 8080

CMD ["serve", "-s", "build", "-l", "8080"]
