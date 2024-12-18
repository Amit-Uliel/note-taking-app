# syntax=docker/dockerfile:1

ARG NODE_VERSION=23

FROM node:${NODE_VERSION}-alpine

RUN npm install -g nodemon

WORKDIR /app

COPY package*.json .

RUN npm install --omit=dev

# Copy the rest of the source files into the image.
COPY . .

# Expose the port that the application listens on.
EXPOSE 5001

# Run the application.
CMD ["npm", "run", "dev"]
