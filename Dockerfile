FROM node:current-alpine

WORKDIR /app

# Upgrading yarn to its latest version
RUN npm install -g --force yarn

EXPOSE 3000
CMD ["/bin/sh", "-c", "yarn install && yarn run watch"]
