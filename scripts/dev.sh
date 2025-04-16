#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

# Function to display help
show_help() {
    echo -e "${YELLOW}Easy9ja Development Script${NC}"
    echo "Usage: ./dev.sh [command]"
    echo ""
    echo "Commands:"
    echo "  start       - Start the development environment"
    echo "  stop        - Stop the development environment"
    echo "  restart     - Restart the development environment"
    echo "  logs        - View logs from all services"
    echo "  frontend    - Start frontend development server"
    echo "  backend     - Start backend development server"
    echo "  db          - Run database migrations"
    echo "  test        - Run tests"
    echo "  help        - Show this help message"
}

# Function to start the development environment
start_dev() {
    echo -e "${YELLOW}Starting development environment...${NC}"
    docker-compose up -d
    echo -e "${GREEN}Development environment started!${NC}"
}

# Function to stop the development environment
stop_dev() {
    echo -e "${YELLOW}Stopping development environment...${NC}"
    docker-compose down
    echo -e "${GREEN}Development environment stopped!${NC}"
}

# Function to restart the development environment
restart_dev() {
    stop_dev
    start_dev
}

# Function to view logs
view_logs() {
    echo -e "${YELLOW}Viewing logs...${NC}"
    docker-compose logs -f
}

# Function to start frontend development
start_frontend() {
    echo -e "${YELLOW}Starting frontend development server...${NC}"
    cd frontend
    npm run dev
}

# Function to start backend development
start_backend() {
    echo -e "${YELLOW}Starting backend development server...${NC}"
    cd backend
    npm run dev
}

# Function to run database migrations
run_migrations() {
    echo -e "${YELLOW}Running database migrations...${NC}"
    cd backend
    npx prisma migrate dev
    cd ..
}

# Function to run tests
run_tests() {
    echo -e "${YELLOW}Running tests...${NC}"
    
    # Run backend tests
    echo -e "${YELLOW}Running backend tests...${NC}"
    cd backend
    npm test
    cd ..
    
    # Run frontend tests
    echo -e "${YELLOW}Running frontend tests...${NC}"
    cd frontend
    npm test
    cd ..
}

# Main script logic
case "$1" in
    start)
        start_dev
        ;;
    stop)
        stop_dev
        ;;
    restart)
        restart_dev
        ;;
    logs)
        view_logs
        ;;
    frontend)
        start_frontend
        ;;
    backend)
        start_backend
        ;;
    db)
        run_migrations
        ;;
    test)
        run_tests
        ;;
    help|*)
        show_help
        ;;
esac 