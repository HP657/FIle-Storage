FROM node:18

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN mkdir -p uploads && chmod -R 777 uploads

CMD ["node", "index.js"]

EXPOSE 3000
