# Image
FROM oven/bun:alpine

# Set working directory
WORKDIR /app

# Copy the packages
COPY package.json .

# Copy Bun Lock file
COPY bun.lock .

# Install dependencies
RUN bun install

# Copy the rest of the application code
COPY . .

# Expose the application port
EXPOSE 3000

# Start the application
CMD ["bun", "run", "dev"]