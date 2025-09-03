import React from 'react';

const Background: React.FC = () => (
  <>
    {/* Food Market Background Image */}
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundImage: 'url(https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=1920&h=1080&fit=crop&crop=center)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      zIndex: -2
    }} />
    
    {/* Opacity Overlay */}
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      background: 'rgba(46, 125, 50, 0.85)',
      zIndex: -1
    }} />
  </>
);

export default Background;