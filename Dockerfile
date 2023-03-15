FROM node:lts-alpine

# Create app directory

WORKDIR /app

# Install app dependencies

COPY . .

RUN npm install --only=production

RUN npm run build --prefix client

# Bundle app source
USER node

CMD ["npm", "start", "--prefix", "server"]

EXPOSE 5000




