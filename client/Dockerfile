# Use an official Node.js runtime as the base image
FROM node:20-alpine

# NOTE: The following environment variables are dummy values and should be replaced runtime environment variables
ENV MONGODB_URL=DUMMY_MONGODB_URL
ENV NEXTAUTH_SECRET=DUMMY_NEXTAUTH_SECRET
ENV GOOGLE_CLIENT_ID=DUMMY_GOOGLE_CLIENT_ID
ENV GOOGLE_CLIENT_SECRET=DUMMY_GOOGLE_CLIENT_SECRET
ENV ENGLISH_LEMMATIZER_URL=DUMMY_ENGLISH_LEMMATIZER_URL
ENV OPENAI_API_KEY=DUMMY_OPENAI_API_KEY

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
