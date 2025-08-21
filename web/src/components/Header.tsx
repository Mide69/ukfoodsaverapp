import React, { useState } from 'react';
import { theme } from '../styles/theme';

interface HeaderProps {
  user: any;
  userProfile: any;
  onLogout: () => void;
  currentView: string;
  setCurrentView: (view: 'listings' | 'stores' | 'create' | 'admin' | 'cart') => void;
  cartCount: number;
  onSearch?: (query: string) => void;
}

const Header: React.FC<HeaderProps> = ({ user, userProfile, onLogout, currentView, setCurrentView, cartCount, onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (onSearch) {
      onSearch(query);
    }
  };

  return (
    <header style={{
      background: `linear-gradient(135deg, ${theme.colors.primary} 0%, ${theme.colors.accent} 100%)`,
      color: 'white',
      padding: '0',
      boxShadow: theme.shadows.header,
      fontFamily: theme.fonts.primary
    }}>
      {/* Top Bar */}
      <div style={{
        padding: '12px 24px',
        borderBottom: '1px solid rgba(255,255,255,0.1)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        fontSize: '14px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <span>📍 Delivering across UK</span>
          <span>📞 Support: 0800-FOOD-SAVE</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <span>Welcome, {userProfile?.name || user?.email}</span>
          <button onClick={onLogout} style={{
            background: 'rgba(255,255,255,0.2)',
            border: 'none',
            color: 'white',
            padding: '6px 12px',
            borderRadius: '20px',
            cursor: 'pointer',
            fontSize: '12px'
          }}>
            Logout
          </button>
        </div>
      </div>

      {/* Main Header */}
      <div style={{
        padding: '20px 24px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ fontSize: '2.5rem' }}>🌱</div>
          <div>
            <h1 style={{ margin: 0, fontSize: '28px', fontWeight: '700' }}>FoodSaver</h1>
            <p style={{ margin: 0, fontSize: '12px', opacity: 0.9 }}>Reduce Waste • Save Money • Help Planet</p>
          </div>
        </div>

        {/* Search Bar */}
        <div style={{ flex: 1, maxWidth: '500px', margin: '0 40px' }}>
          <div style={{ position: 'relative' }}>
            <input
              type="text"
              placeholder="Search for food, stores, or locations..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              style={{
                width: '100%',
                padding: '14px 50px 14px 20px',
                borderRadius: '25px',
                border: 'none',
                fontSize: '16px',
                outline: 'none',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
              }}
            />
            <div style={{
              position: 'absolute',
              right: '15px',
              top: '50%',
              transform: 'translateY(-50%)',
              fontSize: '20px',
              cursor: 'pointer'
            }}>🔍</div>
          </div>
        </div>

        {/* Cart & Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <button
            onClick={() => setCurrentView('cart')}
            style={{
              background: 'rgba(255,255,255,0.2)',
              border: 'none',
              color: 'white',
              padding: '12px 16px',
              borderRadius: '12px',
              cursor: 'pointer',
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            🛒 Cart
            {cartCount > 0 && (
              <span style={{
                position: 'absolute',
                top: '-5px',
                right: '-5px',
                background: theme.colors.secondary,
                color: 'white',
                borderRadius: '50%',
                width: '20px',
                height: '20px',
                fontSize: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Navigation */}
      <nav style={{
        padding: '0 24px',
        borderTop: '1px solid rgba(255,255,255,0.1)',
        background: 'rgba(255,255,255,0.1)'
      }}>
        <div style={{ display: 'flex', gap: '0' }}>
          {[
            { key: 'listings' as const, label: '🏪 Browse Food', icon: '🏪' },
            { key: 'stores' as const, label: '🏬 All Stores', icon: '🏬' },
            { key: 'create' as const, label: '➕ List Food', icon: '➕' },
            { key: 'admin' as const, label: '🛡️ Admin', icon: '🛡️' }
          ].map(nav => (
            <button
              key={nav.key}
              onClick={() => setCurrentView(nav.key)}
              style={{
                background: currentView === nav.key ? 'rgba(255,255,255,0.2)' : 'transparent',
                border: 'none',
                color: 'white',
                padding: '16px 24px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: '500',
                borderBottom: currentView === nav.key ? '3px solid white' : '3px solid transparent',
                transition: 'all 0.3s ease'
              }}
            >
              {nav.label}
            </button>
          ))}
        </div>
      </nav>
    </header>
  );
};

export default Header;