# Use an official Node.js runtime as the base image
FROM node:20-alpine

# Define ARG instructions for build-time arguments
ARG MONGODB_URL
ARG NEXTAUTH_SECRET
ARG GOOGLE_CLIENT_ID
ARG GOOGLE_CLIENT_SECRET
ARG ENGLISH_LEMMATIZER_URL
ARG OPENAI_API_KEY

# Set environment variables using the ARG values
ENV MONGODB_URL=$MONGODB_URL
ENV NEXTAUTH_SECRET=$NEXTAUTH_SECRET
ENV GOOGLE_CLIENT_ID=$GOOGLE_CLIENT_ID
ENV GOOGLE_CLIENT_SECRET=$GOOGLE_CLIENT_SECRET
ENV ENGLISH_LEMMATIZER_URL=$ENGLISH_LEMMATIZER_URL
ENV OPENAI_API_KEY=$OPENAI_API_KEY

# Set the working directory in the container to /app
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY ./package.json ./package-lock.json ./

# Install project dependencies
RUN npm ci

# Copy the current directory contents into the container at /app
COPY ./ .

# Set the environment variable to production
ENV NODE_ENV=production

# Build the app
RUN npm run build

# Expose port 3000 for the app
EXPOSE 3000

# Define the command to run the app
CMD ["npm", "start"]
