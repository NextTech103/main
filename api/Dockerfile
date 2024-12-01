# Use an official Node.js runtime as a parent image
FROM node:20-slim
# Set the working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application
COPY . .

# Expose the API port (adjust if different)
EXPOSE 5000

# Start the API server
CMD ["npm", "start"]
