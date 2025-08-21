import React, { useState } from 'react';
import { theme } from '../styles/theme';
import { mockListings } from '../data/mockData';

const AdminListings: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'all-listings' | 'moderation' | 'reports'>('all-listings');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredListings = mockListings.filter(listing => {
    if (statusFilter !== 'all' && listing.status !== statusFilter) return false;
    return true;
  });

  const pendingListings = mockListings.filter(l => Math.random() > 0.8);
  const reportedListings = mockListings.filter(l => Math.random() > 0.9);

  return (
    <div style={{ padding: '24px', fontFamily: theme.fonts.primary }}>
      <div style={{ textAlign: 'center', marginBottom: '32px' }}>
        <h2 style={{
          color: theme.colors.text,
          fontSize: '32px',
          fontWeight: '700',
          marginBottom: '8px'
        }}>
          🛡️ Admin Listings Management
        </h2>
        <p style={{
          color: theme.colors.textSecondary,
          fontSize: '16px'
        }}>
          Monitor and manage all platform listings
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
          onClick={() => setActiveTab('all-listings')}
          style={{
            flex: 1,
            padding: '12px 24px',
            background: activeTab === 'all-listings' 
              ? `linear-gradient(135deg, ${theme.colors.primary} 0%, ${theme.colors.accent} 100%)`
              : 'transparent',
            color: activeTab === 'all-listings' ? 'white' : theme.colors.text,
            border: 'none',
            borderRadius: '8px',
            fontSize: '16px',
            fontWeight: '600',
            cursor: 'pointer'
          }}
        >
          📋 All Listings ({mockListings.length})
        </button>
        <button
          onClick={() => setActiveTab('moderation')}
          style={{
            flex: 1,
            padding: '12px 24px',
            background: activeTab === 'moderation' 
              ? `linear-gradient(135deg, ${theme.colors.primary} 0%, ${theme.colors.accent} 100%)`
              : 'transparent',
            color: activeTab === 'moderation' ? 'white' : theme.colors.text,
            border: 'none',
            borderRadius: '8px',
            fontSize: '16px',
            fontWeight: '600',
            cursor: 'pointer'
          }}
        >
          ⚠️ Moderation ({pendingListings.length})
        </button>
        <button
          onClick={() => setActiveTab('reports')}
          style={{
            flex: 1,
            padding: '12px 24px',
            background: activeTab === 'reports' 
              ? `linear-gradient(135deg, ${theme.colors.primary} 0%, ${theme.colors.accent} 100%)`
              : 'transparent',
            color: activeTab === 'reports' ? 'white' : theme.colors.text,
            border: 'none',
            borderRadius: '8px',
            fontSize: '16px',
            fontWeight: '600',
            cursor: 'pointer'
          }}
        >
          🚨 Reports ({reportedListings.length})
        </button>
      </div>

      {activeTab === 'all-listings' && (
        <div>
          {/* Status Filter */}
          <div style={{ marginBottom: '24px' }}>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              style={{
                padding: '12px 16px',
                borderRadius: '8px',
                border: `2px solid ${theme.colors.border}`,
                fontSize: '14px',
                outline: 'none',
                background: 'white'
              }}
            >
              <option value="all">All Status ({mockListings.length})</option>
              <option value="available">Available ({mockListings.filter(l => l.status === 'available').length})</option>
              <option value="reserved">Reserved ({mockListings.filter(l => l.status === 'reserved').length})</option>
              <option value="completed">Completed ({mockListings.filter(l => l.status === 'completed').length})</option>
            </select>
          </div>

          {/* Listings Table */}
          <div style={{
            background: theme.colors.surface,
            borderRadius: '12px',
            overflow: 'hidden',
            boxShadow: theme.shadows.card
          }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 150px 100px 120px 100px 150px',
              gap: '16px',
              padding: '16px',
              background: theme.colors.background,
              fontWeight: '600',
              fontSize: '14px',
              color: theme.colors.text
            }}>
              <div>Food Item</div>
              <div>Business</div>
              <div>Price</div>
              <div>Status</div>
              <div>Quantity</div>
              <div>Actions</div>
            </div>

            {filteredListings.slice(0, 20).map(listing => (
              <div key={listing.id} style={{
                display: 'grid',
                gridTemplateColumns: '1fr 150px 100px 120px 100px 150px',
                gap: '16px',
                padding: '16px',
                borderBottom: `1px solid ${theme.colors.border}`,
                alignItems: 'center'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span style={{ fontSize: '1.5rem' }}>{listing.image}</span>
                  <div>
                    <div style={{ fontWeight: '600', fontSize: '14px' }}>{listing.title}</div>
                    <div style={{ fontSize: '12px', color: theme.colors.textSecondary }}>{listing.location}</div>
                  </div>
                </div>
                
                <div style={{ fontSize: '14px' }}>{listing.store.name}</div>
                
                <div style={{ fontSize: '14px', fontWeight: '600' }}>£{listing.discountedPrice}</div>
                
                <div>
                  <span style={{
                    padding: '4px 8px',
                    borderRadius: '12px',
                    fontSize: '12px',
                    fontWeight: '600',
                    background: listing.status === 'available' ? `${theme.colors.success}20` : `${theme.colors.warning}20`,
                    color: listing.status === 'available' ? theme.colors.success : theme.colors.warning
                  }}>
                    {listing.status}
                  </span>
                </div>
                
                <div style={{ fontSize: '14px' }}>{listing.quantity}</div>
                
                <div style={{ display: 'flex', gap: '4px' }}>
                  <button style={{
                    padding: '4px 8px',
                    background: theme.colors.primary,
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    fontSize: '12px',
                    cursor: 'pointer'
                  }}>
                    Edit
                  </button>
                  <button style={{
                    padding: '4px 8px',
                    background: theme.colors.error,
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
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

      {activeTab === 'moderation' && (
        <div>
          <div style={{
            background: theme.colors.surface,
            borderRadius: '12px',
            padding: '24px',
            boxShadow: theme.shadows.card
          }}>
            <h3 style={{ margin: '0 0 16px 0', color: theme.colors.text }}>⚠️ Pending Approval</h3>
            {pendingListings.slice(0, 5).map(listing => (
              <div key={listing.id} style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '12px',
                background: theme.colors.background,
                borderRadius: '8px',
                marginBottom: '8px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span style={{ fontSize: '1.5rem' }}>{listing.image}</span>
                  <div>
                    <div style={{ fontWeight: '600' }}>{listing.title}</div>
                    <div style={{ fontSize: '12px', color: theme.colors.textSecondary }}>
                      {listing.store.name} • {listing.location}
                    </div>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button style={{
                    padding: '8px 16px',
                    background: theme.colors.success,
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    fontSize: '14px',
                    cursor: 'pointer'
                  }}>
                    Approve
                  </button>
                  <button style={{
                    padding: '8px 16px',
                    background: theme.colors.error,
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    fontSize: '14px',
                    cursor: 'pointer'
                  }}>
                    Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'reports' && (
        <div>
          <div style={{
            background: theme.colors.surface,
            borderRadius: '12px',
            padding: '24px',
            boxShadow: theme.shadows.card
          }}>
            <h3 style={{ margin: '0 0 16px 0', color: theme.colors.text }}>🚨 Reported Listings</h3>
            {reportedListings.slice(0, 3).map(listing => (
              <div key={listing.id} style={{
                padding: '16px',
                background: `${theme.colors.error}10`,
                border: `2px solid ${theme.colors.error}30`,
                borderRadius: '8px',
                marginBottom: '12px'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                  <div>
                    <div style={{ fontWeight: '600', marginBottom: '4px' }}>{listing.title}</div>
                    <div style={{ fontSize: '12px', color: theme.colors.textSecondary, marginBottom: '8px' }}>
                      Reported by: customer@example.com
                    </div>
                    <div style={{ fontSize: '14px', color: theme.colors.error }}>
                      Reason: Misleading description
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button style={{
                      padding: '6px 12px',
                      background: theme.colors.primary,
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      fontSize: '12px',
                      cursor: 'pointer'
                    }}>
                      Investigate
                    </button>
                    <button style={{
                      padding: '6px 12px',
                      background: theme.colors.error,
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      fontSize: '12px',
                      cursor: 'pointer'
                    }}>
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminListings;