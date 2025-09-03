import React, { useState, useEffect } from 'react';
import { mockAuth } from './services/mockAuth';
import { theme } from './styles/theme';
import AuthProfessional from './components/AuthProfessional';
import Header from './components/Header';
import Cart from './components/Cart';
import AdminDashboard from './components/AdminDashboard';
import AdminDashboardAdvanced from './components/AdminDashboardAdvanced';
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
  const [currentView, setCurrentView] = useState<'listings' | 'stores' | 'create' | 'admin' | 'cart' | 'login'>('listings');
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
          name: firebaseUser.displayName || firebaseUser.email?.split('@')[0] || 'User', 
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

  // Show login only when explicitly requested
  if (currentView === 'login') {
    return <AuthProfessional onAuthSuccess={() => setCurrentView('listings')} />;
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
            {!user || userProfile?.user_type === 'consumer' ? (
              <ConsumerListings 
                searchQuery={searchQuery}
                onAddToCart={handleAddToCart}
                isGuest={!user}
                onLoginRequired={() => setCurrentView('login')}
              />
            ) : userProfile?.user_type === 'business' ? (
              <BusinessListings />
            ) : (
              <AdminListings />
            )}
          </>
        )}

        {currentView === 'cart' && (
          !user ? (
            <div style={{ textAlign: 'center', padding: '60px 20px' }}>
              <h2>Please Login to View Cart</h2>
              <button 
                onClick={() => setCurrentView('login')}
                style={{
                  padding: '12px 24px',
                  background: theme.colors.primary,
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer'
                }}
              >
                Login
              </button>
            </div>
          ) : (
            <Cart 
              cartItems={cartItems}
              onUpdateQuantity={handleUpdateQuantity}
              onRemoveItem={handleRemoveItem}
              onCheckout={handleCheckout}
            />
          )
        )}

        {currentView === 'admin' && (
          !user ? (
            <div style={{ textAlign: 'center', padding: '60px 20px' }}>
              <h2>Admin Login Required</h2>
              <button 
                onClick={() => setCurrentView('login')}
                style={{
                  padding: '12px 24px',
                  background: theme.colors.primary,
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer'
                }}
              >
                Admin Login
              </button>
            </div>
          ) : userProfile?.user_type === 'admin' ? (
            user?.email === 'admin@foodsaver.com' && user?.uid?.includes('admin') ? (
              <AdminDashboardAdvanced user={user} />
            ) : (
              <AdminDashboard />
            )
          ) : (
            <div style={{ textAlign: 'center', padding: '60px 20px' }}>
              <h2>Admin Access Only</h2>
            </div>
          )
        )}

        {currentView === 'stores' && <StoreDirectory />}

        {currentView === 'create' && (
          !user ? (
            <div style={{ textAlign: 'center', padding: '60px 20px' }}>
              <h2>Business Login Required</h2>
              <p>Please login as a business to create listings</p>
              <button 
                onClick={() => setCurrentView('login')}
                style={{
                  padding: '12px 24px',
                  background: theme.colors.secondary,
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer'
                }}
              >
                Business Login
              </button>
            </div>
          ) : ['business', 'admin'].includes(userProfile?.user_type || '') ? (
            <CreateListing />
          ) : (
            <div style={{ textAlign: 'center', padding: '60px 20px' }}>
              <h2>Business Access Only</h2>
              <p>This feature is only available to business accounts</p>
            </div>
          )
        )}
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