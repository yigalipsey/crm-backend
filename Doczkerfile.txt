FROM node:16-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install --save-dev nodemon 

COPY . .

# Expose port 8080
EXPOSE 8080

CMD [ "npm", "start" ]
