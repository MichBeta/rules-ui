FROM node:alpine

# Print the node version
RUN node -v

# Create app directory
WORKDIR /app

#copy source 
COPY ./source-git /app

RUN ls -la
RUN ls -la /app

# Install app dependencies
RUN npm install

# Build the app
RUN npm run build

# Remove dev dependencies
RUN npm prune --production

# Set the environment
ENV NODE_ENV=development

# Check the environment files
RUN ls -la
RUN ls -la /app

# Expose the port
EXPOSE 3000

# Start the application
ENTRYPOINT ["npm", "run", "start"]