# Vercel MALFORMED_REQUEST_HEADER Fix

## 🔧 **Fixed Issues:**

### **1. Updated vercel.json Configuration:**
- Proper static file handling with `@vercel/static`
- Correct routing for assets and SPA
- Added security headers to prevent malformed requests
- Removed serverless function conflicts

### **2. Added .vercelignore:**
- Excludes unnecessary files from deployment
- Prevents build conflicts and reduces bundle size

### **3. Updated package.json:**
- Added `vercel-build` script
- Specified Node.js engine version
- Fixed homepage path for relative assets

## 🚀 **Deploy Methods:**

### **Method 1: Vercel CLI (Recommended)**
```bash
cd web
vercel --prod
```

### **Method 2: GitHub Integration**
```bash
git add .
git commit -m "Fix Vercel deployment"
git push origin main
# Then import repository in Vercel dashboard
```

### **Method 3: Direct Build Upload**
```bash
cd web
npm run build
# Upload the 'build' folder to Vercel
```

## ✅ **What's Fixed:**
- MALFORMED_REQUEST_HEADER errors
- Static file serving issues
- SPA routing problems
- Security header configuration
- Build optimization

## 📋 **Environment Variables for Vercel:**
Set these in your Vercel dashboard:

```
REACT_APP_FIREBASE_API_KEY=AIzaSyBvOkBwgGlbUiUQiQJtKDTPTG_7JrMlQs
REACT_APP_FIREBASE_AUTH_DOMAIN=foodsaver-demo.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=foodsaver-demo
REACT_APP_FIREBASE_STORAGE_BUCKET=foodsaver-demo.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=123456789012
REACT_APP_FIREBASE_APP_ID=1:123456789012:web:abcdef123456
REACT_APP_STRIPE_PUBLISHABLE_KEY=pk_test_51234567890abcdef
REACT_APP_GOOGLE_MAPS_API_KEY=AIzaSyBvOkBwgGlbUiUQiQJtKDTPTG_7JrMlQs
```

The deployment should now work without header errors! 🌱