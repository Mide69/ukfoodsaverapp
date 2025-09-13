# FoodSaver Database & Authentication Setup

## 🗄️ **Database Options**

### **Option 1: PostgreSQL (Recommended)**
```bash
# Install PostgreSQL
# Windows: Download from postgresql.org
# Mac: brew install postgresql
# Ubuntu: sudo apt install postgresql

# Create database
createdb foodsaver_db

# Connect
psql -d foodsaver_db
```

### **Option 2: Firebase Firestore (Easiest)**
```bash
# No installation needed - cloud database
# Go to Firebase Console
# Create new project
# Enable Firestore Database
```

### **Option 3: Supabase (PostgreSQL + Auth)**
```bash
# Go to supabase.com
# Create new project
# Get connection string
# Built-in authentication
```

## 🔐 **Authentication Setup**

### **1. Firebase Authentication (Recommended)**

#### **Create Firebase Project:**
1. Go to [Firebase Console](https://console.firebase.google.com)
2. Click "Create a project"
3. Name: `foodsaver-production`
4. Enable Google Analytics (optional)

#### **Enable Authentication:**
1. Go to Authentication → Sign-in method
2. Enable these providers:
   - **Email/Password** ✅
   - **Google** ✅
   - **Facebook** ✅

#### **Google OAuth Setup:**
1. In Firebase Console → Authentication → Sign-in method
2. Click Google → Enable
3. Add your domain to authorized domains
4. Copy Web SDK configuration

#### **Facebook OAuth Setup:**
1. Go to [Facebook Developers](https://developers.facebook.com)
2. Create new app → Consumer
3. Add Facebook Login product
4. Get App ID and App Secret
5. In Firebase → Authentication → Sign-in method → Facebook
6. Enter App ID and App Secret
7. Copy OAuth redirect URI to Facebook app settings

### **2. Environment Variables Update**

#### **Replace in `.env` file:**
```env
# Real Firebase Config
REACT_APP_FIREBASE_API_KEY=your_real_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=foodsaver-production.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=foodsaver-production
REACT_APP_FIREBASE_STORAGE_BUCKET=foodsaver-production.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
REACT_APP_FIREBASE_APP_ID=your_app_id

# Database (if using PostgreSQL)
DATABASE_URL=postgresql://username:password@localhost:5432/foodsaver_db

# Stripe (get real keys)
REACT_APP_STRIPE_PUBLISHABLE_KEY=pk_live_your_real_key
STRIPE_SECRET_KEY=sk_live_your_real_key
```

## 🏗️ **Database Schema**

### **PostgreSQL Tables:**
```sql
-- Users table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    firebase_uid VARCHAR(255) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    user_type VARCHAR(50) DEFAULT 'consumer',
    phone VARCHAR(20),
    address TEXT,
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Food listings table
CREATE TABLE food_listings (
    id SERIAL PRIMARY KEY,
    business_id INTEGER REFERENCES users(id),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    category VARCHAR(100),
    quantity INTEGER NOT NULL,
    weight DECIMAL(5, 2),
    original_price DECIMAL(10, 2) NOT NULL,
    discounted_price DECIMAL(10, 2) NOT NULL,
    pickup_start TIMESTAMP NOT NULL,
    pickup_end TIMESTAMP NOT NULL,
    expires_at TIMESTAMP NOT NULL,
    status VARCHAR(50) DEFAULT 'available',
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    address TEXT,
    image_url TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Reservations table
CREATE TABLE reservations (
    id SERIAL PRIMARY KEY,
    listing_id INTEGER REFERENCES food_listings(id),
    user_id INTEGER REFERENCES users(id),
    quantity INTEGER NOT NULL,
    total_amount DECIMAL(10, 2) NOT NULL,
    status VARCHAR(50) DEFAULT 'pending',
    payment_intent_id VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Stores table
CREATE TABLE stores (
    id SERIAL PRIMARY KEY,
    owner_id INTEGER REFERENCES users(id),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    address TEXT NOT NULL,
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    phone VARCHAR(20),
    email VARCHAR(255),
    logo_url TEXT,
    rating DECIMAL(3, 2) DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### **Firestore Collections:**
```javascript
// users collection
{
  uid: "firebase_uid",
  email: "user@example.com",
  name: "User Name",
  userType: "consumer", // consumer, business, admin
  phone: "+44...",
  address: "...",
  location: { lat: 51.5074, lng: -0.1278 },
  createdAt: timestamp
}

// listings collection
{
  businessId: "user_uid",
  title: "Food Title",
  description: "...",
  category: "vegetables",
  quantity: 5,
  weight: 2.5,
  originalPrice: 10.99,
  discountedPrice: 4.99,
  pickupStart: timestamp,
  pickupEnd: timestamp,
  expiresAt: timestamp,
  status: "available",
  location: { lat: 51.5074, lng: -0.1278 },
  address: "...",
  imageUrl: "...",
  createdAt: timestamp
}
```

## 🔧 **Implementation Steps**

### **1. Update Firebase Config:**
```typescript
// web/src/services/firebase.ts
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, FacebookAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();
export const facebookProvider = new FacebookAuthProvider();
```

### **2. Update Authentication Service:**
```typescript
// web/src/services/authService.ts
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db, googleProvider, facebookProvider } from './firebase';

export const authService = {
  // Email/Password
  signInWithEmail: (email: string, password: string) => 
    signInWithEmailAndPassword(auth, email, password),
  
  signUpWithEmail: (email: string, password: string) => 
    createUserWithEmailAndPassword(auth, email, password),
  
  // Google Login
  signInWithGoogle: () => signInWithPopup(auth, googleProvider),
  
  // Facebook Login
  signInWithFacebook: () => signInWithPopup(auth, facebookProvider),
  
  // Logout
  signOut: () => signOut(auth),
  
  // Save user to database
  saveUser: async (user: any, additionalData: any) => {
    const userRef = doc(db, 'users', user.uid);
    const userDoc = await getDoc(userRef);
    
    if (!userDoc.exists()) {
      await setDoc(userRef, {
        uid: user.uid,
        email: user.email,
        name: user.displayName || additionalData.name,
        userType: additionalData.userType || 'consumer',
        createdAt: new Date()
      });
    }
  }
};
```

## 🚀 **Quick Start Commands**

### **Firebase Setup:**
```bash
npm install firebase
npm install @firebase/auth @firebase/firestore
```

### **PostgreSQL Setup:**
```bash
npm install pg @types/pg
npm install prisma @prisma/client  # ORM (optional)
```

### **Environment Setup:**
```bash
# Copy environment template
cp .env.example .env

# Update with real values
# Get Firebase config from Firebase Console
# Get database URL from your PostgreSQL setup
```

## ✅ **Testing Checklist**

- [ ] Firebase project created
- [ ] Google OAuth configured
- [ ] Facebook OAuth configured
- [ ] Database schema created
- [ ] Environment variables updated
- [ ] Authentication flows tested
- [ ] User data saving to database
- [ ] Social login working

## 🔒 **Security Notes**

- Never commit real API keys to Git
- Use environment variables for all secrets
- Enable Firebase security rules
- Validate user input on backend
- Use HTTPS in production
- Implement rate limiting

Your FoodSaver app will now have real authentication and database! 🌱