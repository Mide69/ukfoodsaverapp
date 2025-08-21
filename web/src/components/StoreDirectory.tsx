import React, { useState } from 'react';
import { theme } from '../styles/theme';
import { ukStores, ukLocations, storeCategories } from '../data/ukStores';

const StoreDirectory: React.FC = () => {
  const [filters, setFilters] = useState({
    location: 'All Locations',
    category: 'All Categories',
    searchQuery: ''
  });

  const filteredStores = ukStores.filter(store => {
    if (filters.category !== 'All Categories' && store.category !== filters.category) return false;
    if (filters.searchQuery && !store.name.toLowerCase().includes(filters.searchQuery.toLowerCase()) && 
        !store.description.toLowerCase().includes(filters.searchQuery.toLowerCase())) return false;
    return true;
  });

  const handleFilterChange = (key: string, value: string) => {
    setFilters({ ...filters, [key]: value });
  };

  return (
    <div style={{
      padding: '24px',
      fontFamily: theme.fonts.primary
    }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '32px' }}>
        <h2 style={{
          color: theme.colors.text,
          fontSize: '32px',
          fontWeight: '700',
          marginBottom: '8px'
        }}>
          🏬 UK Store Directory
        </h2>
        <p style={{
          color: theme.colors.textSecondary,
          fontSize: '16px'
        }}>
          Discover {ukStores.length} stores across {ukLocations.length} UK locations
        </p>
      </div>

      {/* Filters */}
      <div style={{
        background: theme.colors.surface,
        borderRadius: '16px',
        padding: '24px',
        marginBottom: '32px',
        boxShadow: theme.shadows.card
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '20px',
          alignItems: 'end'
        }}>
          {/* Search */}
          <div>
            <label style={{
              display: 'block',
              fontSize: '14px',
              fontWeight: '600',
              color: theme.colors.text,
              marginBottom: '8px'
            }}>
              🔍 Search Stores
            </label>
            <input
              type="text"
              placeholder="Search by name or description..."
              value={filters.searchQuery}
              onChange={(e) => handleFilterChange('searchQuery', e.target.value)}
              style={{
                width: '100%',
                padding: '12px 16px',
                borderRadius: '8px',
                border: `2px solid ${theme.colors.border}`,
                fontSize: '14px',
                outline: 'none',
                boxSizing: 'border-box'
              }}
            />
          </div>

          {/* Location Filter */}
          <div>
            <label style={{
              display: 'block',
              fontSize: '14px',
              fontWeight: '600',
              color: theme.colors.text,
              marginBottom: '8px'
            }}>
              📍 Location
            </label>
            <select
              value={filters.location}
              onChange={(e) => handleFilterChange('location', e.target.value)}
              style={{
                width: '100%',
                padding: '12px 16px',
                borderRadius: '8px',
                border: `2px solid ${theme.colors.border}`,
                fontSize: '14px',
                outline: 'none',
                background: 'white',
                boxSizing: 'border-box'
              }}
            >
              <option value="All Locations">All Locations ({ukLocations.length})</option>
              {ukLocations.map(location => (
                <option key={location} value={location}>{location}</option>
              ))}
            </select>
          </div>

          {/* Category Filter */}
          <div>
            <label style={{
              display: 'block',
              fontSize: '14px',
              fontWeight: '600',
              color: theme.colors.text,
              marginBottom: '8px'
            }}>
              🏷️ Category
            </label>
            <select
              value={filters.category}
              onChange={(e) => handleFilterChange('category', e.target.value)}
              style={{
                width: '100%',
                padding: '12px 16px',
                borderRadius: '8px',
                border: `2px solid ${theme.colors.border}`,
                fontSize: '14px',
                outline: 'none',
                background: 'white',
                boxSizing: 'border-box'
              }}
            >
              {storeCategories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>

          {/* Clear Filters */}
          <button
            onClick={() => setFilters({ location: 'All Locations', category: 'All Categories', searchQuery: '' })}
            style={{
              padding: '12px 20px',
              background: theme.colors.background,
              color: theme.colors.text,
              border: `2px solid ${theme.colors.border}`,
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: '500',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
          >
            🗑️ Clear Filters
          </button>
        </div>
      </div>

      {/* Results Summary */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '24px'
      }}>
        <h3 style={{
          color: theme.colors.text,
          fontSize: '24px',
          fontWeight: '600',
          margin: 0
        }}>
          {filteredStores.length} Stores Found
        </h3>
        <div style={{
          display: 'flex',
          gap: '12px',
          fontSize: '14px',
          color: theme.colors.textSecondary
        }}>
          <span>Sort by: Name</span>
        </div>
      </div>

      {/* Store Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
        gap: '24px'
      }}>
        {filteredStores.map(store => (
          <div key={store.id} style={{
            background: theme.colors.surface,
            borderRadius: '16px',
            padding: '24px',
            boxShadow: theme.shadows.card,
            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            cursor: 'pointer'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = 'translateY(-4px)';
            e.currentTarget.style.boxShadow = '0 8px 24px rgba(46, 125, 50, 0.15)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = theme.shadows.card;
          }}>
            {/* Store Header */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              marginBottom: '16px'
            }}>
              <div style={{
                width: '60px',
                height: '60px',
                background: `linear-gradient(135deg, ${theme.colors.primary} 0%, ${theme.colors.accent} 100%)`,
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '24px'
              }}>
                {store.logo}
              </div>
              <div style={{ flex: 1 }}>
                <h4 style={{
                  margin: '0 0 4px 0',
                  fontSize: '20px',
                  fontWeight: '600',
                  color: theme.colors.text
                }}>
                  {store.name}
                </h4>
                <div style={{
                  display: 'inline-block',
                  background: `${theme.colors.primary}20`,
                  color: theme.colors.primary,
                  padding: '4px 12px',
                  borderRadius: '12px',
                  fontSize: '12px',
                  fontWeight: '600'
                }}>
                  {store.category}
                </div>
              </div>
            </div>

            {/* Store Info */}
            <p style={{
              margin: '0 0 16px 0',
              fontSize: '14px',
              color: theme.colors.textSecondary,
              lineHeight: '1.5'
            }}>
              {store.description}
            </p>

            {/* Store Stats */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr 1fr',
              gap: '12px',
              marginBottom: '20px'
            }}>
              <div style={{
                background: theme.colors.background,
                padding: '12px',
                borderRadius: '8px',
                textAlign: 'center'
              }}>
                <div style={{
                  fontSize: '18px',
                  fontWeight: '700',
                  color: theme.colors.primary,
                  marginBottom: '4px'
                }}>
                  ⭐ {store.rating}
                </div>
                <div style={{
                  fontSize: '12px',
                  color: theme.colors.textSecondary
                }}>
                  Rating
                </div>
              </div>
              
              <div style={{
                background: theme.colors.background,
                padding: '12px',
                borderRadius: '8px',
                textAlign: 'center'
              }}>
                <div style={{
                  fontSize: '18px',
                  fontWeight: '700',
                  color: theme.colors.secondary,
                  marginBottom: '4px'
                }}>
                  📍 {store.locations}
                </div>
                <div style={{
                  fontSize: '12px',
                  color: theme.colors.textSecondary
                }}>
                  Locations
                </div>
              </div>

              <div style={{
                background: theme.colors.background,
                padding: '12px',
                borderRadius: '8px',
                textAlign: 'center'
              }}>
                <div style={{
                  fontSize: '18px',
                  fontWeight: '700',
                  color: theme.colors.accent,
                  marginBottom: '4px'
                }}>
                  🍽️ {Math.floor(Math.random() * 50) + 10}
                </div>
                <div style={{
                  fontSize: '12px',
                  color: theme.colors.textSecondary
                }}>
                  Food Items
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div style={{
              display: 'flex',
              gap: '8px'
            }}>
              <button style={{
                flex: 1,
                padding: '12px',
                background: `linear-gradient(135deg, ${theme.colors.primary} 0%, ${theme.colors.accent} 100%)`,
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'transform 0.2s ease'
              }}
              onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
              onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
                🛒 View Food
              </button>
              
              <button style={{
                flex: 1,
                padding: '12px',
                background: theme.colors.background,
                color: theme.colors.text,
                border: `2px solid ${theme.colors.border}`,
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'transform 0.2s ease'
              }}
              onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
              onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
                📍 Find Stores
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* No Results */}
      {filteredStores.length === 0 && (
        <div style={{
          textAlign: 'center',
          padding: '60px 20px',
          color: theme.colors.textSecondary
        }}>
          <div style={{ fontSize: '4rem', marginBottom: '20px' }}>🔍</div>
          <h3 style={{ color: theme.colors.text, marginBottom: '10px' }}>No stores found</h3>
          <p>Try adjusting your filters or search terms</p>
        </div>
      )}

      {/* Summary Stats */}
      <div style={{
        marginTop: '40px',
        background: `linear-gradient(135deg, ${theme.colors.background} 0%, #E8F5E8 100%)`,
        padding: '32px',
        borderRadius: '16px',
        textAlign: 'center',
        border: `2px solid ${theme.colors.border}`
      }}>
        <h3 style={{
          margin: '0 0 16px 0',
          color: theme.colors.text,
          fontSize: '24px',
          fontWeight: '600'
        }}>
          🇬🇧 Complete UK Coverage
        </h3>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '24px',
          marginTop: '24px'
        }}>
          <div>
            <div style={{
              fontSize: '32px',
              fontWeight: '700',
              color: theme.colors.primary,
              marginBottom: '8px'
            }}>
              {ukStores.length}
            </div>
            <div style={{ color: theme.colors.textSecondary }}>Store Chains</div>
          </div>
          <div>
            <div style={{
              fontSize: '32px',
              fontWeight: '700',
              color: theme.colors.secondary,
              marginBottom: '8px'
            }}>
              {ukLocations.length}
            </div>
            <div style={{ color: theme.colors.textSecondary }}>UK Locations</div>
          </div>
          <div>
            <div style={{
              fontSize: '32px',
              fontWeight: '700',
              color: theme.colors.accent,
              marginBottom: '8px'
            }}>
              {storeCategories.length - 1}
            </div>
            <div style={{ color: theme.colors.textSecondary }}>Store Categories</div>
          </div>
          <div>
            <div style={{
              fontSize: '32px',
              fontWeight: '700',
              color: theme.colors.success,
              marginBottom: '8px'
            }}>
              2000+
            </div>
            <div style={{ color: theme.colors.textSecondary }}>Total Stores</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoreDirectory;