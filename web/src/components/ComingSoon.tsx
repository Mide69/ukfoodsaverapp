import React, { useState, useEffect } from 'react';
import { theme } from '../styles/theme';

const ComingSoon: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    // Set launch date to 30 days from now
    const launchDate = new Date();
    launchDate.setDate(launchDate.getDate() + 30);

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = launchDate.getTime() - now;

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000)
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      background: 'linear-gradient(135deg, #2E7D32 0%, #4CAF50 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      fontFamily: theme.fonts.primary,
      overflow: 'auto'
    }}>
      {/* Animated Background */}
      <div style={{
        position: 'absolute',
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        opacity: 0.1
      }}>
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              fontSize: '4rem',
              color: 'white',
              animation: `float ${8 + i * 2}s infinite linear`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${i * 2}s`
            }}
          >
            {['🌱', '🍎', '🥖', '🥗', '🍕', '🥪'][i]}
          </div>
        ))}
      </div>

      <div style={{
        textAlign: 'center',
        color: 'white',
        width: '90%',
        maxWidth: '600px',
        padding: window.innerWidth < 768 ? '20px' : '40px',
        position: 'relative',
        zIndex: 1,
        margin: '20px auto'
      }}>
        {/* UK Flag */}
        <div style={{
          fontSize: '3rem',
          marginBottom: '20px',
          animation: 'pulse 2s infinite'
        }}>
          🇬🇧
        </div>

        {/* Logo */}
        <div style={{
          fontSize: '4rem',
          marginBottom: '20px',
          animation: 'bounce 2s infinite'
        }}>
          🌱
        </div>

        {/* Title */}
        <h1 style={{
          fontSize: window.innerWidth < 768 ? '2.5rem' : '3.5rem',
          fontWeight: '800',
          margin: '0 0 16px 0',
          letterSpacing: '-1px',
          textShadow: '0 4px 8px rgba(0,0,0,0.3)',
          animation: 'fadeInUp 1s ease-out'
        }}>
          FoodSaver
        </h1>

        {/* Subtitle */}
        <h2 style={{
          fontSize: window.innerWidth < 768 ? '1.2rem' : '1.5rem',
          fontWeight: '400',
          margin: '0 0 30px 0',
          opacity: 0.9,
          animation: 'fadeInUp 1s ease-out 0.2s both'
        }}>
          Coming Soon to the UK
        </h2>

        {/* Description */}
        <p style={{
          fontSize: window.innerWidth < 768 ? '1rem' : '1.2rem',
          lineHeight: '1.6',
          margin: '0 0 30px 0',
          opacity: 0.9,
          animation: 'fadeInUp 1s ease-out 0.4s both'
        }}>
          Join thousands saving food, money, and the planet. 
          Connect with local businesses to rescue surplus food at amazing prices.
        </p>

        {/* Countdown Timer */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: window.innerWidth < 480 ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)',
          gap: window.innerWidth < 768 ? '10px' : '20px',
          marginBottom: '30px',
          animation: 'fadeInUp 1s ease-out 0.6s both'
        }}>
          {[
            { label: 'Days', value: timeLeft.days },
            { label: 'Hours', value: timeLeft.hours },
            { label: 'Minutes', value: timeLeft.minutes },
            { label: 'Seconds', value: timeLeft.seconds }
          ].map((item, index) => (
            <div key={item.label} style={{
              background: 'rgba(255,255,255,0.2)',
              padding: window.innerWidth < 768 ? '15px 10px' : '20px',
              borderRadius: '16px',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255,255,255,0.3)'
            }}>
              <div style={{
                fontSize: window.innerWidth < 768 ? '1.8rem' : '2.5rem',
                fontWeight: '700',
                fontFamily: 'monospace',
                marginBottom: '8px'
              }}>
                {item.value.toString().padStart(2, '0')}
              </div>
              <div style={{
                fontSize: '0.9rem',
                textTransform: 'uppercase',
                letterSpacing: '1px',
                opacity: 0.8
              }}>
                {item.label}
              </div>
            </div>
          ))}
        </div>

        {/* Features */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: window.innerWidth < 768 ? '1fr' : 'repeat(3, 1fr)',
          gap: '20px',
          marginBottom: '40px',
          animation: 'fadeInUp 1s ease-out 0.8s both'
        }}>
          {[
            { icon: '💰', text: 'Save up to 70%' },
            { icon: '🌍', text: 'Help the Planet' },
            { icon: '🏪', text: '342+ Stores' }
          ].map((feature, index) => (
            <div key={index} style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              background: 'rgba(255,255,255,0.1)',
              padding: '16px',
              borderRadius: '12px',
              backdropFilter: 'blur(5px)'
            }}>
              <span style={{ fontSize: '1.5rem' }}>{feature.icon}</span>
              <span style={{ fontWeight: '500' }}>{feature.text}</span>
            </div>
          ))}
        </div>

        {/* CTA Buttons */}
        <div style={{
          display: 'flex',
          gap: window.innerWidth < 768 ? '12px' : '16px',
          justifyContent: 'center',
          flexWrap: 'wrap',
          animation: 'fadeInUp 1s ease-out 1s both',
          flexDirection: window.innerWidth < 480 ? 'column' : 'row'
        }}>
          <button
            onClick={() => {
              // Hide coming soon and show main app
              const event = new CustomEvent('hideComingSoon');
              window.dispatchEvent(event);
            }}
            style={{
              background: 'linear-gradient(135deg, #FF6B35 0%, #F7931E 100%)',
              color: 'white',
              border: 'none',
              padding: window.innerWidth < 768 ? '16px 28px' : '18px 36px',
              borderRadius: '50px',
              fontSize: window.innerWidth < 768 ? '1rem' : '1.2rem',
              fontWeight: '700',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: '0 8px 25px rgba(255, 107, 53, 0.4)',
              letterSpacing: '0.5px',
              width: window.innerWidth < 480 ? '100%' : 'auto'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-3px)';
              e.currentTarget.style.boxShadow = '0 12px 35px rgba(255, 107, 53, 0.6)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 8px 25px rgba(255, 107, 53, 0.4)';
            }}
          >
            🚀 Check It Out
          </button>
          
          <button
            onClick={() => {
              // Hide coming soon and show main app
              const event = new CustomEvent('hideComingSoon');
              window.dispatchEvent(event);
            }}
            style={{
              background: 'rgba(255,255,255,0.2)',
              color: 'white',
              border: '2px solid rgba(255,255,255,0.5)',
              padding: '16px 32px',
              borderRadius: '50px',
              fontSize: '1.1rem',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              backdropFilter: 'blur(10px)'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.3)';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.2)';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            Preview Mode
          </button>
        </div>

        {/* TekTribe Branding */}
        <div style={{
          marginTop: '40px',
          opacity: 0.8,
          animation: 'fadeInUp 1s ease-out 1.2s both'
        }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: 'rgba(255,255,255,0.1)',
            padding: '8px 16px',
            borderRadius: '20px',
            backdropFilter: 'blur(5px)'
          }}>
            <span>⚡ Powered by</span>
            <strong>TekTribe</strong>
            <span>⚡</span>
          </div>
        </div>
      </div>

      {/* CSS Animations */}
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% {
            transform: translateY(0);
          }
          40% {
            transform: translateY(-10px);
          }
          60% {
            transform: translateY(-5px);
          }
        }

        @keyframes pulse {
          0% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.1);
          }
          100% {
            transform: scale(1);
          }
        }

        @keyframes float {
          0% {
            transform: translateY(100vh) rotate(0deg);
          }
          100% {
            transform: translateY(-100px) rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
};

export default ComingSoon;