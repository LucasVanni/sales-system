FROM node:19

RUN addgroup -S nonroot \
    && adduser -S nonroot -G nonroot

WORKDIR /usr/src/app

COPY package.json ./

RUN npm install --ignore-scripts

COPY src ./src
COPY .env ./
COPY tsconfig.json ./

EXPOSE 3000

USER nonroot

CMD ["sh", "-c", "if [ \"$MODE\" = \"DEV\" ]; then npm run start:dev; else npm run build && npm run start; fi"]
