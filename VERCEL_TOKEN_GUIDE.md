# Vercel Token Setup Guide

## 🔑 **How to Get Vercel Token**

### **Method 1: Vercel CLI Login**
```bash
# Install Vercel CLI
npm install -g vercel

# Login (opens browser)
vercel login

# Check auth status
vercel whoami
```

### **Method 2: Generate API Token**
1. Go to [vercel.com/account/tokens](https://vercel.com/account/tokens)
2. Click "Create Token"
3. Name: `FoodSaver-Deploy`
4. Scope: `Full Account`
5. Expiration: `No Expiration` or `30 days`
6. Copy the token (starts with `vercel_`)

### **Method 3: GitHub Integration**
1. Go to [vercel.com/new](https://vercel.com/new)
2. Connect GitHub account
3. Import repository
4. Auto-deploy on push

## 🚀 **Deploy with Token**

### **Using Environment Variable**
```bash
# Set token
export VERCEL_TOKEN=lmhBGVKnHN4kyniPCtMR145X

# Deploy
cd web
vercel --prod --token $VERCEL_TOKEN
```

### **Using CLI Config**
```bash
# Login once
vercel login

# Deploy anytime
cd web
vercel --prod
```

## 📋 **Vercel Project Settings**

### **Environment Variables to Set:**
```
REACT_APP_API_URL=https://foodsaver-api.vercel.app/api
REACT_APP_FIREBASE_API_KEY=demo-key
REACT_APP_FIREBASE_AUTH_DOMAIN=foodsaver-demo.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=foodsaver-demo
REACT_APP_FIREBASE_STORAGE_BUCKET=foodsaver-demo.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=123456789
REACT_APP_FIREBASE_APP_ID=1:123456789:web:demo
REACT_APP_STRIPE_PUBLISHABLE_KEY=pk_test_demo_key
REACT_APP_GOOGLE_MAPS_API_KEY=demo_maps_key
```

### **Build Settings:**
- **Framework Preset:** Create React App
- **Build Command:** `npm run build`
- **Output Directory:** `build`
- **Install Command:** `npm install`
- **Node.js Version:** 18.x

## 🔧 **Alternative Deployment Methods**

### **1. Drag & Drop (No Token Needed)**
```bash
# Build locally
cd web
npm run build

# Go to vercel.com
# Drag the 'build' folder to deploy
```

### **2. GitHub Integration (Recommended)**
```bash
# Push to GitHub
git add .
git commit -m "Deploy FoodSaver"
git push origin main

# Import in Vercel dashboard
# Auto-deploy on every push
```

### **3. Vercel for GitHub App**
1. Install [Vercel for GitHub](https://github.com/apps/vercel)
2. Connect repository
3. Auto-deploy on commits

## 🎯 **Quick Deploy Commands**

### **First Time Setup:**
```bash
cd web
vercel
# Follow prompts to configure project
```

### **Subsequent Deploys:**
```bash
cd web
vercel --prod
```

### **With Custom Domain:**
```bash
vercel --prod --alias foodsaver.co.uk
```

## 🔍 **Token Locations**

### **Windows:**
```
%APPDATA%\com.vercel.cli\auth.json
```

### **macOS/Linux:**
```
~/.local/share/com.vercel.cli/auth.json
```

### **Check Current Token:**
```bash
vercel whoami
cat ~/.local/share/com.vercel.cli/auth.json
```

## 🚨 **Security Notes**

- Never commit tokens to Git
- Use environment variables for CI/CD
- Rotate tokens regularly
- Use minimal scope permissions
- Store tokens securely

## 📱 **Expected Deployment URL**
After successful deployment:
- **Production:** `https://foodsaver-app.vercel.app`
- **Preview:** `https://foodsaver-app-git-main.vercel.app`
- **Custom:** `https://your-custom-domain.com`

Choose the method that works best for your workflow! 🌱