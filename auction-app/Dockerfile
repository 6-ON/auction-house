FROM node:20-alpine3.19
WORKDIR /app
COPY package*.json .
RUN npm i -yes --verbose
COPY . .
RUN rm .env && mv .docker.env .env
CMD ["sh", "setup-dev.sh"]