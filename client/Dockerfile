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

# Build the app with build-time environment variables
RUN MONGODB_URL=$(cat $MONGODB_URL_FILE) \
    NEXTAUTH_SECRET=$(cat $NEXTAUTH_SECRET_FILE) \
    GOOGLE_CLIENT_ID=$(cat $GOOGLE_CLIENT_ID_FILE) \
    GOOGLE_CLIENT_SECRET=$(cat $GOOGLE_CLIENT_SECRET_FILE) \
    ENGLISH_LEMMATIZER_URL=$(cat $ENGLISH_LEMMATIZER_URL_FILE) \
    OPENAI_API_KEY=$(cat $OPENAI_API_KEY_FILE) \
    npm run build && \
    rm -f $MONGODB_URL_FILE $NEXTAUTH_SECRET_FILE $GOOGLE_CLIENT_ID_FILE $GOOGLE_CLIENT_SECRET_FILE $ENGLISH_LEMMATIZER_URL_FILE $OPENAI_API_KEY_FILE

# Expose port 3000 for the app
EXPOSE 3000

# Define the command to run the app
CMD ["npm", "start"]
