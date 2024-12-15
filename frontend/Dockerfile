# Use Node.js as the base image
FROM node:22-alpine

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install --legacy-peer-deps

# Copy the frontend code
COPY . .

# Build the React app
RUN npm run build

# Use an Nginx image to serve the built files
FROM nginx:alpine

# Copy the build output to the Nginx directory
COPY --from=0 /usr/src/app/build /usr/share/nginx/html

# Expose the default Nginx port
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
