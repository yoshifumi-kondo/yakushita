# Use an official Node.js runtime as the base image
FROM node:20-alpine

# Set the working directory in the container to /app
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY ./package.json ./package-lock.json ./

# Install project dependencies
RUN npm ci

# Copy the current directory contents into the container at /app
COPY ./ .

# Define build arguments for secret files
ARG MONGODB_URL_FILE
ARG NEXTAUTH_SECRET_FILE
ARG GOOGLE_CLIENT_ID_FILE
ARG GOOGLE_CLIENT_SECRET_FILE
ARG ENGLISH_LEMMATIZER_URL_FILE
ARG OPENAI_API_KEY_FILE

# Read secret values from files and set them as environment variables
RUN export MONGODB_URL=$(cat $MONGODB_URL_FILE) && \
    export NEXTAUTH_SECRET=$(cat $NEXTAUTH_SECRET_FILE) && \
    export GOOGLE_CLIENT_ID=$(cat $GOOGLE_CLIENT_ID_FILE) && \
    export GOOGLE_CLIENT_SECRET=$(cat $GOOGLE_CLIENT_SECRET_FILE) && \
    export ENGLISH_LEMMATIZER_URL=$(cat $ENGLISH_LEMMATIZER_URL_FILE) && \
    export OPENAI_API_KEY=$(cat $OPENAI_API_KEY_FILE) && \
    rm $MONGODB_URL_FILE $NEXTAUTH_SECRET_FILE $GOOGLE_CLIENT_ID_FILE $GOOGLE_CLIENT_SECRET_FILE $ENGLISH_LEMMATIZER_URL_FILE $OPENAI_API_KEY_FILE

# Build the app
RUN npm run build

# Expose port 3000 for the app
EXPOSE 3000

# Define the command to run the app
CMD ["npm", "start"]
