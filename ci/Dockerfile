FROM node:alpine

# Create app directory
WORKDIR /app

#copy source 
COPY . /app

CMD ls -la

# Install app dependencies
EXPOSE 3000

# Start the application
ENTRYPOINT ["npm", "run", "start"]