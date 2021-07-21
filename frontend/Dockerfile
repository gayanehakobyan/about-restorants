# from base image node
FROM node:8.11-slim

WORKDIR /usr/src/app
COPY package*.json ./
RUN npm i
COPY . .
RUN npm run dev
RUN cd build && ls -la

