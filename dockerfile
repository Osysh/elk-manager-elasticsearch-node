# Use the official Node.js image as a base image
FROM node:20

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json files to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Build TypeScript files using npx
RUN npx tsc

# Expose the port that your app runs on
EXPOSE 3010

# Command to run your application
CMD ["node", "dist/index.js"]