import React, { useState } from 'react';
import { mockAuth } from '../services/mockAuth';
import { theme } from '../styles/theme';
import Background from './Background';
import Watermark from './Watermark';
import Footer from './Footer';

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
    
    if (!email.trim() || !password.trim()) {
      alert('Please enter both email and password');
      return;
    }
    
    setLoading(true);
    
    try {
      let result;
      if (isLogin) {
        result = await mockAuth.signInWithEmailAndPassword(email.trim(), password.trim());
      } else {
        result = await mockAuth.createUserWithEmailAndPassword(email.trim(), password.trim(), userType, name.trim());
      }
      
      if (result && result.user) {
        setTimeout(() => {
          onAuthSuccess();
        }, 200);
      }
    } catch (error: any) {
      console.error('Auth error:', error);
      alert(error.message || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = async () => {
    setLoading(true);
    try {
      const result = await mockAuth.signInWithPopup({});
      if (result && result.user) {
        setTimeout(() => {
          onAuthSuccess();
        }, 200);
      }
    } catch (error: any) {
      console.error('Social login error:', error);
      alert(error.message || 'Social login failed');
    } finally {
      setLoading(false);
    }
  };

  const handleQuickLogin = async (type: 'business' | 'consumer') => {
    setLoading(true);
    try {
      let result;
      if (type === 'business') {
        result = await mockAuth.signInWithEmailAndPassword('business', 'business');
      } else {
        result = await mockAuth.signInWithEmailAndPassword('customer', 'customer');
      }
      
      if (result && result.user) {
        setTimeout(() => {
          onAuthSuccess();
        }, 200);
      }
    } catch (error: any) {
      console.error('Quick login error:', error);
      alert(error.message || 'Login failed');
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
        background: 'rgba(255,255,255,0.98)',
        borderRadius: '28px',
        backdropFilter: 'blur(25px)',
        boxShadow: '0 20px 60px rgba(46, 125, 50, 0.15), 0 8px 32px rgba(0,0,0,0.1)',
        border: '2px solid rgba(255,255,255,0.3)',
        fontFamily: theme.fonts.primary
      }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{ 
            fontSize: '5rem', 
            marginBottom: '20px',
            filter: 'drop-shadow(0 4px 8px rgba(46, 125, 50, 0.3))'
          }}>🌱</div>
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
            ✨ Quick Demo Access or use any credentials below:
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '20px' }}>
            <button
              onClick={() => handleQuickLogin('consumer')}
              disabled={loading}
              style={{
                padding: '16px 20px',
                background: `linear-gradient(135deg, ${theme.colors.accent} 0%, #81C784 100%)`,
                color: 'white',
                border: 'none',
                borderRadius: '16px',
                fontSize: '15px',
                fontWeight: '600',
                cursor: 'pointer',
                opacity: loading ? 0.7 : 1,
                textAlign: 'left',
                boxShadow: '0 6px 20px rgba(129, 199, 132, 0.4)',
                transition: 'all 0.3s ease',
                transform: 'translateY(0)'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-3px)';
                e.currentTarget.style.boxShadow = '0 8px 25px rgba(129, 199, 132, 0.5)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 6px 20px rgba(129, 199, 132, 0.4)';
              }}
            >
              🛒 Customer - Browse & buy discounted food
            </button>
            <button
              onClick={() => handleQuickLogin('business')}
              disabled={loading}
              style={{
                padding: '16px 20px',
                background: `linear-gradient(135deg, ${theme.colors.secondary} 0%, #FFB74D 100%)`,
                color: 'white',
                border: 'none',
                borderRadius: '16px',
                fontSize: '15px',
                fontWeight: '600',
                cursor: 'pointer',
                opacity: loading ? 0.7 : 1,
                textAlign: 'left',
                boxShadow: '0 6px 20px rgba(255, 183, 77, 0.4)',
                transition: 'all 0.3s ease',
                transform: 'translateY(0)'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-3px)';
                e.currentTarget.style.boxShadow = '0 8px 25px rgba(255, 183, 77, 0.5)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 6px 20px rgba(255, 183, 77, 0.4)';
              }}
            >
              🏪 Business - List & manage food inventory
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
            or enter any email/password combination
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
            placeholder="Email or Username (any credentials accepted)"
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
            placeholder="Password (any password accepted)"
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
              borderRadius: '16px',
              fontSize: '17px',
              fontWeight: '700',
              cursor: 'pointer',
              opacity: loading ? 0.7 : 1,
              boxShadow: '0 8px 25px rgba(46, 125, 50, 0.4)',
              transition: 'all 0.3s ease'
            }}
          >
            {loading ? '🔄 Loading...' : (isLogin ? '🚀 Sign In' : '🌟 Create Account')}
          </button>
          
          <button
            type="button"
            onClick={handleSocialLogin}
            disabled={loading}
            style={{
              width: '100%',
              padding: '16px',
              margin: '10px 0',
              background: 'white',
              color: '#333',
              border: '2px solid #ddd',
              borderRadius: '16px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: 'pointer',
              opacity: loading ? 0.7 : 1,
              transition: 'all 0.3s ease',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px'
            }}
          >
            🔗 Continue with Google
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
      
      <Footer />
    </>
  );
};

export default Auth;