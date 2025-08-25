# FoodSaver App - Vercel Deployment Guide

## 🚀 Quick Deployment Steps

### **1. Install Vercel CLI**
```bash
npm install -g vercel
```

### **2. Login to Vercel**
```bash
vercel login
```

### **3. Deploy from Web Directory**
```bash
cd web
vercel --prod
```

## 📋 **Pre-Deployment Checklist**

### **Files Created:**
- ✅ `vercel.json` - Deployment configuration
- ✅ `.env.production` - Production environment variables
- ✅ Build scripts in `package.json`

### **Configuration Details:**
- **Build Command:** `npm run build`
- **Output Directory:** `build`
- **Node Version:** 18.x
- **Framework:** React (Create React App)

## 🔧 **Vercel Dashboard Setup**

### **Environment Variables to Set:**
```
REACT_APP_API_URL=https://your-api-domain.vercel.app/api
REACT_APP_FIREBASE_API_KEY=your_firebase_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=your_firebase_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
REACT_APP_FIREBASE_APP_ID=your_app_id
REACT_APP_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_key
REACT_APP_GOOGLE_MAPS_API_KEY=your_google_maps_key
```

### **Domain Configuration:**
- **Production URL:** `https://foodsaver-app.vercel.app`
- **Custom Domain:** Optional (foodsaver.co.uk)
- **SSL:** Automatically enabled

## 🎯 **Demo Deployment Commands**

### **Option 1: Automatic Deployment**
```bash
# Navigate to web directory
cd web

# Deploy to Vercel
vercel --prod

# Follow prompts:
# - Project name: foodsaver-app
# - Framework: Create React App
# - Build command: npm run build
# - Output directory: build
```

### **Option 2: GitHub Integration**
```bash
# Push to GitHub repository
git add .
git commit -m "Deploy FoodSaver app"
git push origin main

# Connect repository in Vercel dashboard
# Auto-deploy on every push
```

## 📱 **Testing the Deployed App**

### **Demo Credentials:**
- **Consumer:** Any email/password
- **Business:** business/business
- **Admin:** admin/admin

### **Features to Test:**
- ✅ Authentication flow
- ✅ Role-based navigation
- ✅ Food browsing (Consumer)
- ✅ Listing management (Business)
- ✅ Admin dashboard
- ✅ Cart functionality
- ✅ Success messages
- ✅ Responsive design

## 🔍 **Troubleshooting**

### **Common Issues:**

**Build Errors:**
```bash
# Clear cache and rebuild
npm run build
```

**Environment Variables:**
- Set in Vercel dashboard under Settings > Environment Variables
- Redeploy after adding variables

**Routing Issues:**
- `vercel.json` handles SPA routing
- All routes redirect to `index.html`

**Performance:**
- Static assets cached for 1 year
- Gzip compression enabled
- CDN distribution worldwide

## 📊 **Deployment Status**

### **Expected Build Time:** 2-3 minutes
### **Bundle Size:** ~2MB (optimized)
### **Performance Score:** 90+ (Lighthouse)

## 🌐 **Live Demo URLs**

After deployment, your app will be available at:
- **Main URL:** `https://foodsaver-app.vercel.app`
- **Git Branch URLs:** `https://foodsaver-app-git-main.vercel.app`
- **Deployment URLs:** `https://foodsaver-app-[hash].vercel.app`

## 🎉 **Post-Deployment**

### **Share Demo:**
- Send live URL to stakeholders
- Test all user roles and features
- Gather feedback for improvements

### **Monitor Performance:**
- Vercel Analytics dashboard
- Real user metrics
- Error tracking and logs

### **Next Steps:**
- Set up custom domain
- Configure production Firebase
- Add real Stripe keys
- Enable Google Maps API

Your FoodSaver app is now ready for live testing on Vercel! 🚀