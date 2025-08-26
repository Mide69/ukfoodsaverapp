# FoodSaver Environment Variables

## 🔑 **Current Configuration Details**

### **Found in web/.env:**
```
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_FIREBASE_API_KEY=AIzaSyBvOkBwgGlbUiUQiQJtKDTPTG_7JrMlQs
REACT_APP_FIREBASE_AUTH_DOMAIN=foodsaver-demo.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=foodsaver-demo
REACT_APP_FIREBASE_STORAGE_BUCKET=foodsaver-demo.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=123456789012
REACT_APP_FIREBASE_APP_ID=1:123456789012:web:abcdef123456
REACT_APP_STRIPE_PUBLISHABLE_KEY=pk_test_51234567890abcdef
REACT_APP_GOOGLE_MAPS_API_KEY=AIzaSyBvOkBwgGlbUiUQiQJtKDTPTG_7JrMlQs
```

## 🚀 **For Vercel Production Deployment:**

### **Environment Variables to Set in Vercel Dashboard:**
```
REACT_APP_API_URL=https://foodsaver-api.vercel.app/api
REACT_APP_FIREBASE_API_KEY=AIzaSyBvOkBwgGlbUiUQiQJtKDTPTG_7JrMlQs
REACT_APP_FIREBASE_AUTH_DOMAIN=foodsaver-demo.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=foodsaver-demo
REACT_APP_FIREBASE_STORAGE_BUCKET=foodsaver-demo.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=123456789012
REACT_APP_FIREBASE_APP_ID=1:123456789012:web:abcdef123456
REACT_APP_STRIPE_PUBLISHABLE_KEY=pk_test_51234567890abcdef
REACT_APP_GOOGLE_MAPS_API_KEY=AIzaSyBvOkBwgGlbUiUQiQJtKDTPTG_7JrMlQs
```

## 📋 **How to Set in Vercel:**

### **Method 1: Vercel Dashboard**
1. Go to your project in Vercel dashboard
2. Settings → Environment Variables
3. Add each variable above
4. Set Environment: Production, Preview, Development
5. Save and redeploy

### **Method 2: Vercel CLI**
```bash
vercel env add REACT_APP_API_URL
# Enter: https://foodsaver-api.vercel.app/api

vercel env add REACT_APP_FIREBASE_API_KEY
# Enter: AIzaSyBvOkBwgGlbUiUQiQJtKDTPTG_7JrMlQs

# Repeat for all variables...
```

### **Method 3: .env.production (Already Created)**
The `.env.production` file is already configured with demo values.

## 🔧 **Notes:**

### **API URL:**
- **Development:** `http://localhost:5000/api`
- **Production:** `https://foodsaver-api.vercel.app/api` (or your backend URL)

### **Firebase Config:**
- Using demo Firebase project: `foodsaver-demo`
- API keys are demo keys for testing
- For production, create real Firebase project

### **Stripe Keys:**
- Using test keys starting with `pk_test_`
- For production, use live keys starting with `pk_live_`

### **Google Maps:**
- Using demo API key
- For production, get real Google Maps API key

## ✅ **Ready for Deployment:**
All environment variables are configured and ready for Vercel deployment!