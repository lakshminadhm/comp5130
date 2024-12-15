# Use Node.js as the base image
FROM node:22-alpine

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the backend code
COPY . .

# Expose the backend port
EXPOSE 5000

# Define the command to run the backend
CMD ["npm", "start"]
