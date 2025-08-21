import React, { useState, useEffect } from 'react';
import { mockAuth } from './services/mockAuth';
import { theme } from './styles/theme';
import { mockListings } from './data/mockData';
import Auth from './components/Auth';
import Header from './components/Header';
import FoodCard from './components/FoodCard';
import FilterSidebar from './components/FilterSidebar';
import Cart from './components/Cart';
import AdminDashboard from './components/AdminDashboard';
import StoreDirectory from './components/StoreDirectory';
import { User } from './types';

function App() {
  const [user, setUser] = useState<any>(null);
  const [userProfile, setUserProfile] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentView, setCurrentView] = useState<'listings' | 'stores' | 'create' | 'admin' | 'cart'>('listings');
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [filters, setFilters] = useState({
    location: 'All Locations',
    category: 'All Categories',
    priceRange: [0, 50] as [number, number],
    store: 'All Stores'
  });
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
    } else {
      setCartItems([...cartItems, { ...listing, cartQuantity: 1 }]);
    }
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
    alert('Checkout functionality would integrate with Stripe here!');
  };

  const filteredListings = mockListings.filter(listing => {
    if (filters.location !== 'All Locations' && listing.location !== filters.location) return false;
    if (filters.category !== 'All Categories' && listing.category !== filters.category) return false;
    if (listing.discountedPrice > filters.priceRange[1]) return false;
    if (filters.store !== 'All Stores' && listing.store.name !== filters.store) return false;
    if (searchQuery && !listing.title.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !listing.description.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !listing.store.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !listing.location.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

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
          <div style={{ display: 'flex', gap: '24px' }}>
            <FilterSidebar filters={filters} onFilterChange={setFilters} />
            <div style={{ flex: 1 }}>
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center', 
                marginBottom: '24px' 
              }}>
                <div>
                  <h2 style={{ 
                    color: theme.colors.text, 
                    fontSize: '28px', 
                    fontWeight: '600',
                    margin: 0
                  }}>
                    🍽️ Available Food ({filteredListings.length})
                  </h2>
                  {searchQuery && (
                    <p style={{
                      color: theme.colors.textSecondary,
                      fontSize: '14px',
                      margin: '4px 0 0 0'
                    }}>
                      Search results for: "{searchQuery}"
                    </p>
                  )}
                </div>
                <div style={{ fontSize: '14px', color: theme.colors.textSecondary }}>
                  Sorted by: Newest first
                </div>
              </div>
              
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', 
                gap: '24px' 
              }}>
                {filteredListings.map(listing => (
                  <FoodCard 
                    key={listing.id} 
                    listing={listing} 
                    onAddToCart={handleAddToCart}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        {currentView === 'cart' && (
          <Cart 
            cartItems={cartItems}
            onUpdateQuantity={handleUpdateQuantity}
            onRemoveItem={handleRemoveItem}
            onCheckout={handleCheckout}
          />
        )}

        {currentView === 'admin' && <AdminDashboard />}

        {currentView === 'stores' && <StoreDirectory />}

        {currentView === 'create' && (
          <div style={{ textAlign: 'center', padding: '40px' }}>
            <h2 style={{ color: theme.colors.text }}>➕ List Your Food</h2>
            <p style={{ color: theme.colors.textSecondary }}>Create listing form coming soon!</p>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;