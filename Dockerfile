FROM --platform=linux/amd64 node:16-alpine

COPY . .

RUN npm install --force

RUN npm run build

EXPOSE 3000

CMD [ "npm" , "run", "start"]