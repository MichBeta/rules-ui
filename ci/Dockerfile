FROM node:alpine

# Print the node version
RUN node -v

# Create app directory
WORKDIR /app

# Copy source
COPY ./source-git /app

# List the contents of the app directory again to debug
RUN ls -la /app

# Install app dependencies
RUN npm install

# Build the app
RUN npm run build

# Remove dev dependencies
RUN npm prune --production


# Expose the port
EXPOSE 3000

# Start the application
CMD ["npm", "dev"]