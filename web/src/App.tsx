import React, { useState, useEffect } from 'react';
import { mockAuth } from './services/mockAuth';
import { theme } from './styles/theme';
import Auth from './components/Auth';
import Header from './components/Header';
import Cart from './components/Cart';
import AdminDashboard from './components/AdminDashboard';
import StoreDirectory from './components/StoreDirectory';
import ConsumerListings from './components/ConsumerListings';
import BusinessListings from './components/BusinessListings';
import AdminListings from './components/AdminListings';
import CreateListing from './components/CreateListing';
import Footer from './components/Footer';
import { User } from './types';

function App() {
  const [user, setUser] = useState<any>(null);
  const [userProfile, setUserProfile] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentView, setCurrentView] = useState<'listings' | 'stores' | 'create' | 'admin' | 'cart'>('listings');
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const unsubscribe = mockAuth.onAuthStateChanged(async (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
        setUserProfile({ 
          id: 1, 
          firebase_uid: firebaseUser.uid, 
          email: firebaseUser.email, 
          name: firebaseUser.displayName || 'User', 
          user_type: firebaseUser.userType || 'consumer',
          created_at: new Date().toISOString()
        });
      } else {
        setUser(null);
        setUserProfile(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await mockAuth.signOut();
      setUser(null);
      setUserProfile(null);
      setCartItems([]);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleAddToCart = (listing: any) => {
    const existingItem = cartItems.find(item => item.id === listing.id);
    if (existingItem) {
      setCartItems(cartItems.map(item => 
        item.id === listing.id 
          ? { ...item, cartQuantity: Math.min(item.quantity, item.cartQuantity + 1) }
          : item
      ));
      setSuccessMessage(`✅ Updated ${listing.title} quantity in cart!`);
    } else {
      setCartItems([...cartItems, { ...listing, cartQuantity: 1 }]);
      setSuccessMessage(`✅ ${listing.title} added to cart!`);
    }
    setShowSuccessMessage(true);
    setTimeout(() => setShowSuccessMessage(false), 3000);
  };

  const handleUpdateQuantity = (id: number, quantity: number) => {
    setCartItems(cartItems.map(item => 
      item.id === id ? { ...item, cartQuantity: quantity } : item
    ));
  };

  const handleRemoveItem = (id: number) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const handleCheckout = () => {
    setCartItems([]);
    setCurrentView('listings');
  };

  const getDefaultView = (userType: string) => {
    switch (userType) {
      case 'admin': return 'admin';
      case 'business': return 'listings';
      default: return 'listings';
    }
  };

  React.useEffect(() => {
    if (userProfile?.user_type) {
      setCurrentView(getDefaultView(userProfile.user_type));
    }
  }, [userProfile?.user_type]);

  if (loading) {
    return <div style={{ textAlign: 'center', padding: '50px', fontFamily: theme.fonts.primary }}>Loading...</div>;
  }

  if (!user) {
    return <Auth onAuthSuccess={() => {}} />;
  }

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: theme.colors.background,
      fontFamily: theme.fonts.primary
    }}>
      <Header 
        user={user}
        userProfile={userProfile}
        onLogout={handleLogout}
        currentView={currentView}
        setCurrentView={setCurrentView}
        cartCount={cartItems.reduce((sum, item) => sum + item.cartQuantity, 0)}
        onSearch={setSearchQuery}
      />

      <main style={{ padding: '24px' }}>
        {currentView === 'listings' && (
          <>
            {userProfile?.user_type === 'consumer' && (
              <ConsumerListings 
                searchQuery={searchQuery}
                onAddToCart={handleAddToCart}
              />
            )}
            {userProfile?.user_type === 'business' && <BusinessListings />}
            {userProfile?.user_type === 'admin' && <AdminListings />}
          </>
        )}

        {currentView === 'cart' && userProfile?.user_type === 'consumer' && (
          <Cart 
            cartItems={cartItems}
            onUpdateQuantity={handleUpdateQuantity}
            onRemoveItem={handleRemoveItem}
            onCheckout={handleCheckout}
          />
        )}

        {currentView === 'admin' && userProfile?.user_type === 'admin' && <AdminDashboard />}

        {currentView === 'stores' && <StoreDirectory />}

        {currentView === 'create' && ['business', 'admin'].includes(userProfile?.user_type || '') && <CreateListing />}
      </main>
      
      <Footer />
      
      {showSuccessMessage && (
        <div style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          background: theme.colors.success,
          color: 'white',
          padding: '12px 20px',
          borderRadius: '8px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
          zIndex: 1000,
          fontSize: '14px',
          fontWeight: '500'
        }}>
          {successMessage}
        </div>
      )}
    </div>
  );
}

export default App;