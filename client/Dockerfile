# Use an official Node.js runtime as the base image
FROM node:20-alpine

# Set the working directory in the container to /app
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY ./package.json ./package-lock.json ./

# Install project dependencies
RUN npm ci

# Copy the current directory contents into the container at /app
COPY ./client/ .

# Build the app
RUN npm run build

# Expose port 3000 for the app
EXPOSE 3000

# Define the command to run the app
CMD ["npm", "start"]
