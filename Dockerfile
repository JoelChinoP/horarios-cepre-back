# Use Node.js 22 as base image
FROM node:22-alpine

# Set working directory to root
WORKDIR /

ENV HOST 0.0.0.0
ENV PORT 8080
# Copy dependency files first
COPY package*.json ./

# Install dependencies
RUN npm ci --omit=dev

# Copy the entire project, including dist folder
COPY . .

# Expose port
EXPOSE 8080

# Run application from the root
CMD ["node", "dist/src/main.js", "http://*:8080"]