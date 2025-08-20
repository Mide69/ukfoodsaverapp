import React from 'react';

const Watermark: React.FC = () => (
  <div style={{
    position: 'fixed',
    bottom: '20px',
    right: '20px',
    zIndex: 1000,
    opacity: 0.7,
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    background: 'rgba(255,255,255,0.9)',
    padding: '8px 12px',
    borderRadius: '20px',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255,255,255,0.2)',
    fontSize: '12px',
    color: '#666'
  }}>
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z" fill="#4CAF50"/>
      <circle cx="12" cy="12" r="3" fill="#FF9800" opacity="0.8"/>
    </svg>
    <span>FoodSaver © 2024</span>
  </div>
);

export default Watermark;