FROM node:latest

LABEL maintainer="Ermi"

# COPY
COPY . /src

# working dir
WORKDIR /src

RUN npm install 

# port 8000 
EXPOSE 8000 

# command
CMD npm start