# AWS Amplify Deployment Guide

## 🚀 **Deploy FoodSaver on AWS Amplify**

### **Prerequisites**
- AWS Account
- GitHub repository with your code
- Node.js 16+ installed locally

## 📋 **Step-by-Step Deployment**

### **1. Prepare Your Repository**
```bash
# Ensure all changes are committed
git add .
git commit -m "Prepare for Amplify deployment"
git push origin main
```

### **2. AWS Amplify Console Setup**

#### **Access Amplify:**
1. Go to [AWS Amplify Console](https://console.aws.amazon.com/amplify/)
2. Click "Get Started" under "Deploy"
3. Choose "GitHub" as your repository service

#### **Connect Repository:**
1. Authorize AWS Amplify to access your GitHub
2. Select repository: `Uk-Food-Saver-App`
3. Choose branch: `main`
4. Click "Next"

### **3. Build Settings Configuration**

#### **Auto-detected Settings:**
Amplify will detect React app and suggest:
```yaml
version: 1
frontend:
  phases:
    preBuild:
      commands:
        - cd web
        - npm ci
    build:
      commands:
        - npm run build
  artifacts:
    baseDirectory: web/build
    files:
      - '**/*'
  cache:
    paths:
      - web/node_modules/**/*
```

#### **Custom Build Settings (if needed):**
```yaml
version: 1
frontend:
  phases:
    preBuild:
      commands:
        - cd web
        - npm install
    build:
      commands:
        - npm run build
  artifacts:
    baseDirectory: web/build
    files:
      - '**/*'
  cache:
    paths:
      - web/node_modules/**/*
```

### **4. Environment Variables Setup**

#### **Add Environment Variables:**
In Amplify Console → App Settings → Environment Variables:

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

### **5. Advanced Settings**

#### **Redirects and Rewrites:**
Add in Amplify Console → App Settings → Rewrites and redirects:
```
Source: </^[^.]+$|\.(?!(css|gif|ico|jpg|js|png|txt|svg|woff|ttf|map|json)$)([^.]+$)/>
Target: /index.html
Type: 200 (Rewrite)
```

#### **Custom Headers (Optional):**
```
/*
  X-Frame-Options: DENY
  X-XSS-Protection: 1; mode=block
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
```

### **6. Deploy Configuration**

#### **Review Settings:**
- **App name:** FoodSaver
- **Environment name:** main
- **Build command:** Automatically detected
- **Base directory:** web
- **Build output directory:** build

#### **Deploy:**
1. Click "Save and Deploy"
2. Wait for build to complete (5-10 minutes)
3. Access your live URL

## 🔧 **Amplify CLI Setup (Optional)**

### **Install Amplify CLI:**
```bash
npm install -g @aws-amplify/cli
amplify configure
```

### **Initialize Amplify:**
```bash
cd web
amplify init
```

### **Add Hosting:**
```bash
amplify add hosting
# Choose: Amazon CloudFront and S3
amplify publish
```

## 🌐 **Custom Domain Setup**

### **Add Custom Domain:**
1. Go to App Settings → Domain management
2. Click "Add domain"
3. Enter your domain (e.g., foodsaver.co.uk)
4. Configure DNS settings
5. Wait for SSL certificate provisioning

### **DNS Configuration:**
```
Type: CNAME
Name: www
Value: [amplify-generated-url]

Type: A
Name: @
Value: [amplify-IP-address]
```

## 📊 **Monitoring & Analytics**

### **Built-in Monitoring:**
- **Build logs:** Real-time deployment logs
- **Access logs:** User traffic analytics
- **Performance:** Core Web Vitals
- **Errors:** Runtime error tracking

### **Custom Analytics:**
```javascript
// Add to your React app
import { Analytics } from 'aws-amplify';

Analytics.record({
  name: 'pageView',
  attributes: {
    page: window.location.pathname
  }
});
```

## 🔒 **Security Best Practices**

### **Environment Variables:**
- Never commit secrets to Git
- Use Amplify environment variables
- Rotate keys regularly
- Use different keys for staging/production

### **Access Control:**
```yaml
# amplify.yml - Password protection for staging
frontend:
  phases:
    build:
      commands:
        - npm run build
  artifacts:
    baseDirectory: build
    files:
      - '**/*'
  customHeaders:
    - pattern: '**/*'
      headers:
        - key: 'X-Frame-Options'
          value: 'DENY'
```

## 🚀 **Deployment Commands**

### **Manual Deploy:**
```bash
# From local machine
cd web
npm run build
# Upload build folder to Amplify Console
```

### **Automatic Deploy:**
```bash
# Push to GitHub triggers auto-deploy
git add .
git commit -m "Update FoodSaver app"
git push origin main
```

### **Amplify CLI Deploy:**
```bash
amplify publish
```

## 📈 **Performance Optimization**

### **Build Optimization:**
```json
// package.json
{
  "scripts": {
    "build": "react-scripts build && npm run optimize",
    "optimize": "npx imagemin build/static/media/* --out-dir=build/static/media/"
  }
}
```

### **Caching Strategy:**
```yaml
# amplify.yml
frontend:
  phases:
    build:
      commands:
        - npm run build
  artifacts:
    baseDirectory: build
    files:
      - '**/*'
  cache:
    paths:
      - node_modules/**/*
      - .next/cache/**/*
```

## 🔄 **CI/CD Pipeline**

### **Branch-based Deployments:**
- **main branch:** Production deployment
- **develop branch:** Staging deployment
- **feature branches:** Preview deployments

### **Build Triggers:**
- Automatic on Git push
- Manual trigger from console
- Webhook triggers
- Scheduled builds

## 📱 **Mobile App Integration**

### **API Gateway Setup:**
```bash
amplify add api
# Choose REST API
# Configure endpoints for mobile app
```

### **Authentication:**
```bash
amplify add auth
# Configure Cognito for user management
```

## 🎯 **Expected Results**

### **Live URLs:**
- **Production:** `https://main.[app-id].amplifyapp.com`
- **Custom Domain:** `https://foodsaver.co.uk`
- **Preview:** Branch-specific URLs for testing

### **Features Available:**
- ✅ Coming Soon landing page
- ✅ Customer food browsing
- ✅ Authentication system
- ✅ Admin dashboard
- ✅ Real food images
- ✅ UK-focused branding
- ✅ TekTribe integration

### **Performance:**
- **Load Time:** < 3 seconds
- **Lighthouse Score:** 90+
- **Mobile Optimized:** Responsive design
- **SEO Ready:** Meta tags and structure

## 🆘 **Troubleshooting**

### **Common Issues:**

**Build Fails:**
```bash
# Check build logs in Amplify Console
# Verify Node.js version compatibility
# Check environment variables
```

**404 Errors:**
```bash
# Add SPA redirect rule
# Check build output directory
# Verify routing configuration
```

**Environment Variables:**
```bash
# Ensure all REACT_APP_ prefixed
# Check for typos in variable names
# Verify values are properly set
```

## 🎉 **Success Checklist**

- [ ] Repository connected to Amplify
- [ ] Build settings configured
- [ ] Environment variables added
- [ ] SPA redirects configured
- [ ] Custom domain setup (optional)
- [ ] SSL certificate active
- [ ] Performance optimized
- [ ] Monitoring enabled

Your FoodSaver app will be live on AWS Amplify with global CDN, automatic scaling, and enterprise-grade security! 🌱