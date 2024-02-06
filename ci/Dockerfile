# Use an official Node runtime as a parent image
FROM node:alpine

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Bundle app source
COPY . .

# Build your Next.js app
RUN npm run build

# Start the Next.js app
CMD ["npm", "start"]
