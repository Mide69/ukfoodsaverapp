import React, { memo, useCallback } from 'react';
import { theme } from '../styles/theme';
import CountdownTimer from './CountdownTimer';

interface FoodCardProps {
  listing: any;
  onAddToCart: (listing: any) => void;
  isGuest?: boolean;
}

const FoodCard: React.FC<FoodCardProps> = memo(({ listing, onAddToCart, isGuest }) => {
  const discount = Math.round(((listing.originalPrice - listing.discountedPrice) / listing.originalPrice) * 100);
  const savings = (listing.originalPrice - listing.discountedPrice).toFixed(2);
  
  const handleAddToCart = useCallback(() => {
    onAddToCart(listing);
  }, [listing, onAddToCart]);

  return (
    <div style={{
      background: theme.colors.surface,
      borderRadius: '20px',
      overflow: 'hidden',
      boxShadow: '0 8px 32px rgba(46, 125, 50, 0.12)',
      transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
      cursor: 'pointer',
      fontFamily: theme.fonts.primary,
      border: '1px solid rgba(46, 125, 50, 0.08)',
      position: 'relative'
    }}
    onMouseOver={(e) => {
      e.currentTarget.style.transform = 'translateY(-8px) scale(1.02)';
      e.currentTarget.style.boxShadow = '0 20px 60px rgba(46, 125, 50, 0.25)';
      e.currentTarget.style.borderColor = 'rgba(46, 125, 50, 0.2)';
    }}
    onMouseOut={(e) => {
      e.currentTarget.style.transform = 'translateY(0) scale(1)';
      e.currentTarget.style.boxShadow = '0 8px 32px rgba(46, 125, 50, 0.12)';
      e.currentTarget.style.borderColor = 'rgba(46, 125, 50, 0.08)';
    }}>
      {/* Image Section */}
      <div style={{
        height: '160px',
        background: `linear-gradient(135deg, ${theme.colors.background} 0%, #E8F5E8 100%)`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {listing.imageUrl ? (
          <img 
            src={listing.imageUrl} 
            alt={listing.title}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover'
            }}
          />
        ) : (
          <div style={{ fontSize: '4rem' }}>{listing.image}</div>
        )}
        
        {/* Discount Badge */}
        <div style={{
          position: 'absolute',
          top: '8px',
          right: '8px',
          background: theme.colors.secondary,
          color: 'white',
          padding: '4px 8px',
          borderRadius: '12px',
          fontSize: '10px',
          fontWeight: '600'
        }}>
          {discount}% OFF
        </div>

        {/* Store Logo */}
        <div style={{
          position: 'absolute',
          top: '8px',
          left: '8px',
          background: 'white',
          padding: '6px',
          borderRadius: '50%',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
        }}>
          <span style={{ fontSize: '14px' }}>{listing.store.logo}</span>
        </div>

        {/* Countdown Timer */}
        <div style={{
          position: 'absolute',
          bottom: '8px',
          left: '8px'
        }}>
          <CountdownTimer expiresAt={listing.expiresAt} />
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: '16px' }}>
        {/* Store Info */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '8px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '12px', color: theme.colors.textSecondary, fontWeight: '500' }}>
              {listing.store.name}
            </span>
            <span style={{ fontSize: '12px', color: theme.colors.secondary }}>
              ⭐ {listing.store.rating}
            </span>
          </div>
          <div style={{
            background: theme.colors.background,
            padding: '4px 8px',
            borderRadius: '12px',
            fontSize: '11px',
            color: theme.colors.text,
            fontWeight: '600'
          }}>
            ⚖️ {listing.weight}kg
          </div>
        </div>

        {/* Title */}
        <h3 style={{
          margin: '0 0 6px 0',
          fontSize: '16px',
          fontWeight: '600',
          color: theme.colors.text,
          lineHeight: '1.3'
        }}>
          {listing.title}
        </h3>

        {/* Description */}
        <p style={{
          margin: '0 0 10px 0',
          fontSize: '13px',
          color: theme.colors.textSecondary,
          lineHeight: '1.4',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden'
        }}>
          {listing.description}
        </p>

        {/* Location & Quantity */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '12px',
          fontSize: '11px',
          color: theme.colors.textSecondary
        }}>
          <span>📍 {listing.location}</span>
          <span>📦 {listing.quantity} available</span>
        </div>

        {/* Pricing */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '12px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{
              fontSize: '18px',
              fontWeight: '700',
              color: theme.colors.primary
            }}>
              £{listing.discountedPrice}
            </span>
            <span style={{
              fontSize: '13px',
              textDecoration: 'line-through',
              color: theme.colors.textSecondary
            }}>
              £{listing.originalPrice}
            </span>
          </div>
          <div style={{
            fontSize: '11px',
            color: theme.colors.success,
            fontWeight: '600'
          }}>
            Save £{savings}
          </div>
        </div>

        {/* Pickup Time */}
        <div style={{
          background: theme.colors.background,
          padding: '6px 10px',
          borderRadius: '6px',
          marginBottom: '12px',
          fontSize: '11px',
          color: theme.colors.text
        }}>
          🕒 Pickup: {new Date(listing.pickupStart).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})} - {new Date(listing.pickupEnd).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
        </div>

        {/* Category Badge */}
        <div style={{
          display: 'inline-block',
          background: `${theme.colors.primary}20`,
          color: theme.colors.primary,
          padding: '3px 10px',
          borderRadius: '12px',
          fontSize: '11px',
          fontWeight: '600',
          marginBottom: '12px',
          textTransform: 'capitalize'
        }}>
          {listing.category}
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          style={{
            width: '100%',
            background: `linear-gradient(135deg, ${theme.colors.primary} 0%, ${theme.colors.accent} 100%)`,
            color: 'white',
            border: 'none',
            padding: '12px',
            borderRadius: '10px',
            fontSize: '14px',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'transform 0.2s ease',
            boxShadow: theme.shadows.button
          }}
          onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
          onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
        >
          {isGuest ? '🔐 Login to Buy' : '🛒 Add to Cart'}
        </button>
      </div>
    </div>
  );
});

FoodCard.displayName = 'FoodCard';

export default FoodCard;