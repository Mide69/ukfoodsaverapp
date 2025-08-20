import React from 'react';

const Background: React.FC = () => (
  <div style={{
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: -1,
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    overflow: 'hidden'
  }}>
    {/* Animated food icons */}
    <div style={{
      position: 'absolute',
      width: '100%',
      height: '100%',
      opacity: 0.1,
      animation: 'float 20s infinite linear'
    }}>
      {[...Array(8)].map((_, i) => (
        <div key={i} style={{
          position: 'absolute',
          fontSize: '2rem',
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          animationDelay: `${i * 2.5}s`
        }}>
          {['🍎', '🥖', '🥗', '🍕', '🥪', '🍰', '🥐', '🍊'][i]}
        </div>
      ))}
    </div>
    
    {/* Geometric shapes */}
    <svg style={{ position: 'absolute', width: '100%', height: '100%', opacity: 0.05 }}>
      <circle cx="10%" cy="20%" r="50" fill="white" />
      <circle cx="90%" cy="80%" r="80" fill="white" />
      <circle cx="80%" cy="20%" r="30" fill="white" />
      <circle cx="20%" cy="80%" r="60" fill="white" />
    </svg>
    
    <style>{`
      @keyframes float {
        0% { transform: translateY(100vh) rotate(0deg); }
        100% { transform: translateY(-100px) rotate(360deg); }
      }
    `}</style>
  </div>
);

export default Background;