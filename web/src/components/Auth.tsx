import React, { useState } from 'react';
import { mockAuth } from '../services/mockAuth';
import { theme } from '../styles/theme';
import Background from './Background';
import Watermark from './Watermark';

interface AuthProps {
  onAuthSuccess: () => void;
}

const Auth: React.FC<AuthProps> = ({ onAuthSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [userType, setUserType] = useState<'consumer' | 'business'>('consumer');
  const [loading, setLoading] = useState(false);

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      if (isLogin) {
        await mockAuth.signInWithEmailAndPassword(email, password);
      } else {
        await mockAuth.createUserWithEmailAndPassword(email, password);
      }
      onAuthSuccess();
    } catch (error: any) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleQuickLogin = async (type: 'admin' | 'business' | 'consumer') => {
    setLoading(true);
    try {
      if (type === 'admin') {
        await mockAuth.signInWithEmailAndPassword('admin', 'admin');
      } else if (type === 'business') {
        await mockAuth.signInWithEmailAndPassword('business', 'business');
      } else {
        await mockAuth.signInWithEmailAndPassword('demo@consumer.com', 'password');
      }
      onAuthSuccess();
    } catch (error: any) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Background />
      <Watermark />
      <div style={{ 
        maxWidth: '450px', 
        margin: '50px auto', 
        padding: '40px',
        background: 'rgba(255,255,255,0.95)',
        borderRadius: '24px',
        backdropFilter: 'blur(20px)',
        boxShadow: theme.shadows.card,
        border: '1px solid rgba(255,255,255,0.2)',
        fontFamily: theme.fonts.primary
      }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{ fontSize: '4rem', marginBottom: '16px' }}>🌱</div>
          <h1 style={{ 
            margin: 0, 
            color: theme.colors.primary, 
            fontWeight: '700',
            fontSize: '32px',
            marginBottom: '8px'
          }}>
            FoodSaver
          </h1>
          <h2 style={{ 
            margin: 0, 
            color: theme.colors.text, 
            fontWeight: '600',
            fontSize: '24px',
            marginBottom: '8px'
          }}>
            {isLogin ? 'Welcome Back' : 'Join the Movement'}
          </h2>
          <p style={{ 
            color: theme.colors.textSecondary, 
            margin: 0, 
            fontSize: '16px',
            lineHeight: '1.5'
          }}>
            {isLogin ? 'Save food, save money, save the planet' : 'Reduce waste • Help community • Make impact'}
          </p>
        </div>

        {/* Quick Login Buttons */}
        <div style={{ marginBottom: '24px' }}>
          <p style={{ 
            textAlign: 'center', 
            fontSize: '14px', 
            color: theme.colors.textSecondary,
            marginBottom: '16px',
            fontWeight: '500'
          }}>
            Quick Demo Access:
          </p>
          <div style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>
            <button
              onClick={() => handleQuickLogin('admin')}
              disabled={loading}
              style={{
                flex: 1,
                padding: '12px 8px',
                background: `linear-gradient(135deg, ${theme.colors.primary} 0%, ${theme.colors.accent} 100%)`,
                color: 'white',
                border: 'none',
                borderRadius: '12px',
                fontSize: '12px',
                fontWeight: '600',
                cursor: 'pointer',
                opacity: loading ? 0.7 : 1
              }}
            >
              🛡️ Admin
            </button>
            <button
              onClick={() => handleQuickLogin('business')}
              disabled={loading}
              style={{
                flex: 1,
                padding: '12px 8px',
                background: `linear-gradient(135deg, ${theme.colors.secondary} 0%, #FFB74D 100%)`,
                color: 'white',
                border: 'none',
                borderRadius: '12px',
                fontSize: '12px',
                fontWeight: '600',
                cursor: 'pointer',
                opacity: loading ? 0.7 : 1
              }}
            >
              🏪 Business
            </button>
            <button
              onClick={() => handleQuickLogin('consumer')}
              disabled={loading}
              style={{
                flex: 1,
                padding: '12px 8px',
                background: `linear-gradient(135deg, ${theme.colors.accent} 0%, #81C784 100%)`,
                color: 'white',
                border: 'none',
                borderRadius: '12px',
                fontSize: '12px',
                fontWeight: '600',
                cursor: 'pointer',
                opacity: loading ? 0.7 : 1
              }}
            >
              👤 Consumer
            </button>
          </div>
        </div>

        <div style={{ 
          textAlign: 'center', 
          margin: '20px 0',
          position: 'relative'
        }}>
          <hr style={{ border: `1px solid ${theme.colors.border}` }} />
          <span style={{
            position: 'absolute',
            top: '-12px',
            left: '50%',
            transform: 'translateX(-50%)',
            background: 'white',
            padding: '0 16px',
            fontSize: '14px',
            color: theme.colors.textSecondary
          }}>
            or use custom credentials
          </span>
        </div>
      
        <form onSubmit={handleEmailAuth}>
          {!isLogin && (
            <>
              <input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                style={{ 
                  width: '100%', 
                  padding: '16px 20px', 
                  margin: '12px 0',
                  border: `2px solid ${theme.colors.border}`,
                  borderRadius: '12px',
                  fontSize: '16px',
                  outline: 'none',
                  boxSizing: 'border-box',
                  fontFamily: theme.fonts.primary
                }}
              />
              <select
                value={userType}
                onChange={(e) => setUserType(e.target.value as 'consumer' | 'business')}
                style={{ 
                  width: '100%', 
                  padding: '16px 20px', 
                  margin: '12px 0',
                  border: `2px solid ${theme.colors.border}`,
                  borderRadius: '12px',
                  fontSize: '16px',
                  backgroundColor: 'white',
                  boxSizing: 'border-box',
                  fontFamily: theme.fonts.primary
                }}
              >
                <option value="consumer">🛒 Consumer - I want to buy food</option>
                <option value="business">🏪 Business - I want to sell food</option>
              </select>
            </>
          )}
          
          <input
            type="text"
            placeholder="Email or Username (try: admin, business)"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ 
              width: '100%', 
              padding: '16px 20px', 
              margin: '12px 0',
              border: `2px solid ${theme.colors.border}`,
              borderRadius: '12px',
              fontSize: '16px',
              outline: 'none',
              boxSizing: 'border-box',
              fontFamily: theme.fonts.primary
            }}
          />
          
          <input
            type="password"
            placeholder="Password (try: admin, business)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ 
              width: '100%', 
              padding: '16px 20px', 
              margin: '12px 0',
              border: `2px solid ${theme.colors.border}`,
              borderRadius: '12px',
              fontSize: '16px',
              outline: 'none',
              boxSizing: 'border-box',
              fontFamily: theme.fonts.primary
            }}
          />
          
          <button
            type="submit"
            disabled={loading}
            style={{ 
              width: '100%', 
              padding: '16px', 
              margin: '20px 0 16px 0', 
              background: `linear-gradient(135deg, ${theme.colors.primary} 0%, ${theme.colors.accent} 100%)`, 
              color: 'white', 
              border: 'none',
              borderRadius: '12px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: 'pointer',
              opacity: loading ? 0.7 : 1,
              boxShadow: theme.shadows.button
            }}
          >
            {loading ? '🔄 Loading...' : (isLogin ? '🚀 Sign In' : '🌟 Create Account')}
          </button>
        </form>
        
        <p style={{ textAlign: 'center', marginTop: '24px' }}>
          <span style={{ color: theme.colors.textSecondary, fontSize: '14px' }}>
            {isLogin ? "New to FoodSaver? " : "Already have an account? "}
          </span>
          <button
            type="button"
            onClick={() => setIsLogin(!isLogin)}
            style={{ 
              background: 'none', 
              border: 'none', 
              color: theme.colors.primary, 
              cursor: 'pointer',
              fontWeight: '600',
              textDecoration: 'underline',
              fontSize: '14px'
            }}
          >
            {isLogin ? 'Create Account' : 'Sign In'}
          </button>
        </p>
      </div>
    </>
  );
};

export default Auth;