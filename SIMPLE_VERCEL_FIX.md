# Simple Vercel 404 Fix

## 🔧 **Root Level Configuration:**

### **New Vercel Settings:**
```
Project Name: uk-food-saver-app
Framework Preset: Other
Root Directory: ./
Build Command: npm run build
Output Directory: web/build
Install Command: npm install
```

### **Files Added:**
- Root `package.json` - Handles build from root
- Root `vercel.json` - Routes to web subdirectory
- Simplified web `vercel.json`

## 🚀 **Redeploy Steps:**

### **Method 1: Update Vercel Settings**
1. Go to Vercel project settings
2. Change **Root Directory** to `./` (root)
3. Change **Output Directory** to `web/build`
4. Redeploy

### **Method 2: Delete & Recreate**
1. Delete current Vercel project
2. Create new project
3. Use root directory settings above
4. Add environment variables

## ✅ **Alternative: Direct Build Upload**
```bash
cd web
npm run build
# Upload the 'build' folder directly to Vercel
```

This should resolve the 404 issue by properly handling the subdirectory structure! 🌱