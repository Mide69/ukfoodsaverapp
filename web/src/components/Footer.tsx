import React from 'react';
import { theme } from '../styles/theme';

const Footer: React.FC = () => {
  return (
    <footer style={{
      background: `linear-gradient(135deg, ${theme.colors.text} 0%, #0D4F1C 100%)`,
      color: 'white',
      padding: '40px 24px 20px 24px',
      marginTop: '60px',
      fontFamily: theme.fonts.primary
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        {/* Main Footer Content */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '40px',
          marginBottom: '40px'
        }}>
          {/* FoodSaver Info */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <div style={{ fontSize: '2rem' }}>🌱</div>
              <h3 style={{ margin: 0, fontSize: '24px', fontWeight: '700' }}>FoodSaver</h3>
            </div>
            <p style={{ 
              margin: '0 0 16px 0', 
              fontSize: '14px', 
              lineHeight: '1.6',
              opacity: 0.9 
            }}>
              Connecting communities to reduce food waste, save money, and protect our planet. 
              Together we're building a sustainable future.
            </p>
            <div style={{ fontSize: '14px', opacity: 0.8 }}>
              🌍 Serving the entire United Kingdom
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ margin: '0 0 16px 0', fontSize: '16px', fontWeight: '600' }}>
              Quick Links
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {['Browse Food', 'Store Directory', 'How It Works', 'For Businesses', 'Support'].map(link => (
                <button key={link} style={{
                  background: 'none',
                  border: 'none',
                  color: 'white',
                  textDecoration: 'none',
                  fontSize: '14px',
                  opacity: 0.8,
                  transition: 'opacity 0.3s ease',
                  cursor: 'pointer',
                  padding: 0,
                  textAlign: 'left'
                }}
                onMouseOver={(e) => e.currentTarget.style.opacity = '1'}
                onMouseOut={(e) => e.currentTarget.style.opacity = '0.8'}>
                  {link}
                </button>
              ))}
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h4 style={{ margin: '0 0 16px 0', fontSize: '16px', fontWeight: '600' }}>
              Get In Touch
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '14px', opacity: 0.9 }}>
              <div>📧 hello@foodsaver.co.uk</div>
              <div>📞 0800-FOOD-SAVE</div>
              <div>📍 London, United Kingdom</div>
              <div style={{ marginTop: '12px' }}>
                <span style={{ marginRight: '12px' }}>🐦</span>
                <span style={{ marginRight: '12px' }}>📘</span>
                <span style={{ marginRight: '12px' }}>📷</span>
                <span>💼</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div style={{
          borderTop: '1px solid rgba(255,255,255,0.2)',
          paddingTop: '20px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px'
        }}>
          <div style={{ fontSize: '14px', opacity: 0.8 }}>
            © 2024 FoodSaver. All rights reserved.
          </div>
          
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '14px',
            opacity: 0.9
          }}>
            <span>Powered by</span>
            <div style={{
              background: 'rgba(255,255,255,0.1)',
              padding: '4px 12px',
              borderRadius: '12px',
              fontWeight: '600',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}>
              <img 
                src="https://res.cloudinary.com/faksam-soft/image/upload/v1754137372/tektribe/TEK_TRIBE_LOGO_4_PNG_xxdtjz.png" 
                alt="TekTribe" 
                style={{ height: '20px', width: 'auto' }}
              />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;