import React, { useState } from 'react';
import { theme } from '../styles/theme';

const CreateListing: React.FC = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    quantity: 1,
    weight: 0,
    originalPrice: '',
    discountedPrice: '',
    category: 'vegetables',
    pickupStart: '',
    pickupEnd: '',
    expiresIn: 24,
    address: '',
    imageFile: null as File | null
  });
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const categories = [
    { value: 'vegetables', label: '🥕 Vegetables', emoji: '🥕' },
    { value: 'fruits', label: '🍎 Fruits', emoji: '🍎' },
    { value: 'bakery', label: '🍞 Bakery', emoji: '🍞' },
    { value: 'dairy', label: '🥛 Dairy', emoji: '🥛' },
    { value: 'meat', label: '🥩 Meat & Fish', emoji: '🥩' },
    { value: 'prepared', label: '🍱 Prepared Meals', emoji: '🍱' },
    { value: 'frozen', label: '🥶 Frozen', emoji: '🥶' },
    { value: 'pantry', label: '🥫 Pantry Items', emoji: '🥫' }
  ];

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData({ ...formData, imageFile: file });
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setSuccessMessage(`✅ ${formData.title} listed successfully! Your food is now available for purchase.`);
      setShowSuccess(true);
      
      setFormData({
        title: '',
        description: '',
        quantity: 1,
        weight: 0,
        originalPrice: '',
        discountedPrice: '',
        category: 'vegetables',
        pickupStart: '',
        pickupEnd: '',
        expiresIn: 24,
        address: '',
        imageFile: null
      });
      setImagePreview(null);
      
      setTimeout(() => setShowSuccess(false), 5000);
    } catch (error) {
      setSuccessMessage('❌ Failed to create listing. Please try again.');
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 5000);
    } finally {
      setLoading(false);
    }
  };

  const selectedCategory = categories.find(cat => cat.value === formData.category);

  return (
    <div style={{
      maxWidth: '800px',
      margin: '0 auto',
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
          🏪 List Your Food
        </h2>
        <p style={{
          color: theme.colors.textSecondary,
          fontSize: '16px'
        }}>
          Help reduce food waste by listing your surplus food
        </p>
      </div>

      <form onSubmit={handleSubmit} style={{
        background: theme.colors.surface,
        borderRadius: '20px',
        padding: '32px',
        boxShadow: theme.shadows.card
      }}>
        {/* Image Upload */}
        <div style={{ marginBottom: '24px' }}>
          <label style={{
            display: 'block',
            fontSize: '16px',
            fontWeight: '600',
            color: theme.colors.text,
            marginBottom: '12px'
          }}>
            📸 Food Image
          </label>
          
          <div style={{
            border: `2px dashed ${theme.colors.border}`,
            borderRadius: '12px',
            padding: '24px',
            textAlign: 'center',
            background: theme.colors.background,
            cursor: 'pointer',
            transition: 'border-color 0.3s ease'
          }}
          onClick={() => document.getElementById('imageInput')?.click()}>
            {imagePreview ? (
              <div>
                <img src={imagePreview} alt="Preview" style={{
                  maxWidth: '200px',
                  maxHeight: '200px',
                  borderRadius: '8px',
                  marginBottom: '12px'
                }} />
                <p style={{ fontSize: '14px', color: theme.colors.textSecondary }}>
                  Click to change image
                </p>
              </div>
            ) : (
              <div>
                <div style={{ fontSize: '3rem', marginBottom: '12px' }}>
                  {selectedCategory?.emoji || '📷'}
                </div>
                <p style={{ fontSize: '16px', color: theme.colors.text, marginBottom: '4px' }}>
                  Click to upload food image
                </p>
                <p style={{ fontSize: '12px', color: theme.colors.textSecondary }}>
                  JPG, PNG up to 5MB
                </p>
              </div>
            )}
          </div>
          
          <input
            id="imageInput"
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            style={{ display: 'none' }}
          />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          {/* Title */}
          <div style={{ gridColumn: '1 / -1' }}>
            <label style={{
              display: 'block',
              fontSize: '16px',
              fontWeight: '600',
              color: theme.colors.text,
              marginBottom: '8px'
            }}>
              🏷️ Food Title *
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="e.g., Fresh Organic Vegetables Bundle"
              required
              style={{
                width: '100%',
                padding: '14px 16px',
                borderRadius: '12px',
                border: `2px solid ${theme.colors.border}`,
                fontSize: '16px',
                outline: 'none',
                boxSizing: 'border-box'
              }}
            />
          </div>

          {/* Category */}
          <div>
            <label style={{
              display: 'block',
              fontSize: '16px',
              fontWeight: '600',
              color: theme.colors.text,
              marginBottom: '8px'
            }}>
              🏷️ Category *
            </label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              style={{
                width: '100%',
                padding: '14px 16px',
                borderRadius: '12px',
                border: `2px solid ${theme.colors.border}`,
                fontSize: '16px',
                outline: 'none',
                background: 'white',
                boxSizing: 'border-box'
              }}
            >
              {categories.map(cat => (
                <option key={cat.value} value={cat.value}>{cat.label}</option>
              ))}
            </select>
          </div>

          {/* Quantity */}
          <div>
            <label style={{
              display: 'block',
              fontSize: '16px',
              fontWeight: '600',
              color: theme.colors.text,
              marginBottom: '8px'
            }}>
              📦 Quantity *
            </label>
            <input
              type="number"
              value={formData.quantity}
              onChange={(e) => setFormData({ ...formData, quantity: parseInt(e.target.value) })}
              min="1"
              required
              style={{
                width: '100%',
                padding: '14px 16px',
                borderRadius: '12px',
                border: `2px solid ${theme.colors.border}`,
                fontSize: '16px',
                outline: 'none',
                boxSizing: 'border-box'
              }}
            />
          </div>

          {/* Weight */}
          <div>
            <label style={{
              display: 'block',
              fontSize: '16px',
              fontWeight: '600',
              color: theme.colors.text,
              marginBottom: '8px'
            }}>
              ⚖️ Weight (kg) *
            </label>
            <input
              type="number"
              step="0.1"
              value={formData.weight}
              onChange={(e) => setFormData({ ...formData, weight: parseFloat(e.target.value) })}
              min="0.1"
              required
              style={{
                width: '100%',
                padding: '14px 16px',
                borderRadius: '12px',
                border: `2px solid ${theme.colors.border}`,
                fontSize: '16px',
                outline: 'none',
                boxSizing: 'border-box'
              }}
            />
          </div>

          {/* Original Price */}
          <div>
            <label style={{
              display: 'block',
              fontSize: '16px',
              fontWeight: '600',
              color: theme.colors.text,
              marginBottom: '8px'
            }}>
              💰 Original Price (£) *
            </label>
            <input
              type="number"
              step="0.01"
              value={formData.originalPrice}
              onChange={(e) => setFormData({ ...formData, originalPrice: e.target.value })}
              min="0.01"
              required
              style={{
                width: '100%',
                padding: '14px 16px',
                borderRadius: '12px',
                border: `2px solid ${theme.colors.border}`,
                fontSize: '16px',
                outline: 'none',
                boxSizing: 'border-box'
              }}
            />
          </div>

          {/* Discounted Price */}
          <div>
            <label style={{
              display: 'block',
              fontSize: '16px',
              fontWeight: '600',
              color: theme.colors.text,
              marginBottom: '8px'
            }}>
              🏷️ Sale Price (£) *
            </label>
            <input
              type="number"
              step="0.01"
              value={formData.discountedPrice}
              onChange={(e) => setFormData({ ...formData, discountedPrice: e.target.value })}
              min="0.01"
              required
              style={{
                width: '100%',
                padding: '14px 16px',
                borderRadius: '12px',
                border: `2px solid ${theme.colors.border}`,
                fontSize: '16px',
                outline: 'none',
                boxSizing: 'border-box'
              }}
            />
          </div>

          {/* Expires In */}
          <div>
            <label style={{
              display: 'block',
              fontSize: '16px',
              fontWeight: '600',
              color: theme.colors.text,
              marginBottom: '8px'
            }}>
              ⏰ Offer Expires In (hours) *
            </label>
            <select
              value={formData.expiresIn}
              onChange={(e) => setFormData({ ...formData, expiresIn: parseInt(e.target.value) })}
              style={{
                width: '100%',
                padding: '14px 16px',
                borderRadius: '12px',
                border: `2px solid ${theme.colors.border}`,
                fontSize: '16px',
                outline: 'none',
                background: 'white',
                boxSizing: 'border-box'
              }}
            >
              <option value={1}>1 hour</option>
              <option value={2}>2 hours</option>
              <option value={4}>4 hours</option>
              <option value={6}>6 hours</option>
              <option value={12}>12 hours</option>
              <option value={24}>24 hours</option>
              <option value={48}>48 hours</option>
            </select>
          </div>
        </div>

        {/* Description */}
        <div style={{ margin: '24px 0' }}>
          <label style={{
            display: 'block',
            fontSize: '16px',
            fontWeight: '600',
            color: theme.colors.text,
            marginBottom: '8px'
          }}>
            📝 Description
          </label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="Describe the food condition, best use, any special notes..."
            rows={4}
            style={{
              width: '100%',
              padding: '14px 16px',
              borderRadius: '12px',
              border: `2px solid ${theme.colors.border}`,
              fontSize: '16px',
              outline: 'none',
              resize: 'vertical',
              boxSizing: 'border-box',
              fontFamily: theme.fonts.primary
            }}
          />
        </div>

        {/* Address */}
        <div style={{ marginBottom: '32px' }}>
          <label style={{
            display: 'block',
            fontSize: '16px',
            fontWeight: '600',
            color: theme.colors.text,
            marginBottom: '8px'
          }}>
            📍 Pickup Address
          </label>
          <input
            type="text"
            value={formData.address}
            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            placeholder="Enter pickup location"
            style={{
              width: '100%',
              padding: '14px 16px',
              borderRadius: '12px',
              border: `2px solid ${theme.colors.border}`,
              fontSize: '16px',
              outline: 'none',
              boxSizing: 'border-box'
            }}
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          style={{
            width: '100%',
            padding: '16px',
            background: `linear-gradient(135deg, ${theme.colors.primary} 0%, ${theme.colors.accent} 100%)`,
            color: 'white',
            border: 'none',
            borderRadius: '12px',
            fontSize: '18px',
            fontWeight: '600',
            cursor: 'pointer',
            boxShadow: theme.shadows.button,
            opacity: loading ? 0.7 : 1
          }}
        >
          {loading ? '🔄 Creating Listing...' : '🚀 Create Food Listing'}
        </button>
      </form>
      
      {showSuccess && (
        <div style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          background: successMessage.includes('✅') ? theme.colors.success : theme.colors.error,
          color: 'white',
          padding: '16px 20px',
          borderRadius: '12px',
          boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
          zIndex: 1000,
          maxWidth: '400px',
          fontSize: '14px',
          fontWeight: '500'
        }}>
          {successMessage}
        </div>
      )}
    </div>
  );
};

export default CreateListing;