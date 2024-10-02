# Stage 1: Build the TypeScript app
FROM node:20.17.0-slim as builder

# Set the working directory inside the container
WORKDIR /app

# Step 1: Copy package.json and package-lock.json to a temporary location
COPY package*.json /tmp/

# Step 2: Install dependencies in /tmp to cache them
RUN cd /tmp && npm install

# Step 3: Create the app directory and copy node_modules from /tmp
RUN mkdir -p /app && cp -r /tmp/node_modules /app/

# Step 4: Copy the rest of the application code into /app
COPY . /app

# Step 5: Compile the TypeScript code
RUN npm run build

# Stage 2: Create a smaller production image
FROM node:20.17.0-slim

# Set the working directory inside the container
WORKDIR /app

# Step 6: Copy only the compiled dist folder and package.json from the builder stage
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./

# Step 7: Install only production dependencies
RUN npm install --production

# Expose the application port
EXPOSE 3000

# Define the command to run the app
CMD ["node", "dist/server.js"]
