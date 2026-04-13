# Base Image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy rest of application code
COPY . .

# Tell Docker to listen on port 3000
EXPOSE 3000

# Command to start application
CMD ["node", "app/app.js"]