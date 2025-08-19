#!/bin/bash

# CryptoFuture Platform Deployment Script
# Usage: ./deploy.sh [platform]
# Platforms: vercel, netlify, railway, render, heroku, docker

set -e

PLATFORM=${1:-"vercel"}
echo "🚀 Deploying CryptoFuture Platform to $PLATFORM..."

# Check prerequisites
check_prerequisites() {
    echo "📋 Checking prerequisites..."
    
    if ! command -v node &> /dev/null; then
        echo "❌ Node.js is not installed"
        exit 1
    fi
    
    if ! command -v npm &> /dev/null; then
        echo "❌ npm is not installed"
        exit 1
    fi
    
    echo "✅ Prerequisites check passed"
}

# Install dependencies
install_dependencies() {
    echo "📦 Installing dependencies..."
    npm ci
    echo "✅ Dependencies installed"
}

# Build application
build_app() {
    echo "🏗️ Building application..."
    case $PLATFORM in
        "netlify"|"vercel-frontend")
            npm run build:frontend
            ;;
        "railway"|"render-backend"|"heroku")
            npm run build:backend
            ;;
        *)
            npm run build
            ;;
    esac
    echo "✅ Build completed"
}

# Deploy based on platform
deploy_to_platform() {
    echo "🌐 Deploying to $PLATFORM..."
    
    case $PLATFORM in
        "vercel")
            if ! command -v vercel &> /dev/null; then
                echo "Installing Vercel CLI..."
                npm install -g vercel
            fi
            vercel --prod
            ;;
            
        "netlify")
            if ! command -v netlify &> /dev/null; then
                echo "Installing Netlify CLI..."
                npm install -g netlify-cli
            fi
            netlify deploy --prod
            ;;
            
        "heroku")
            if ! command -v heroku &> /dev/null; then
                echo "❌ Heroku CLI is not installed. Please install it first."
                exit 1
            fi
            git add .
            git commit -m "Deploy to Heroku - $(date)"
            git push heroku main
            ;;
            
        "docker")
            echo "Building Docker image..."
            docker build -t cryptofuture .
            echo "Starting Docker container..."
            docker run -d -p 3000:3000 --name cryptofuture-app cryptofuture
            echo "✅ Docker deployment completed. App running on http://localhost:3000"
            ;;
            
        "docker-compose")
            echo "Starting with Docker Compose..."
            docker-compose up --build -d
            echo "✅ Docker Compose deployment completed. App running on http://localhost:3001"
            ;;
            
        *)
            echo "❌ Unknown platform: $PLATFORM"
            echo "Available platforms: vercel, netlify, heroku, docker, docker-compose"
            exit 1
            ;;
    esac
}

# Setup environment variables reminder
setup_env_reminder() {
    echo "🔧 Environment Variables Reminder:"
    echo "Don't forget to set these environment variables in your deployment platform:"
    echo "  - NODE_ENV=production"
    echo "  - PORT=3000 (or platform default)"
    echo "  - CORS_ORIGIN=https://your-domain.com"
    echo ""
    echo "📖 For detailed instructions, see DEPLOYMENT_GUIDE.md"
}

# Main execution
main() {
    echo "🎯 CryptoFuture Platform Deployment"
    echo "Platform: $PLATFORM"
    echo "----------------------------------------"
    
    check_prerequisites
    install_dependencies
    build_app
    deploy_to_platform
    setup_env_reminder
    
    echo "----------------------------------------"
    echo "🎉 Deployment process completed!"
    echo "📖 Check DEPLOYMENT_GUIDE.md for troubleshooting"
}

# Help function
show_help() {
    echo "CryptoFuture Platform Deployment Script"
    echo ""
    echo "Usage: ./deploy.sh [platform]"
    echo ""
    echo "Available platforms:"
    echo "  vercel          - Deploy to Vercel (default)"
    echo "  netlify         - Deploy to Netlify"
    echo "  heroku          - Deploy to Heroku"
    echo "  docker          - Build and run Docker container"
    echo "  docker-compose  - Deploy with Docker Compose"
    echo ""
    echo "Examples:"
    echo "  ./deploy.sh vercel"
    echo "  ./deploy.sh netlify"
    echo "  ./deploy.sh docker"
    echo ""
    echo "For detailed deployment instructions, see DEPLOYMENT_GUIDE.md"
}

# Check for help flag
if [[ "$1" == "-h" ]] || [[ "$1" == "--help" ]]; then
    show_help
    exit 0
fi

# Run main function
main
