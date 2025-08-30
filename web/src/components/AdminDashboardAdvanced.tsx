import React, { useState } from 'react';
import { theme } from '../styles/theme';

interface AdminDashboardAdvancedProps {
  user?: any;
}

const AdminDashboardAdvanced: React.FC<AdminDashboardAdvancedProps> = ({ user }) => {
  const [selectedStore, setSelectedStore] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [dateRange, setDateRange] = useState('30d');

  // Check if user is true admin (logged in with admin/admin)
  const isTrueAdmin = user?.email === 'admin@foodsaver.com' && user?.uid?.includes('admin');

  if (!isTrueAdmin) {
    return (
      <div style={{ 
        textAlign: 'center', 
        padding: '60px 20px',
        fontFamily: theme.fonts.primary 
      }}>
        <div style={{ fontSize: '4rem', marginBottom: '20px' }}>🚫</div>
        <h2 style={{ color: theme.colors.text, marginBottom: '16px' }}>Access Restricted</h2>
        <p style={{ color: theme.colors.textSecondary }}>This dashboard is only available to site administrators.</p>
      </div>
    );
  }

  const stores = [
    { id: 'all', name: 'All Stores' },
    { id: 'tesco', name: 'Tesco Metro' },
    { id: 'sainsbury', name: 'Sainsbury\'s Local' },
    { id: 'coop', name: 'Co-op Food' },
    { id: 'greens', name: 'Green Grocers Ltd' },
    { id: 'bakery', name: 'Corner Bakery' }
  ];

  const locations = [
    { id: 'all', name: 'All Locations' },
    { id: 'london', name: 'London' },
    { id: 'manchester', name: 'Manchester' },
    { id: 'birmingham', name: 'Birmingham' },
    { id: 'leeds', name: 'Leeds' },
    { id: 'liverpool', name: 'Liverpool' }
  ];

  const getFilteredStats = () => {
    const baseStats = {
      users: 2847,
      businesses: 156,
      foodSaved: 12450,
      revenue: 18920
    };

    // Apply filters (mock filtering logic)
    let multiplier = 1;
    if (selectedStore !== 'all') multiplier *= 0.15;
    if (selectedLocation !== 'all') multiplier *= 0.25;
    if (dateRange === '7d') multiplier *= 0.3;
    if (dateRange === '1d') multiplier *= 0.05;

    return {
      users: Math.round(baseStats.users * multiplier),
      businesses: Math.round(baseStats.businesses * multiplier),
      foodSaved: Math.round(baseStats.foodSaved * multiplier),
      revenue: Math.round(baseStats.revenue * multiplier)
    };
  };

  const stats = getFilteredStats();

  return (
    <div style={{ fontFamily: theme.fonts.primary }}>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ 
          fontSize: '32px', 
          fontWeight: '700', 
          color: theme.colors.primary,
          marginBottom: '8px'
        }}>
          🛡️ Site Admin Dashboard
        </h1>
        <p style={{ color: theme.colors.textSecondary, fontSize: '16px' }}>
          Complete platform analytics and management
        </p>
      </div>

      {/* Filters */}
      <div style={{
        background: theme.colors.surface,
        padding: '24px',
        borderRadius: '16px',
        marginBottom: '24px',
        boxShadow: theme.shadows.card
      }}>
        <h3 style={{ 
          fontSize: '18px', 
          fontWeight: '600', 
          color: theme.colors.text,
          marginBottom: '16px'
        }}>
          🔍 Filter Analytics
        </h3>
        
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: window.innerWidth < 768 ? '1fr' : 'repeat(4, 1fr)',
          gap: '16px'
        }}>
          <div>
            <label style={{ 
              display: 'block', 
              fontSize: '14px', 
              fontWeight: '500',
              color: theme.colors.text,
              marginBottom: '8px'
            }}>
              Store
            </label>
            <select
              value={selectedStore}
              onChange={(e) => setSelectedStore(e.target.value)}
              style={{
                width: '100%',
                padding: '12px 16px',
                border: `2px solid ${theme.colors.border}`,
                borderRadius: '8px',
                fontSize: '14px',
                background: 'white',
                cursor: 'pointer'
              }}
            >
              {stores.map(store => (
                <option key={store.id} value={store.id}>{store.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label style={{ 
              display: 'block', 
              fontSize: '14px', 
              fontWeight: '500',
              color: theme.colors.text,
              marginBottom: '8px'
            }}>
              Location
            </label>
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              style={{
                width: '100%',
                padding: '12px 16px',
                border: `2px solid ${theme.colors.border}`,
                borderRadius: '8px',
                fontSize: '14px',
                background: 'white',
                cursor: 'pointer'
              }}
            >
              {locations.map(location => (
                <option key={location.id} value={location.id}>{location.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label style={{ 
              display: 'block', 
              fontSize: '14px', 
              fontWeight: '500',
              color: theme.colors.text,
              marginBottom: '8px'
            }}>
              Time Period
            </label>
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              style={{
                width: '100%',
                padding: '12px 16px',
                border: `2px solid ${theme.colors.border}`,
                borderRadius: '8px',
                fontSize: '14px',
                background: 'white',
                cursor: 'pointer'
              }}
            >
              <option value="1d">Last 24 Hours</option>
              <option value="7d">Last 7 Days</option>
              <option value="30d">Last 30 Days</option>
              <option value="90d">Last 90 Days</option>
              <option value="1y">Last Year</option>
            </select>
          </div>

          <div style={{ display: 'flex', alignItems: 'end' }}>
            <button
              onClick={() => {
                setSelectedStore('all');
                setSelectedLocation('all');
                setDateRange('30d');
              }}
              style={{
                width: '100%',
                padding: '12px 16px',
                background: theme.colors.secondary,
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: '500',
                cursor: 'pointer'
              }}
            >
              Reset Filters
            </button>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
        gap: '24px',
        marginBottom: '32px'
      }}>
        {[
          { title: 'Total Users', value: stats.users.toLocaleString(), change: '+12%', icon: '👥' },
          { title: 'Active Businesses', value: stats.businesses.toLocaleString(), change: '+8%', icon: '🏪' },
          { title: 'Food Saved (kg)', value: stats.foodSaved.toLocaleString(), change: '+23%', icon: '🌱' },
          { title: 'Revenue', value: `£${stats.revenue.toLocaleString()}`, change: '+15%', icon: '💰' }
        ].map((stat, index) => (
          <div key={index} style={{
            background: theme.colors.surface,
            padding: '24px',
            borderRadius: '16px',
            boxShadow: theme.shadows.card,
            border: '1px solid rgba(46, 125, 50, 0.1)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
              <span style={{ fontSize: '24px' }}>{stat.icon}</span>
              <span style={{ 
                color: theme.colors.success, 
                fontSize: '14px', 
                fontWeight: '600',
                background: 'rgba(76, 175, 80, 0.1)',
                padding: '4px 8px',
                borderRadius: '12px'
              }}>
                {stat.change}
              </span>
            </div>
            <h3 style={{ 
              fontSize: '28px', 
              fontWeight: '700', 
              color: theme.colors.text,
              margin: '0 0 4px 0'
            }}>
              {stat.value}
            </h3>
            <p style={{ 
              color: theme.colors.textSecondary, 
              fontSize: '14px',
              margin: 0
            }}>
              {stat.title}
            </p>
          </div>
        ))}
      </div>

      {/* Detailed Analytics */}
      <div style={{ display: 'grid', gridTemplateColumns: window.innerWidth < 1024 ? '1fr' : '2fr 1fr', gap: '24px', marginBottom: '32px' }}>
        {/* Performance by Store */}
        <div style={{
          background: theme.colors.surface,
          borderRadius: '16px',
          padding: '24px',
          boxShadow: theme.shadows.card
        }}>
          <h3 style={{ 
            fontSize: '18px', 
            fontWeight: '600', 
            color: theme.colors.text,
            marginBottom: '20px'
          }}>
            🏆 Top Performing Stores
          </h3>
          
          {[
            { name: 'Tesco Metro', location: 'London', saved: '2,450kg', revenue: '£3,200' },
            { name: 'Sainsbury\'s Local', location: 'Manchester', saved: '1,890kg', revenue: '£2,800' },
            { name: 'Co-op Food', location: 'Birmingham', saved: '1,650kg', revenue: '£2,400' },
            { name: 'Green Grocers Ltd', location: 'Leeds', saved: '1,200kg', revenue: '£1,900' }
          ].map((store, index) => (
            <div key={index} style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '16px',
              background: 'rgba(46, 125, 50, 0.05)',
              borderRadius: '12px',
              marginBottom: '12px'
            }}>
              <div>
                <h4 style={{ margin: '0 0 4px 0', fontSize: '16px', fontWeight: '600' }}>
                  {store.name}
                </h4>
                <p style={{ margin: 0, fontSize: '14px', color: theme.colors.textSecondary }}>
                  {store.location}
                </p>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '14px', fontWeight: '600', color: theme.colors.success }}>
                  {store.saved}
                </div>
                <div style={{ fontSize: '14px', color: theme.colors.textSecondary }}>
                  {store.revenue}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div style={{
          background: theme.colors.surface,
          borderRadius: '16px',
          padding: '24px',
          boxShadow: theme.shadows.card
        }}>
          <h3 style={{ 
            fontSize: '18px', 
            fontWeight: '600', 
            color: theme.colors.text,
            marginBottom: '20px'
          }}>
            ⚙️ Admin Actions
          </h3>
          
          {[
            { label: 'Export Data', icon: '📄', action: 'export' },
            { label: 'User Management', icon: '👥', action: 'users' },
            { label: 'Store Approval', icon: '✅', action: 'approval' },
            { label: 'System Settings', icon: '⚙️', action: 'settings' }
          ].map((action, index) => (
            <button
              key={index}
              style={{
                width: '100%',
                padding: '16px',
                background: 'white',
                border: `2px solid ${theme.colors.border}`,
                borderRadius: '12px',
                marginBottom: '12px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                fontSize: '14px',
                fontWeight: '500',
                transition: 'all 0.3s ease'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.borderColor = theme.colors.primary;
                e.currentTarget.style.background = 'rgba(46, 125, 50, 0.05)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.borderColor = theme.colors.border;
                e.currentTarget.style.background = 'white';
              }}
            >
              <span style={{ fontSize: '18px' }}>{action.icon}</span>
              {action.label}
            </button>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div style={{
        background: theme.colors.surface,
        borderRadius: '16px',
        padding: '24px',
        boxShadow: theme.shadows.card
      }}>
        <h2 style={{ 
          fontSize: '20px', 
          fontWeight: '600', 
          color: theme.colors.text,
          marginBottom: '20px'
        }}>
          📈 Recent Platform Activity
        </h2>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {[
            { action: 'New business registered', details: 'Green Grocers Ltd - Manchester', time: '2 hours ago', type: 'business' },
            { action: 'Large food rescue', details: '45kg saved by Tesco Metro', time: '4 hours ago', type: 'rescue' },
            { action: 'User milestone reached', details: '1000+ app downloads', time: '6 hours ago', type: 'milestone' },
            { action: 'Payment processed', details: '£127.50 transaction completed', time: '8 hours ago', type: 'payment' }
          ].map((activity, index) => (
            <div key={index} style={{
              display: 'flex',
              alignItems: 'center',
              padding: '16px',
              background: 'rgba(46, 125, 50, 0.05)',
              borderRadius: '12px',
              border: '1px solid rgba(46, 125, 50, 0.1)'
            }}>
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                background: theme.colors.primary,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: '16px',
                fontSize: '18px'
              }}>
                {activity.type === 'business' ? '🏪' : 
                 activity.type === 'rescue' ? '🌱' :
                 activity.type === 'milestone' ? '🎉' : '💳'}
              </div>
              <div style={{ flex: 1 }}>
                <h4 style={{ 
                  margin: '0 0 4px 0', 
                  fontSize: '16px', 
                  fontWeight: '600',
                  color: theme.colors.text
                }}>
                  {activity.action}
                </h4>
                <p style={{ 
                  margin: '0 0 4px 0', 
                  fontSize: '14px',
                  color: theme.colors.textSecondary
                }}>
                  {activity.details}
                </p>
                <span style={{ 
                  fontSize: '12px', 
                  color: theme.colors.textSecondary
                }}>
                  {activity.time}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardAdvanced;