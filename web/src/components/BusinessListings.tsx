import React, { useState } from 'react';
import { theme } from '../styles/theme';
import { mockListings } from '../data/mockData';

const BusinessListings: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'my-listings' | 'analytics'>('my-listings');
  
  // Simulate business user's own listings
  const myListings = mockListings.slice(0, 8);
  const totalRevenue = myListings.reduce((sum, item) => sum + (item.discountedPrice * Math.floor(item.quantity * 0.6)), 0);
  const totalSold = myListings.reduce((sum, item) => sum + Math.floor(item.quantity * 0.6), 0);

  return (
    <div style={{ padding: '24px', fontFamily: theme.fonts.primary }}>
      <div style={{ textAlign: 'center', marginBottom: '32px' }}>
        <h2 style={{
          color: theme.colors.text,
          fontSize: '32px',
          fontWeight: '700',
          marginBottom: '8px'
        }}>
          🏪 My Business Dashboard
        </h2>
        <p style={{
          color: theme.colors.textSecondary,
          fontSize: '16px'
        }}>
          Manage your food listings and track performance
        </p>
      </div>

      {/* Tab Navigation */}
      <div style={{
        display: 'flex',
        gap: '0',
        marginBottom: '32px',
        background: theme.colors.surface,
        borderRadius: '12px',
        padding: '4px',
        boxShadow: theme.shadows.card
      }}>
        <button
          onClick={() => setActiveTab('my-listings')}
          style={{
            flex: 1,
            padding: '12px 24px',
            background: activeTab === 'my-listings' 
              ? `linear-gradient(135deg, ${theme.colors.primary} 0%, ${theme.colors.accent} 100%)`
              : 'transparent',
            color: activeTab === 'my-listings' ? 'white' : theme.colors.text,
            border: 'none',
            borderRadius: '8px',
            fontSize: '16px',
            fontWeight: '600',
            cursor: 'pointer'
          }}
        >
          📦 My Listings ({myListings.length})
        </button>
        <button
          onClick={() => setActiveTab('analytics')}
          style={{
            flex: 1,
            padding: '12px 24px',
            background: activeTab === 'analytics' 
              ? `linear-gradient(135deg, ${theme.colors.primary} 0%, ${theme.colors.accent} 100%)`
              : 'transparent',
            color: activeTab === 'analytics' ? 'white' : theme.colors.text,
            border: 'none',
            borderRadius: '8px',
            fontSize: '16px',
            fontWeight: '600',
            cursor: 'pointer'
          }}
        >
          📊 Analytics
        </button>
      </div>

      {activeTab === 'my-listings' && (
        <div>
          {/* Quick Stats */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '20px',
            marginBottom: '32px'
          }}>
            <div style={{
              background: `linear-gradient(135deg, ${theme.colors.primary} 0%, ${theme.colors.accent} 100%)`,
              color: 'white',
              padding: '20px',
              borderRadius: '12px'
            }}>
              <div style={{ fontSize: '24px', fontWeight: '700' }}>{myListings.length}</div>
              <div style={{ fontSize: '14px', opacity: 0.9 }}>Active Listings</div>
            </div>
            <div style={{
              background: `linear-gradient(135deg, ${theme.colors.secondary} 0%, #FFB74D 100%)`,
              color: 'white',
              padding: '20px',
              borderRadius: '12px'
            }}>
              <div style={{ fontSize: '24px', fontWeight: '700' }}>{totalSold}</div>
              <div style={{ fontSize: '14px', opacity: 0.9 }}>Items Sold</div>
            </div>
            <div style={{
              background: `linear-gradient(135deg, ${theme.colors.success} 0%, #66BB6A 100%)`,
              color: 'white',
              padding: '20px',
              borderRadius: '12px'
            }}>
              <div style={{ fontSize: '24px', fontWeight: '700' }}>£{totalRevenue.toFixed(0)}</div>
              <div style={{ fontSize: '14px', opacity: 0.9 }}>Revenue</div>
            </div>
          </div>

          {/* My Listings */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '20px'
          }}>
            {myListings.map(listing => (
              <div key={listing.id} style={{
                background: theme.colors.surface,
                borderRadius: '12px',
                padding: '20px',
                boxShadow: theme.shadows.card
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                  <div style={{ fontSize: '2rem' }}>{listing.image}</div>
                  <div style={{ flex: 1 }}>
                    <h4 style={{ margin: 0, fontSize: '16px', fontWeight: '600', color: theme.colors.text }}>
                      {listing.title}
                    </h4>
                    <div style={{
                      display: 'inline-block',
                      background: listing.status === 'available' ? `${theme.colors.success}20` : `${theme.colors.warning}20`,
                      color: listing.status === 'available' ? theme.colors.success : theme.colors.warning,
                      padding: '2px 8px',
                      borderRadius: '8px',
                      fontSize: '12px',
                      fontWeight: '600',
                      textTransform: 'capitalize'
                    }}>
                      {listing.status}
                    </div>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px' }}>
                  <div>
                    <div style={{ fontSize: '12px', color: theme.colors.textSecondary }}>Quantity</div>
                    <div style={{ fontWeight: '600' }}>{listing.quantity} available</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '12px', color: theme.colors.textSecondary }}>Price</div>
                    <div style={{ fontWeight: '600' }}>£{listing.discountedPrice}</div>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '8px' }}>
                  <button style={{
                    flex: 1,
                    padding: '8px 12px',
                    background: theme.colors.primary,
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    fontSize: '12px',
                    cursor: 'pointer'
                  }}>
                    Edit
                  </button>
                  <button style={{
                    flex: 1,
                    padding: '8px 12px',
                    background: theme.colors.error,
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    fontSize: '12px',
                    cursor: 'pointer'
                  }}>
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'analytics' && (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '24px'
        }}>
          <div style={{
            background: theme.colors.surface,
            borderRadius: '16px',
            padding: '24px',
            boxShadow: theme.shadows.card
          }}>
            <h3 style={{ margin: '0 0 16px 0', color: theme.colors.text }}>📈 Sales Performance</h3>
            <div style={{ fontSize: '32px', fontWeight: '700', color: theme.colors.primary, marginBottom: '8px' }}>
              £{totalRevenue.toFixed(2)}
            </div>
            <div style={{ fontSize: '14px', color: theme.colors.textSecondary }}>Total Revenue This Month</div>
          </div>

          <div style={{
            background: theme.colors.surface,
            borderRadius: '16px',
            padding: '24px',
            boxShadow: theme.shadows.card
          }}>
            <h3 style={{ margin: '0 0 16px 0', color: theme.colors.text }}>🌱 Environmental Impact</h3>
            <div style={{ fontSize: '32px', fontWeight: '700', color: theme.colors.success, marginBottom: '8px' }}>
              {(totalSold * 0.8).toFixed(1)} kg
            </div>
            <div style={{ fontSize: '14px', color: theme.colors.textSecondary }}>Food Waste Prevented</div>
          </div>

          <div style={{
            background: theme.colors.surface,
            borderRadius: '16px',
            padding: '24px',
            boxShadow: theme.shadows.card
          }}>
            <h3 style={{ margin: '0 0 16px 0', color: theme.colors.text }}>⭐ Customer Rating</h3>
            <div style={{ fontSize: '32px', fontWeight: '700', color: theme.colors.secondary, marginBottom: '8px' }}>
              4.6
            </div>
            <div style={{ fontSize: '14px', color: theme.colors.textSecondary }}>Average Rating (24 reviews)</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BusinessListings;