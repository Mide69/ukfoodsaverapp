import React from 'react';
import { theme } from '../styles/theme';

interface FilterSidebarProps {
  filters: {
    location: string;
    category: string;
    priceRange: [number, number];
    store: string;
  };
  onFilterChange: (filters: any) => void;
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({ filters, onFilterChange }) => {
  const locations = ['All Locations', 'London', 'Manchester', 'Birmingham', 'Leeds', 'Bristol', 'Edinburgh'];
  const categories = ['All Categories', 'vegetables', 'fruits', 'bakery', 'dairy', 'prepared', 'meat'];
  const stores = ['All Stores', 'Tesco Express', 'Sainsbury\'s Local', 'ASDA Superstore', 'Morrisons', 'The Green Grocer', 'Farm Fresh Market'];

  return (
    <div style={{
      width: '280px',
      background: theme.colors.surface,
      borderRadius: '16px',
      padding: '24px',
      boxShadow: theme.shadows.card,
      height: 'fit-content',
      fontFamily: theme.fonts.primary
    }}>
      <h3 style={{
        margin: '0 0 20px 0',
        fontSize: '20px',
        fontWeight: '600',
        color: theme.colors.text
      }}>
        🔍 Filter Results
      </h3>

      {/* Location Filter */}
      <div style={{ marginBottom: '24px' }}>
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
          onChange={(e) => onFilterChange({ ...filters, location: e.target.value })}
          style={{
            width: '100%',
            padding: '12px',
            borderRadius: '8px',
            border: `2px solid ${theme.colors.border}`,
            fontSize: '14px',
            outline: 'none',
            background: 'white'
          }}
        >
          {locations.map(location => (
            <option key={location} value={location}>{location}</option>
          ))}
        </select>
      </div>

      {/* Category Filter */}
      <div style={{ marginBottom: '24px' }}>
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
          onChange={(e) => onFilterChange({ ...filters, category: e.target.value })}
          style={{
            width: '100%',
            padding: '12px',
            borderRadius: '8px',
            border: `2px solid ${theme.colors.border}`,
            fontSize: '14px',
            outline: 'none',
            background: 'white'
          }}
        >
          {categories.map(category => (
            <option key={category} value={category}>
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </option>
          ))}
        </select>
      </div>

      {/* Store Filter */}
      <div style={{ marginBottom: '24px' }}>
        <label style={{
          display: 'block',
          fontSize: '14px',
          fontWeight: '600',
          color: theme.colors.text,
          marginBottom: '8px'
        }}>
          🏪 Store
        </label>
        <select
          value={filters.store}
          onChange={(e) => onFilterChange({ ...filters, store: e.target.value })}
          style={{
            width: '100%',
            padding: '12px',
            borderRadius: '8px',
            border: `2px solid ${theme.colors.border}`,
            fontSize: '14px',
            outline: 'none',
            background: 'white'
          }}
        >
          {stores.map(store => (
            <option key={store} value={store}>{store}</option>
          ))}
        </select>
      </div>

      {/* Price Range */}
      <div style={{ marginBottom: '24px' }}>
        <label style={{
          display: 'block',
          fontSize: '14px',
          fontWeight: '600',
          color: theme.colors.text,
          marginBottom: '8px'
        }}>
          💰 Price Range: £{filters.priceRange[0]} - £{filters.priceRange[1]}
        </label>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <input
            type="range"
            min="0"
            max="50"
            value={filters.priceRange[1]}
            onChange={(e) => onFilterChange({ 
              ...filters, 
              priceRange: [filters.priceRange[0], parseInt(e.target.value)] 
            })}
            style={{
              width: '100%',
              accentColor: theme.colors.primary
            }}
          />
        </div>
      </div>

      {/* Clear Filters */}
      <button
        onClick={() => onFilterChange({
          location: 'All Locations',
          category: 'All Categories',
          priceRange: [0, 50],
          store: 'All Stores'
        })}
        style={{
          width: '100%',
          background: theme.colors.background,
          color: theme.colors.text,
          border: `2px solid ${theme.colors.border}`,
          padding: '12px',
          borderRadius: '8px',
          fontSize: '14px',
          fontWeight: '500',
          cursor: 'pointer',
          transition: 'all 0.3s ease'
        }}
      >
        🗑️ Clear All Filters
      </button>
    </div>
  );
};

export default FilterSidebar;