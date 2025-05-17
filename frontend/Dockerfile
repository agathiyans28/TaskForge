# Use official Node image
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy project files and build
COPY . ./
RUN npm run build

# Use a lightweight image for serving
FROM node:18-alpine

WORKDIR /app
COPY --from=builder /app ./

ENV NODE_ENV=production
EXPOSE 3000

CMD ["npm", "run", "start"]
