# FoodSaver - Full-Stack Food Waste Reduction App

FoodSaver is a comprehensive platform that connects restaurants, shops, and households with people who can collect surplus food to reduce waste. The app features both web and mobile interfaces with real-time geolocation, secure payments, and Firebase authentication.

## 🚀 Features

- **Multi-platform**: React.js web app and React Native mobile app
- **Authentication**: Firebase Auth with email and Google sign-in
- **Geolocation**: Google Maps integration for nearby food listings
- **Payments**: Stripe integration for discounted food purchases
- **Real-time**: Live food listings and reservations
- **User Types**: Support for consumers, businesses, and admins
- **Responsive**: Mobile-first design with cross-platform compatibility

## 🏗️ Architecture

### Backend (Node.js + Express)
- RESTful API with PostgreSQL database
- Firebase Admin SDK for authentication
- Stripe integration for payments
- Geolocation-based food listing queries

### Frontend (React.js)
- TypeScript-based web application
- Firebase client SDK for authentication
- Stripe Elements for payment processing
- Responsive design with modern UI

### Mobile (React Native + Expo)
- Cross-platform mobile application
- Native navigation and components
- Location services integration
- Push notifications ready

## 📋 Prerequisites

Before running the application, ensure you have:

- Node.js (v16 or higher)
- PostgreSQL (v12 or higher)
- Firebase project with Authentication enabled
- Stripe account for payments
- Google Maps API key

## 🛠️ Installation & Setup

### 1. Clone and Install Dependencies

```bash
# Clone the repository
git clone <repository-url>
cd Uk-Food-Saver-App

# Install all dependencies
npm run install-all
```

### 2. Database Setup

```bash
# Install PostgreSQL and create database
createdb foodsaver

# Run migrations
cd server
npm run migrate
```

### 3. Environment Configuration

#### Backend (.env)
Create `server/.env` file:
```env
PORT=5000
DATABASE_URL=postgresql://username:password@localhost:5432/foodsaver
JWT_SECRET=your_jwt_secret_key
FIREBASE_PROJECT_ID=your_firebase_project_id
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nyour_private_key\n-----END PRIVATE KEY-----\n"
FIREBASE_CLIENT_EMAIL=your_firebase_client_email
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
GOOGLE_MAPS_API_KEY=your_google_maps_api_key
```

#### Web Frontend (.env)
Create `web/.env` file:
```env
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_FIREBASE_API_KEY=your_firebase_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=your_firebase_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
REACT_APP_FIREBASE_APP_ID=your_app_id
REACT_APP_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key
REACT_APP_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
```

#### Mobile App
Update `mobile/src/services/firebase.ts` with your Firebase configuration.

### 4. Firebase Setup

1. Create a Firebase project at https://console.firebase.google.com
2. Enable Authentication with Email/Password and Google providers
3. Generate a service account key for the backend
4. Get the web app configuration for the frontend

### 5. Stripe Setup

1. Create a Stripe account at https://stripe.com
2. Get your publishable and secret keys from the dashboard
3. Configure webhooks if needed for production

## 🚀 Running the Application

### Development Mode (All Services)

```bash
# Start all services (backend, web, mobile)
npm start
```

This will start:
- Backend API on http://localhost:5000
- Web app on http://localhost:3000
- Mobile app with Expo (scan QR code with Expo Go app)

### Individual Services

```bash
# Backend only
npm run server

# Web app only
npm run web

# Mobile app only
npm run mobile
```

## 📱 Usage

### For Consumers
1. Sign up/login with email or Google
2. Browse nearby food listings
3. Reserve food items
4. Make payments through Stripe
5. Get pickup details and directions

### For Businesses
1. Register as a business account
2. Create food listings with details
3. Set pickup times and locations
4. Manage reservations and inventory
5. Track sales and impact

### For Admins
1. Access admin dashboard
2. Manage users and businesses
3. Monitor transactions
4. Generate reports
5. Moderate content

## 🗄️ Database Schema

### Users Table
- `id` (Primary Key)
- `firebase_uid` (Unique)
- `email`, `name`, `user_type`
- `phone`, `address`
- `latitude`, `longitude`
- `created_at`

### Food Listings Table
- `id` (Primary Key)
- `business_id` (Foreign Key)
- `title`, `description`, `quantity`
- `original_price`, `discounted_price`
- `pickup_start`, `pickup_end`
- `status`, `latitude`, `longitude`
- `address`, `created_at`

### Reservations Table
- `id` (Primary Key)
- `listing_id`, `user_id` (Foreign Keys)
- `quantity`, `total_amount`
- `status`, `payment_intent_id`
- `created_at`

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/register` - Register/update user
- `GET /api/auth/profile` - Get user profile

### Food Listings
- `GET /api/listings` - Get all listings (with location filter)
- `POST /api/listings` - Create new listing
- `GET /api/listings/my-listings` - Get user's listings

### Reservations
- `POST /api/reservations` - Create reservation
- `GET /api/reservations/my-reservations` - Get user's reservations

## 🧪 Testing

```bash
# Run backend tests
cd server && npm test

# Run web app tests
cd web && npm test

# Run mobile app tests
cd mobile && npm test
```

## 📦 Deployment

### Backend (Heroku/Railway)
1. Set environment variables
2. Configure PostgreSQL addon
3. Deploy with `git push heroku main`

### Web App (Netlify/Vercel)
1. Build with `npm run build`
2. Deploy build folder
3. Configure environment variables

### Mobile App (Expo)
1. Build with `expo build`
2. Submit to app stores
3. Configure push notifications

## 🔧 Troubleshooting

### Common Issues

1. **Database Connection Error**
   - Check PostgreSQL is running
   - Verify DATABASE_URL in .env
   - Ensure database exists

2. **Firebase Authentication Error**
   - Verify Firebase configuration
   - Check API keys and project ID
   - Ensure Authentication is enabled

3. **Stripe Payment Error**
   - Verify Stripe keys
   - Check webhook configuration
   - Test with Stripe test cards

4. **Mobile App Not Starting**
   - Install Expo CLI globally
   - Check React Native dependencies
   - Clear Metro cache

### Logs and Debugging

```bash
# Backend logs
cd server && npm run dev

# Web app logs
cd web && npm start

# Mobile app logs
cd mobile && expo start --clear
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:
- Create an issue on GitHub
- Check the documentation
- Contact the development team

## 🔮 Future Enhancements

- Push notifications for new listings
- Advanced search and filters
- Rating and review system
- Analytics dashboard
- Multi-language support
- Social sharing features
- Inventory management
- Delivery options