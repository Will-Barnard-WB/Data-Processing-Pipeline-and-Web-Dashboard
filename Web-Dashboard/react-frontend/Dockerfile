# Use Node.js base image
FROM node:18

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json (lock file is optional)
COPY package.json package-lock.json* ./

# Install dependencies
RUN npm install

# Copy the rest of the app files
COPY . .

# Expose React port
EXPOSE 3000

# Start React development server
CMD ["npm", "start"]
