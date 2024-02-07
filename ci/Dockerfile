FROM node:alpine

# Create app directory
WORKDIR /app

#copy source 
COPY . /app

# Install deps 
RUN npm install

# Build 
RUN npm run build

ENTRYPOINT [ "npm", "run", "start" ]