FROM node:19

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["sh", "-c", "if [ \"$MODE\" = \"DEV\" ]; then npm run start:dev; else npm run build && npm run start; fi"]
