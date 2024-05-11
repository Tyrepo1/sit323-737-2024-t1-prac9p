# Use the Node.js 18 base image
FROM node:18

# Set the working directory in the container to /usr/src/app
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all other files and directories to the working directory
COPY . .

# Expose port 3000 to the host machine
EXPOSE 3000

# Run the command "node server.js" when the container starts
CMD ["node", "server.js"]