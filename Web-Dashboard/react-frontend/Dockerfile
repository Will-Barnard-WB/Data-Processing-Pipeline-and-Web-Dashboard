# Use Node.js base image
FROM node:18

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the app files (including node_modules)
COPY . /app

# Expose React port for development (optional)
EXPOSE 3000

# Start React development server (optional for development)
CMD ["npm", "start"]
