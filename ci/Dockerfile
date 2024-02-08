# Stage 1: Building the application
FROM node:alpine as builder

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json (or yarn.lock) files
COPY package*.json ./
COPY run.sh ./

RUN npm init -y

# Install dependencies
RUN npm install

# Copy the rest of your application's code
COPY . .

# Build the application
RUN npm run build

# Stage 2: Serve the application
FROM node:alpine

# Set the working directory in the container
WORKDIR /app

# Copy over the built artifacts from the builder stage
COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/run.sh ./

# Expose the port Next.js runs on
EXPOSE 3000

# Run the application
ENTRYPOINT ["./run.sh"]
CMD ["./run.sh"]