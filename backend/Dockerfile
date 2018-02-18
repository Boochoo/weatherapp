FROM node:latest

LABEL maintainer="Ermi"

# COPY
COPY . /app

# workdir
WORKDIR /app

# install node modules
RUN npm install 

# port
EXPOSE 9000

# start app
CMD [ "node", "src/index.js" ]
