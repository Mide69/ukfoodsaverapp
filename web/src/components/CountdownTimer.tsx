import React, { useState, useEffect } from 'react';
import { theme } from '../styles/theme';

interface CountdownTimerProps {
  expiresAt: string;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ expiresAt }) => {
  const [timeLeft, setTimeLeft] = useState('');
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const expiry = new Date(expiresAt).getTime();
      const difference = expiry - now;

      if (difference > 0) {
        const hours = Math.floor(difference / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        
        setTimeLeft(`${hours}h ${minutes}m ${seconds}s`);
        setIsExpired(false);
      } else {
        setTimeLeft('Expired');
        setIsExpired(true);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [expiresAt]);

  return (
    <div style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: '4px',
      padding: '4px 8px',
      borderRadius: '12px',
      fontSize: '12px',
      fontWeight: '600',
      background: isExpired ? theme.colors.error : theme.colors.warning,
      color: 'white'
    }}>
      <span>{isExpired ? '⏰' : '⏳'}</span>
      <span>{timeLeft}</span>
    </div>
  );
};

export default CountdownTimer;