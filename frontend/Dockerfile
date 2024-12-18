FROM node:23-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port for the production server
EXPOSE 5173

# Serve the production build using vite preview
CMD ["npm", "run", "dev"]