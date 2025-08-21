import React from 'react';
import { theme } from '../styles/theme';
import CountdownTimer from './CountdownTimer';

interface FoodCardProps {
  listing: any;
  onAddToCart: (listing: any) => void;
}

const FoodCard: React.FC<FoodCardProps> = ({ listing, onAddToCart }) => {
  const discount = Math.round(((listing.originalPrice - listing.discountedPrice) / listing.originalPrice) * 100);

  return (
    <div style={{
      background: theme.colors.surface,
      borderRadius: '16px',
      overflow: 'hidden',
      boxShadow: theme.shadows.card,
      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
      cursor: 'pointer',
      fontFamily: theme.fonts.primary
    }}
    onMouseOver={(e) => {
      e.currentTarget.style.transform = 'translateY(-4px)';
      e.currentTarget.style.boxShadow = '0 8px 24px rgba(46, 125, 50, 0.15)';
    }}
    onMouseOut={(e) => {
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.boxShadow = theme.shadows.card;
    }}>
      {/* Image Section */}
      <div style={{
        height: '220px',
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
          top: '12px',
          right: '12px',
          background: theme.colors.secondary,
          color: 'white',
          padding: '6px 12px',
          borderRadius: '20px',
          fontSize: '12px',
          fontWeight: '600'
        }}>
          {discount}% OFF
        </div>

        {/* Store Logo */}
        <div style={{
          position: 'absolute',
          top: '12px',
          left: '12px',
          background: 'white',
          padding: '8px',
          borderRadius: '50%',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
        }}>
          <span style={{ fontSize: '16px' }}>{listing.store.logo}</span>
        </div>

        {/* Countdown Timer */}
        <div style={{
          position: 'absolute',
          bottom: '12px',
          left: '12px'
        }}>
          <CountdownTimer expiresAt={listing.expiresAt} />
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: '20px' }}>
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
          margin: '0 0 8px 0',
          fontSize: '18px',
          fontWeight: '600',
          color: theme.colors.text,
          lineHeight: '1.3'
        }}>
          {listing.title}
        </h3>

        {/* Description */}
        <p style={{
          margin: '0 0 12px 0',
          fontSize: '14px',
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
          marginBottom: '16px',
          fontSize: '12px',
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
          marginBottom: '16px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{
              fontSize: '20px',
              fontWeight: '700',
              color: theme.colors.primary
            }}>
              £{listing.discountedPrice}
            </span>
            <span style={{
              fontSize: '14px',
              textDecoration: 'line-through',
              color: theme.colors.textSecondary
            }}>
              £{listing.originalPrice}
            </span>
          </div>
          <div style={{
            fontSize: '12px',
            color: theme.colors.success,
            fontWeight: '600'
          }}>
            Save £{(listing.originalPrice - listing.discountedPrice).toFixed(2)}
          </div>
        </div>

        {/* Pickup Time */}
        <div style={{
          background: theme.colors.background,
          padding: '8px 12px',
          borderRadius: '8px',
          marginBottom: '16px',
          fontSize: '12px',
          color: theme.colors.text
        }}>
          🕒 Pickup: {new Date(listing.pickupStart).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})} - {new Date(listing.pickupEnd).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
        </div>

        {/* Category Badge */}
        <div style={{
          display: 'inline-block',
          background: `${theme.colors.primary}20`,
          color: theme.colors.primary,
          padding: '4px 12px',
          borderRadius: '16px',
          fontSize: '12px',
          fontWeight: '600',
          marginBottom: '16px',
          textTransform: 'capitalize'
        }}>
          {listing.category}
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={() => onAddToCart(listing)}
          style={{
            width: '100%',
            background: `linear-gradient(135deg, ${theme.colors.primary} 0%, ${theme.colors.accent} 100%)`,
            color: 'white',
            border: 'none',
            padding: '14px',
            borderRadius: '12px',
            fontSize: '16px',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'transform 0.2s ease',
            boxShadow: theme.shadows.button
          }}
          onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
          onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
        >
          🛒 Add to Cart
        </button>
      </div>
    </div>
  );
};

export default FoodCard;