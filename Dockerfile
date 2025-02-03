# Use Node.js with Nginx base image
FROM node:20-slim

# Install nginx
RUN apt-get update && apt-get install -y nginx

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./
RUN npm install

RUN rm /etc/nginx/sites-enabled/default

# Copy app source
COPY . /usr/share/nginx/html/
COPY . .

# Copy nginx config
COPY nginx.conf /etc/nginx/conf.d/

# Expose ports
EXPOSE 80
EXPOSE 3000

# Start both nginx and node server
CMD service nginx start && node server.js
