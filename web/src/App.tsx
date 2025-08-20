import React, { useState, useEffect } from 'react';
import { mockAuth } from './services/mockAuth';
import Auth from './components/Auth';
import FoodListings from './components/FoodListings';
import CreateListing from './components/CreateListing';
import { authAPI } from './services/api';
import { User } from './types';

function App() {
  const [user, setUser] = useState<any>(null);
  const [userProfile, setUserProfile] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentView, setCurrentView] = useState<'listings' | 'create' | 'profile'>('listings');

  useEffect(() => {
    const unsubscribe = mockAuth.onAuthStateChanged(async (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
        setUserProfile({ 
          id: 1, 
          firebase_uid: firebaseUser.uid, 
          email: firebaseUser.email, 
          name: firebaseUser.displayName || 'Demo User', 
          user_type: 'business',
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
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleAuthSuccess = () => {
    // User state will be updated by the auth state listener
  };

  if (loading) {
    return <div style={{ textAlign: 'center', padding: '50px' }}>Loading...</div>;
  }

  if (!user) {
    return <Auth onAuthSuccess={handleAuthSuccess} />;
  }

  return (
    <div>
      {/* Navigation */}
      <nav style={{ 
        backgroundColor: '#007bff', 
        color: 'white', 
        padding: '15px 20px', 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center' 
      }}>
        <h1 style={{ margin: 0 }}>FoodSaver</h1>
        
        <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
          <button
            onClick={() => setCurrentView('listings')}
            style={{ 
              background: currentView === 'listings' ? 'rgba(255,255,255,0.2)' : 'none', 
              border: 'none', 
              color: 'white', 
              padding: '8px 12px', 
              cursor: 'pointer' 
            }}
          >
            Browse Food
          </button>
          
          {userProfile?.user_type === 'business' && (
            <button
              onClick={() => setCurrentView('create')}
              style={{ 
                background: currentView === 'create' ? 'rgba(255,255,255,0.2)' : 'none', 
                border: 'none', 
                color: 'white', 
                padding: '8px 12px', 
                cursor: 'pointer' 
              }}
            >
              Create Listing
            </button>
          )}
          
          <span>Welcome, {userProfile?.name || user.email}</span>
          <button
            onClick={handleLogout}
            style={{ 
              backgroundColor: '#dc3545', 
              border: 'none', 
              color: 'white', 
              padding: '8px 12px', 
              borderRadius: '4px', 
              cursor: 'pointer' 
            }}
          >
            Logout
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <main>
        {currentView === 'listings' && <FoodListings />}
        {currentView === 'create' && userProfile?.user_type === 'business' && <CreateListing />}
      </main>
    </div>
  );
}

export default App;