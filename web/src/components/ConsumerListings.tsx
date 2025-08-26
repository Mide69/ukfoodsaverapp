import React, { useState } from 'react';
import { theme } from '../styles/theme';
import { mockListings } from '../data/mockData';
import FoodCard from './FoodCard';
import FilterSidebar from './FilterSidebar';

interface ConsumerListingsProps {
  searchQuery: string;
  onAddToCart: (listing: any) => void;
}

const ConsumerListings: React.FC<ConsumerListingsProps> = ({ searchQuery, onAddToCart }) => {
  const [filters, setFilters] = useState({
    location: 'All Locations',
    category: 'All Categories',
    priceRange: [0, 50] as [number, number],
    store: 'All Stores'
  });

  // Filter listings for consumers (only available items)
  const filteredListings = mockListings.filter(listing => {
    if (listing.status !== 'available') return false;
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

  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: window.innerWidth < 1024 ? 'column' : 'row',
      gap: '24px' 
    }}>
      {window.innerWidth >= 1024 && <FilterSidebar filters={filters} onFilterChange={setFilters} />}
      <div style={{ flex: 1 }}>
        {/* Header */}
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

        {/* Promotional Banner */}
        <div style={{
          background: `linear-gradient(135deg, ${theme.colors.primary} 0%, ${theme.colors.accent} 100%)`,
          color: 'white',
          padding: '20px',
          borderRadius: '12px',
          marginBottom: '24px',
          textAlign: 'center'
        }}>
          <h3 style={{ margin: '0 0 8px 0', fontSize: '20px', fontWeight: '600' }}>
            🌟 Save Money, Save the Planet!
          </h3>
          <p style={{ margin: 0, fontSize: '14px', opacity: 0.9 }}>
            Rescue delicious food at discounted prices and help reduce waste
          </p>
        </div>
        
        {/* Mobile Filter Toggle */}
        {window.innerWidth < 1024 && (
          <details style={{
            background: theme.colors.surface,
            borderRadius: '12px',
            padding: '16px',
            marginBottom: '24px',
            boxShadow: theme.shadows.card
          }}>
            <summary style={{
              cursor: 'pointer',
              fontWeight: '600',
              color: theme.colors.text
            }}>
              🔍 Filters & Search
            </summary>
            <div style={{ marginTop: '16px' }}>
              <FilterSidebar filters={filters} onFilterChange={setFilters} />
            </div>
          </details>
        )}
        
        {/* Food Grid */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: window.innerWidth < 640 ? '1fr' : 
                              window.innerWidth < 1024 ? 'repeat(2, 1fr)' : 
                              'repeat(auto-fill, minmax(320px, 1fr))', 
          gap: window.innerWidth < 640 ? '16px' : '24px'
        }}>
          {filteredListings.map(listing => (
            <FoodCard 
              key={listing.id} 
              listing={listing} 
              onAddToCart={onAddToCart}
            />
          ))}
        </div>

        {/* No Results */}
        {filteredListings.length === 0 && (
          <div style={{
            textAlign: 'center',
            padding: '60px 20px',
            color: theme.colors.textSecondary
          }}>
            <div style={{ fontSize: '4rem', marginBottom: '20px' }}>🔍</div>
            <h3 style={{ color: theme.colors.text, marginBottom: '10px' }}>No food found</h3>
            <p>Try adjusting your filters or search terms</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ConsumerListings;