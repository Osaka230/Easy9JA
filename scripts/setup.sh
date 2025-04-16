#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "${YELLOW}Setting up Easy9ja...${NC}"

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "Node.js is not installed. Please install Node.js v18 or higher."
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "npm is not installed. Please install npm."
    exit 1
fi

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "Docker is not installed. Please install Docker."
    exit 1
fi

# Check if Docker Compose is installed
if ! command -v docker-compose &> /dev/null; then
    echo "Docker Compose is not installed. Please install Docker Compose."
    exit 1
fi

# Create environment files
echo -e "${YELLOW}Creating environment files...${NC}"
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env

# Install dependencies
echo -e "${YELLOW}Installing dependencies...${NC}"
npm install

# Install frontend dependencies
echo -e "${YELLOW}Installing frontend dependencies...${NC}"
cd frontend
npm install
cd ..

# Install backend dependencies
echo -e "${YELLOW}Installing backend dependencies...${NC}"
cd backend
npm install
cd ..

# Initialize database
echo -e "${YELLOW}Initializing database...${NC}"
cd backend
npx prisma generate
npx prisma migrate dev
cd ..

# Build Docker images
echo -e "${YELLOW}Building Docker images...${NC}"
docker-compose build

echo -e "${GREEN}Setup completed successfully!${NC}"
echo -e "${YELLOW}To start the application, run:${NC}"
echo -e "docker-compose up" 