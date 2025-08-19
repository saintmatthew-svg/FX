# 🚀 CryptoFuture Platform Deployment Guide

This guide covers multiple deployment strategies for your CryptoFuture platform, including both frontend and backend deployment options.

## 📋 Table of Contents

1. [Project Structure](#project-structure)
2. [Prerequisites](#prerequisites)
3. [Environment Configuration](#environment-configuration)
4. [Build Commands](#build-commands)
5. [Deployment Options](#deployment-options)
   - [Option 1: Vercel (Recommended for Full Stack)](#option-1-vercel-recommended-for-full-stack)
   - [Option 2: Netlify (Frontend) + Railway (Backend)](#option-2-netlify-frontend--railway-backend)
   - [Option 3: Render (Full Stack)](#option-3-render-full-stack)
   - [Option 4: Heroku (Full Stack)](#option-4-heroku-full-stack)
   - [Option 5: Docker Deployment](#option-5-docker-deployment)
6. [Separate Frontend/Backend Deployment](#separate-frontendbbackend-deployment)
7. [Troubleshooting](#troubleshooting)

## 📁 Project Structure

```
cryptofuture/
├── client/              # React frontend
├── server/              # Express backend routes
├── api/                 # API entry points
├── shared/              # Shared types and utilities
├── dist/
│   ├── spa/            # Built frontend
│   └── server/         # Built backend
├── netlify/functions/   # Netlify serverless functions
├── docker-compose.yml   # Docker composition
├── Dockerfile          # Docker configuration
└── various config files
```

## ✅ Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- Git repository (for deployments)
- Account on chosen deployment platform

## 🔧 Environment Configuration

### 1. Copy Environment Template

```bash
cp .env.example .env
```

### 2. Configure Environment Variables

#### For Development:
```env
NODE_ENV=development
PORT=3000
CORS_ORIGIN=http://localhost:8080
FRONTEND_URL=http://localhost:8080
```

#### For Production:
```env
NODE_ENV=production
PORT=3000
CORS_ORIGIN=https://your-frontend-domain.com
FRONTEND_URL=https://your-frontend-domain.com
```

## 🏗️ Build Commands

### Local Development
```bash
npm run dev          # Start development server
```

### Production Builds
```bash
npm run build        # Build both frontend and backend
npm run build:frontend  # Build only frontend
npm run build:backend   # Build only backend
npm run start:prod   # Start production server
```

### Preview Production Build
```bash
npm run preview      # Build and start production server
```

---

## 🚀 Deployment Options

## Option 1: Vercel (Recommended for Full Stack)

**Best for:** Full-stack deployment with serverless functions

### Step 1: Prepare Your Repository
```bash
git add .
git commit -m "Prepare for Vercel deployment"
git push origin main
```

### Step 2: Deploy to Vercel

#### Method A: Vercel CLI
```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# For production
vercel --prod
```

#### Method B: Vercel Dashboard
1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import your Git repository
4. Configure settings:
   - **Build Command:** `npm run build:frontend`
   - **Output Directory:** `dist/spa`
   - **Install Command:** `npm install`

### Step 3: Configure Environment Variables
In Vercel dashboard:
1. Go to Project Settings → Environment Variables
2. Add:
   ```
   NODE_ENV=production
   CORS_ORIGIN=https://your-app.vercel.app
   ```

### Step 4: Custom Domain (Optional)
1. Go to Project Settings → Domains
2. Add your custom domain
3. Update CORS_ORIGIN environment variable

---

## Option 2: Netlify (Frontend) + Railway (Backend)

**Best for:** Separate frontend/backend deployment

### Part A: Deploy Frontend to Netlify

#### Step 1: Build Frontend
```bash
npm run build:frontend
```

#### Step 2: Deploy to Netlify

##### Method A: Netlify CLI
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Deploy
netlify deploy

# For production
netlify deploy --prod
```

##### Method B: Netlify Dashboard
1. Go to [netlify.com](https://netlify.com)
2. Drag and drop `dist/spa` folder
3. Or connect Git repository with settings:
   - **Build Command:** `npm run build:frontend`
   - **Publish Directory:** `dist/spa`

### Part B: Deploy Backend to Railway

#### Step 1: Prepare Backend
```bash
npm run build:backend
```

#### Step 2: Deploy to Railway
1. Go to [railway.app](https://railway.app)
2. Click "Deploy from GitHub repo"
3. Select your repository
4. Railway will automatically detect `railway.toml`
5. Set environment variables:
   ```
   NODE_ENV=production
   PORT=3000
   CORS_ORIGIN=https://your-netlify-app.netlify.app
   ```

#### Step 3: Connect Frontend to Backend
Update your frontend build to point to Railway backend:
1. Create `.env.production` in your frontend:
   ```
   VITE_API_URL=https://your-railway-app.railway.app/api
   ```

---

## Option 3: Render (Full Stack)

**Best for:** Simple full-stack deployment

### Step 1: Prepare Repository
```bash
git add .
git commit -m "Prepare for Render deployment"
git push origin main
```

### Step 2: Deploy to Render
1. Go to [render.com](https://render.com)
2. Click "New +"
3. Choose "Blueprint"
4. Connect your Git repository
5. Render will use `render.yaml` configuration

### Step 3: Monitor Deployment
- Frontend will be available at: `https://cryptofuture-frontend.onrender.com`
- Backend will be available at: `https://cryptofuture-api.onrender.com`

---

## Option 4: Heroku (Full Stack)

**Best for:** Traditional full-stack deployment

### Step 1: Install Heroku CLI
```bash
# macOS
brew tap heroku/brew && brew install heroku

# Windows
# Download from https://devcenter.heroku.com/articles/heroku-cli
```

### Step 2: Prepare for Heroku
```bash
heroku login
heroku create your-app-name
```

### Step 3: Configure Heroku
```bash
# Set environment variables
heroku config:set NODE_ENV=production
heroku config:set CORS_ORIGIN=https://your-app-name.herokuapp.com

# Add buildpack
heroku buildpacks:add heroku/nodejs
```

### Step 4: Deploy
```bash
git add .
git commit -m "Deploy to Heroku"
git push heroku main
```

### Step 5: Open Application
```bash
heroku open
```

---

## Option 5: Docker Deployment

**Best for:** Self-hosting or cloud platforms with Docker support

### Step 1: Build Docker Image
```bash
# Build the image
docker build -t cryptofuture .

# Run locally for testing
docker run -p 3000:3000 -e NODE_ENV=production cryptofuture
```

### Step 2: Using Docker Compose
```bash
# Build and start both frontend and backend
docker-compose up --build

# Run in background
docker-compose up -d
```

### Step 3: Deploy to Cloud Platform

#### AWS ECS/Fargate:
1. Push image to ECR
2. Create ECS service
3. Configure load balancer

#### Google Cloud Run:
```bash
# Build and push to Google Container Registry
gcloud builds submit --tag gcr.io/PROJECT-ID/cryptofuture

# Deploy to Cloud Run
gcloud run deploy --image gcr.io/PROJECT-ID/cryptofuture --platform managed
```

#### DigitalOcean App Platform:
1. Connect Git repository
2. Use Dockerfile for deployment
3. Configure environment variables

---

## 🔄 Separate Frontend/Backend Deployment

### Frontend-Only Deployment

#### Build Frontend
```bash
npm run build:frontend
```

#### Deploy to Static Hosting
**Netlify/Vercel/GitHub Pages:**
- Upload `dist/spa` folder
- Configure redirects for SPA routing

**AWS S3 + CloudFront:**
```bash
aws s3 sync dist/spa/ s3://your-bucket-name
aws cloudfront create-invalidation --distribution-id YOUR_DIST_ID --paths "/*"
```

### Backend-Only Deployment

#### Build Backend
```bash
npm run build:backend
```

#### Deploy to Server Hosting
**Railway/Render/Heroku:**
- Use `npm run start:prod` as start command
- Set `NODE_ENV=production`

**VPS/Dedicated Server:**
```bash
# Transfer files
scp -r dist/server/ user@server:/app/
scp package.json user@server:/app/

# On server
cd /app
npm install --production
pm2 start dist/server/production.mjs --name cryptofuture-api
```

---

## 🚨 Troubleshooting

### Common Issues

#### 1. CORS Errors
**Problem:** Frontend can't connect to backend
**Solution:** Update `CORS_ORIGIN` environment variable
```bash
# Set to your frontend URL
CORS_ORIGIN=https://your-frontend-domain.com
```

#### 2. Build Failures
**Problem:** Build fails during deployment
**Solution:** Check Node.js version and dependencies
```bash
# Ensure Node 18+
node --version

# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

#### 3. Environment Variables Not Working
**Problem:** Env vars not loaded in production
**Solution:** Check platform-specific env var configuration
- Vercel: Project Settings → Environment Variables
- Netlify: Site Settings → Environment Variables
- Heroku: `heroku config:set VAR_NAME=value`

#### 4. Static Assets Not Loading
**Problem:** CSS/JS files return 404
**Solution:** Check build output directory and routing
```bash
# Verify build output
ls -la dist/spa/

# Check index.html for correct asset paths
```

#### 5. API Routes Not Working
**Problem:** `/api/*` routes return 404
**Solution:** Check deployment platform routing configuration
- Vercel: Ensure `vercel.json` routes are correct
- Netlify: Check `netlify.toml` redirects
- Other: Verify server routing setup

### Debugging Commands

```bash
# Check build output
npm run build && ls -la dist/

# Test production build locally
npm run preview

# Check environment variables
printenv | grep NODE_ENV

# View deployment logs
# Vercel: vercel logs
# Netlify: netlify logs
# Heroku: heroku logs --tail
```

### Performance Optimization

#### 1. Enable Compression
Already configured in `nginx.conf` for Docker deployments

#### 2. Optimize Bundle Size
```bash
# Analyze bundle
npm run build:frontend -- --analyze

# Remove unused dependencies
npm uninstall unused-package
```

#### 3. CDN Configuration
- Enable CDN on your hosting platform
- Configure cache headers for static assets

---

## 📞 Support

If you encounter issues:

1. Check the troubleshooting section above
2. Review platform-specific documentation
3. Check deployment logs for specific errors
4. Ensure all environment variables are properly set

## 🎉 Success!

Once deployed, your CryptoFuture platform will be live with:
- ✅ Live crypto price updates
- ✅ Investment plan functionality
- ✅ Responsive design
- ✅ Production-ready performance
- ✅ Secure API endpoints

Your application URLs:
- **Frontend:** `https://your-app.domain.com`
- **API:** `https://your-app.domain.com/api`
- **Health Check:** `https://your-app.domain.com/health`
