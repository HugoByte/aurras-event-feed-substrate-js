FROM node:14.17.5-stretch-slim

# Define working directory
WORKDIR /app

# Copy package.json file to working directory in container
COPY package.json /app

# Install dependencies
RUN npm install

# Copy other project files to container
COPY . .

# Install dependencies
RUN npm run build

# Run a startup command when container starts
CMD ["npm", "start"]