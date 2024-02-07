FROM node:alpine

# Create app directory
WORKDIR /app

#copy source 
COPY ./build-output/ /app

RUN ls -la
RUN ls -la /app

# Install app dependencies
EXPOSE 3000

# Start the application
ENTRYPOINT ["npm", "run", "start"]