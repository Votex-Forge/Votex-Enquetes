FROM node:18 AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

RUN npm install -g @nestjs/cli

COPY . .

RUN npm run build

FROM node:18

WORKDIR /app

COPY --from=build /app/dist ./dist
COPY --from=build /app/package*.json ./

RUN npm install --only=production

RUN apt-get update && apt-get install -y netcat-openbsd

EXPOSE 3000

COPY wait-for.sh /app/wait-for.sh
RUN chmod +x /app/wait-for.sh

EXPOSE 3000

CMD ["/app/wait-for.sh", "enquete_db", "3306", "npm", "run", "start:prod"]
