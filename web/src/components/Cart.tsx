import React from 'react';
import { theme } from '../styles/theme';

interface CartProps {
  cartItems: any[];
  onUpdateQuantity: (id: number, quantity: number) => void;
  onRemoveItem: (id: number) => void;
  onCheckout: () => void;
}

const Cart: React.FC<CartProps> = ({ cartItems, onUpdateQuantity, onRemoveItem, onCheckout }) => {
  const total = cartItems.reduce((sum, item) => sum + (item.discountedPrice * item.cartQuantity), 0);
  const originalTotal = cartItems.reduce((sum, item) => sum + (item.originalPrice * item.cartQuantity), 0);
  const savings = originalTotal - total;

  if (cartItems.length === 0) {
    return (
      <div style={{
        padding: '40px',
        textAlign: 'center',
        fontFamily: theme.fonts.primary
      }}>
        <div style={{ fontSize: '4rem', marginBottom: '20px' }}>🛒</div>
        <h2 style={{ color: theme.colors.text, marginBottom: '10px' }}>Your cart is empty</h2>
        <p style={{ color: theme.colors.textSecondary }}>Start adding some delicious food to save!</p>
      </div>
    );
  }

  return (
    <div style={{
      padding: '24px',
      fontFamily: theme.fonts.primary
    }}>
      <h2 style={{
        color: theme.colors.text,
        marginBottom: '24px',
        fontSize: '24px',
        fontWeight: '600'
      }}>
        🛒 Your Cart ({cartItems.length} items)
      </h2>

      <div style={{ display: 'flex', gap: '24px' }}>
        {/* Cart Items */}
        <div style={{ flex: 1 }}>
          {cartItems.map(item => (
            <div key={item.id} style={{
              background: theme.colors.surface,
              borderRadius: '12px',
              padding: '20px',
              marginBottom: '16px',
              boxShadow: theme.shadows.card,
              display: 'flex',
              gap: '16px'
            }}>
              {/* Item Image */}
              <div style={{
                width: '80px',
                height: '80px',
                background: theme.colors.background,
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '2rem'
              }}>
                {item.image}
              </div>

              {/* Item Details */}
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                  <div>
                    <h4 style={{
                      margin: '0 0 4px 0',
                      fontSize: '16px',
                      fontWeight: '600',
                      color: theme.colors.text
                    }}>
                      {item.title}
                    </h4>
                    <p style={{
                      margin: '0 0 8px 0',
                      fontSize: '12px',
                      color: theme.colors.textSecondary
                    }}>
                      {item.store.name} • {item.location}
                    </p>
                  </div>
                  <button
                    onClick={() => onRemoveItem(item.id)}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: theme.colors.error,
                      cursor: 'pointer',
                      fontSize: '16px'
                    }}
                  >
                    🗑️
                  </button>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  {/* Quantity Controls */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <button
                      onClick={() => onUpdateQuantity(item.id, Math.max(1, item.cartQuantity - 1))}
                      style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        border: `2px solid ${theme.colors.border}`,
                        background: 'white',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      −
                    </button>
                    <span style={{
                      minWidth: '40px',
                      textAlign: 'center',
                      fontSize: '16px',
                      fontWeight: '600'
                    }}>
                      {item.cartQuantity}
                    </span>
                    <button
                      onClick={() => onUpdateQuantity(item.id, Math.min(item.quantity, item.cartQuantity + 1))}
                      style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        border: `2px solid ${theme.colors.border}`,
                        background: 'white',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      +
                    </button>
                  </div>

                  {/* Price */}
                  <div style={{ textAlign: 'right' }}>
                    <div style={{
                      fontSize: '18px',
                      fontWeight: '700',
                      color: theme.colors.primary
                    }}>
                      £{(item.discountedPrice * item.cartQuantity).toFixed(2)}
                    </div>
                    <div style={{
                      fontSize: '12px',
                      textDecoration: 'line-through',
                      color: theme.colors.textSecondary
                    }}>
                      £{(item.originalPrice * item.cartQuantity).toFixed(2)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div style={{
          width: '320px',
          background: theme.colors.surface,
          borderRadius: '16px',
          padding: '24px',
          boxShadow: theme.shadows.card,
          height: 'fit-content'
        }}>
          <h3 style={{
            margin: '0 0 20px 0',
            fontSize: '20px',
            fontWeight: '600',
            color: theme.colors.text
          }}>
            Order Summary
          </h3>

          <div style={{ marginBottom: '16px' }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: '8px',
              fontSize: '14px'
            }}>
              <span>Subtotal:</span>
              <span>£{total.toFixed(2)}</span>
            </div>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: '8px',
              fontSize: '14px',
              color: theme.colors.success
            }}>
              <span>You save:</span>
              <span>£{savings.toFixed(2)}</span>
            </div>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: '16px',
              fontSize: '14px'
            }}>
              <span>Service fee:</span>
              <span>£0.99</span>
            </div>
            <hr style={{ border: `1px solid ${theme.colors.border}`, margin: '16px 0' }} />
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              fontSize: '18px',
              fontWeight: '700',
              color: theme.colors.text
            }}>
              <span>Total:</span>
              <span>£{(total + 0.99).toFixed(2)}</span>
            </div>
          </div>

          <button
            onClick={onCheckout}
            style={{
              width: '100%',
              background: `linear-gradient(135deg, ${theme.colors.primary} 0%, ${theme.colors.accent} 100%)`,
              color: 'white',
              border: 'none',
              padding: '16px',
              borderRadius: '12px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: 'pointer',
              boxShadow: theme.shadows.button
            }}
          >
            💳 Proceed to Checkout
          </button>

          <div style={{
            marginTop: '16px',
            padding: '12px',
            background: theme.colors.background,
            borderRadius: '8px',
            fontSize: '12px',
            color: theme.colors.text,
            textAlign: 'center'
          }}>
            🌱 You're helping reduce food waste and saving the planet!
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;