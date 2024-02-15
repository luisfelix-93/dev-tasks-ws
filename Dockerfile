# Use the official Node.js image as a base
FROM node:18

# Create working directory and copy necessary files
WORKDIR /app

# Copy all files to working directory
COPY . .

# Install dependencies
RUN npm install

# Command to start the application
ENTRYPOINT npm start
