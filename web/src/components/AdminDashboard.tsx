import React, { useState } from 'react';
import { theme } from '../styles/theme';
import { getAnalytics } from '../data/mockData';

const AdminDashboard: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState<'day' | 'week' | 'month' | 'year'>('week');
  const analytics = getAnalytics(selectedPeriod);

  const periods = [
    { value: 'day', label: 'Today', emoji: '📅' },
    { value: 'week', label: 'This Week', emoji: '📊' },
    { value: 'month', label: 'This Month', emoji: '📈' },
    { value: 'year', label: 'This Year', emoji: '🗓️' }
  ];

  return (
    <div style={{ 
      padding: '24px',
      fontFamily: theme.fonts.primary
    }}>
      <div style={{ textAlign: 'center', marginBottom: '32px' }}>
        <h2 style={{
          color: theme.colors.text,
          fontSize: '32px',
          fontWeight: '700',
          marginBottom: '8px'
        }}>
          🛡️ Admin Dashboard
        </h2>
        <p style={{
          color: theme.colors.textSecondary,
          fontSize: '16px'
        }}>
          Monitor food waste reduction and platform performance
        </p>
      </div>

      {/* Period Selector */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '12px',
        marginBottom: '32px'
      }}>
        {periods.map(period => (
          <button
            key={period.value}
            onClick={() => setSelectedPeriod(period.value as any)}
            style={{
              padding: '12px 20px',
              borderRadius: '12px',
              border: 'none',
              background: selectedPeriod === period.value 
                ? `linear-gradient(135deg, ${theme.colors.primary} 0%, ${theme.colors.accent} 100%)`
                : theme.colors.background,
              color: selectedPeriod === period.value ? 'white' : theme.colors.text,
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
          >
            {period.emoji} {period.label}
          </button>
        ))}
      </div>

      {/* Analytics Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '24px',
        marginBottom: '32px'
      }}>
        {/* Food Saved */}
        <div style={{
          background: `linear-gradient(135deg, ${theme.colors.success} 0%, #66BB6A 100%)`,
          color: 'white',
          padding: '24px',
          borderRadius: '16px',
          boxShadow: theme.shadows.card
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
            <div style={{ fontSize: '2.5rem' }}>🌱</div>
            <div>
              <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '600' }}>Food Saved</h3>
              <p style={{ margin: 0, fontSize: '12px', opacity: 0.9 }}>Weight rescued from waste</p>
            </div>
          </div>
          <div style={{ fontSize: '32px', fontWeight: '700', marginBottom: '8px' }}>
            {analytics.foodSavedKg} kg
          </div>
          <div style={{ fontSize: '14px', opacity: 0.9 }}>
            ≈ {analytics.co2Saved} kg CO₂ saved
          </div>
        </div>

        {/* Food Value Saved */}
        <div style={{
          background: `linear-gradient(135deg, ${theme.colors.secondary} 0%, #FFB74D 100%)`,
          color: 'white',
          padding: '24px',
          borderRadius: '16px',
          boxShadow: theme.shadows.card
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
            <div style={{ fontSize: '2.5rem' }}>💰</div>
            <div>
              <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '600' }}>Food Value Saved</h3>
              <p style={{ margin: 0, fontSize: '12px', opacity: 0.9 }}>Original value of rescued food</p>
            </div>
          </div>
          <div style={{ fontSize: '32px', fontWeight: '700', marginBottom: '8px' }}>
            £{analytics.foodSavedValue.toLocaleString()}
          </div>
          <div style={{ fontSize: '14px', opacity: 0.9 }}>
            From {analytics.itemsSold} items sold
          </div>
        </div>

        {/* Customer Savings */}
        <div style={{
          background: `linear-gradient(135deg, ${theme.colors.primary} 0%, ${theme.colors.accent} 100%)`,
          color: 'white',
          padding: '24px',
          borderRadius: '16px',
          boxShadow: theme.shadows.card
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
            <div style={{ fontSize: '2.5rem' }}>🎯</div>
            <div>
              <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '600' }}>Customer Savings</h3>
              <p style={{ margin: 0, fontSize: '12px', opacity: 0.9 }}>Total saved by customers</p>
            </div>
          </div>
          <div style={{ fontSize: '32px', fontWeight: '700', marginBottom: '8px' }}>
            £{analytics.customerSavings.toLocaleString()}
          </div>
          <div style={{ fontSize: '14px', opacity: 0.9 }}>
            Average {Math.round(analytics.customerSavings / Math.max(analytics.itemsSold, 1) * 100) / 100} per item
          </div>
        </div>

        {/* Environmental Impact */}
        <div style={{
          background: `linear-gradient(135deg, #4CAF50 0%, #8BC34A 100%)`,
          color: 'white',
          padding: '24px',
          borderRadius: '16px',
          boxShadow: theme.shadows.card
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
            <div style={{ fontSize: '2.5rem' }}>🌍</div>
            <div>
              <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '600' }}>Environmental Impact</h3>
              <p style={{ margin: 0, fontSize: '12px', opacity: 0.9 }}>Positive environmental effect</p>
            </div>
          </div>
          <div style={{ fontSize: '32px', fontWeight: '700', marginBottom: '8px' }}>
            {analytics.co2Saved} kg
          </div>
          <div style={{ fontSize: '14px', opacity: 0.9 }}>
            CO₂ emissions prevented
          </div>
        </div>
      </div>

      {/* Detailed Analytics */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '2fr 1fr',
        gap: '24px'
      }}>
        {/* Food Categories Breakdown */}
        <div style={{
          background: theme.colors.surface,
          borderRadius: '16px',
          padding: '24px',
          boxShadow: theme.shadows.card
        }}>
          <h3 style={{
            margin: '0 0 20px 0',
            fontSize: '20px',
            fontWeight: '600',
            color: theme.colors.text
          }}>
            📊 Food Categories Impact
          </h3>
          
          <div style={{ display: 'grid', gap: '12px' }}>
            {[
              { category: 'Vegetables', weight: 45.2, emoji: '🥕', color: '#4CAF50' },
              { category: 'Fruits', weight: 38.7, emoji: '🍎', color: '#FF9800' },
              { category: 'Bakery', weight: 28.3, emoji: '🍞', color: '#795548' },
              { category: 'Dairy', weight: 22.1, emoji: '🥛', color: '#2196F3' },
              { category: 'Prepared', weight: 19.8, emoji: '🍱', color: '#9C27B0' },
              { category: 'Meat', weight: 15.4, emoji: '🥩', color: '#F44336' }
            ].map(item => (
              <div key={item.category} style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '12px',
                background: theme.colors.background,
                borderRadius: '8px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span style={{ fontSize: '1.5rem' }}>{item.emoji}</span>
                  <span style={{ fontWeight: '500', color: theme.colors.text }}>
                    {item.category}
                  </span>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontWeight: '600', color: theme.colors.text }}>
                    {item.weight} kg
                  </div>
                  <div style={{ fontSize: '12px', color: theme.colors.textSecondary }}>
                    {Math.round((item.weight / analytics.foodSavedKg) * 100)}%
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div style={{
          background: theme.colors.surface,
          borderRadius: '16px',
          padding: '24px',
          boxShadow: theme.shadows.card
        }}>
          <h3 style={{
            margin: '0 0 20px 0',
            fontSize: '20px',
            fontWeight: '600',
            color: theme.colors.text
          }}>
            🚀 Quick Actions
          </h3>
          
          <div style={{ display: 'grid', gap: '12px' }}>
            {[
              { label: 'Export Report', emoji: '📄', color: theme.colors.primary },
              { label: 'Send Notifications', emoji: '📢', color: theme.colors.secondary },
              { label: 'Manage Users', emoji: '👥', color: theme.colors.accent },
              { label: 'View Transactions', emoji: '💳', color: '#9C27B0' },
              { label: 'System Settings', emoji: '⚙️', color: '#607D8B' }
            ].map(action => (
              <button
                key={action.label}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '12px 16px',
                  background: `${action.color}15`,
                  color: action.color,
                  border: `2px solid ${action.color}30`,
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontWeight: '500',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  width: '100%',
                  textAlign: 'left'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.background = `${action.color}25`;
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.background = `${action.color}15`;
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <span style={{ fontSize: '1.2rem' }}>{action.emoji}</span>
                {action.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Summary Message */}
      <div style={{
        marginTop: '32px',
        background: `linear-gradient(135deg, ${theme.colors.background} 0%, #E8F5E8 100%)`,
        padding: '24px',
        borderRadius: '16px',
        textAlign: 'center',
        border: `2px solid ${theme.colors.border}`
      }}>
        <div style={{ fontSize: '2rem', marginBottom: '12px' }}>🌟</div>
        <h3 style={{
          margin: '0 0 8px 0',
          color: theme.colors.text,
          fontSize: '20px',
          fontWeight: '600'
        }}>
          Amazing Impact This {selectedPeriod.charAt(0).toUpperCase() + selectedPeriod.slice(1)}!
        </h3>
        <p style={{
          margin: 0,
          color: theme.colors.textSecondary,
          fontSize: '16px',
          lineHeight: '1.5'
        }}>
          Together we've saved <strong>{analytics.foodSavedKg} kg</strong> of food worth <strong>£{analytics.foodSavedValue}</strong>, 
          helping customers save <strong>£{analytics.customerSavings}</strong> while preventing <strong>{analytics.co2Saved} kg</strong> of CO₂ emissions. 
          Keep up the great work! 🎉
        </p>
      </div>
    </div>
  );
};

export default AdminDashboard;