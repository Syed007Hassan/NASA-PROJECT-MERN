FROM node:lts-alpine

# Create app directory

WORKDIR /app

# Process can be cached by docker if package.json is not changed
# so we copy it first and install dependencies
COPY package*.json ./

COPY client/package*.json client/
RUN npm run install-client --omit=dev

COPY server/package*.json server/
RUN npm run install-server --omit=dev


COPY client/ client/
RUN npm run build --prefix client

COPY server/ server/

# Bundle app source
USER node

CMD ["npm", "run", "start", "--prefix", "server"]


EXPOSE 5000

# Dockerfile (build) -> Docker Image (run) -> Docker Container


