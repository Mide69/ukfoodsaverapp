import React, { useState, useEffect } from 'react';
import { theme } from '../styles/theme';

interface StatItem {
  icon: string;
  label: string;
  value: number;
  suffix?: string;
}

const StatsCounter: React.FC = () => {
  const [animatedValues, setAnimatedValues] = useState({ users: 0, locations: 0, stores: 0 });

  const stats: StatItem[] = [
    { icon: '👥', label: 'Active Users', value: 12847, suffix: '+' },
    { icon: '📍', label: 'UK Locations', value: 156 },
    { icon: '🏪', label: 'Partner Stores', value: 342, suffix: '+' }
  ];

  useEffect(() => {
    const duration = 2000; // 2 seconds
    const steps = 60;
    const interval = duration / steps;

    let step = 0;
    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      const easeOut = 1 - Math.pow(1 - progress, 3); // Cubic ease-out

      setAnimatedValues({
        users: Math.floor(stats[0].value * easeOut),
        locations: Math.floor(stats[1].value * easeOut),
        stores: Math.floor(stats[2].value * easeOut)
      });

      if (step >= steps) {
        clearInterval(timer);
        setAnimatedValues({
          users: stats[0].value,
          locations: stats[1].value,
          stores: stats[2].value
        });
      }
    }, interval);

    return () => clearInterval(timer);
  }, []);

  const getAnimatedValue = (index: number) => {
    switch (index) {
      case 0: return animatedValues.users;
      case 1: return animatedValues.locations;
      case 2: return animatedValues.stores;
      default: return 0;
    }
  };

  const CircularProgress = ({ percentage, size = 60 }: { percentage: number; size?: number }) => {
    const radius = (size - 8) / 2;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;

    return (
      <div style={{ position: 'relative', width: size, height: size }}>
        <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="rgba(255,255,255,0.2)"
            strokeWidth="4"
            fill="none"
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="white"
            strokeWidth="4"
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            style={{
              transition: 'stroke-dashoffset 0.1s ease-out'
            }}
          />
        </svg>
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          fontSize: '10px',
          fontWeight: '600',
          color: 'white'
        }}>
          {Math.round(percentage)}%
        </div>
      </div>
    );
  };

  return (
    <div style={{
      background: `linear-gradient(135deg, ${theme.colors.primary} 0%, ${theme.colors.accent} 100%)`,
      color: 'white',
      padding: '16px',
      borderRadius: '16px',
      marginBottom: '24px',
      boxShadow: '0 8px 24px rgba(46, 125, 50, 0.2)'
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '16px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ fontSize: '24px' }}>🇬🇧</span>
          <div>
            <h3 style={{
              margin: 0,
              fontSize: '16px',
              fontWeight: '700'
            }}>
              FoodSaver UK Impact
            </h3>
            <p style={{
              margin: 0,
              fontSize: '12px',
              opacity: 0.9
            }}>
              Live community stats
            </p>
          </div>
        </div>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '20px',
          flexWrap: 'wrap'
        }}>
          {stats.map((stat, index) => {
            const percentage = (getAnimatedValue(index) / stat.value) * 100;
            return (
              <div key={index} style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px'
              }}>
                <CircularProgress percentage={percentage} size={50} />
                <div>
                  <div style={{
                    fontSize: '18px',
                    fontWeight: '700',
                    fontFamily: 'monospace'
                  }}>
                    {getAnimatedValue(index).toLocaleString()}{stat.suffix || ''}
                  </div>
                  <div style={{
                    fontSize: '11px',
                    opacity: 0.9,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}>
                    <span>{stat.icon}</span>
                    <span>{stat.label}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default StatsCounter;