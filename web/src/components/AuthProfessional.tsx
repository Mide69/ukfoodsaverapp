import React, { useState } from 'react';
import { mockAuth } from '../services/mockAuth';
import { theme } from '../styles/theme';
import Background from './Background';
import Watermark from './Watermark';
import Footer from './Footer';

interface AuthProps {
  onAuthSuccess: () => void;
}

const AuthProfessional: React.FC<AuthProps> = ({ onAuthSuccess }) => {
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
        maxWidth: '480px', 
        margin: window.innerWidth < 640 ? '20px auto' : '60px auto', 
        padding: '0',
        background: 'white',
        borderRadius: '24px',
        boxShadow: '0 24px 80px rgba(0,0,0,0.12), 0 8px 32px rgba(0,0,0,0.08)',
        border: '1px solid rgba(0,0,0,0.06)',
        fontFamily: theme.fonts.primary,
        overflow: 'hidden'
      }}>
        {/* Header Section */}
        <div style={{
          background: `linear-gradient(135deg, ${theme.colors.primary} 0%, ${theme.colors.accent} 100%)`,
          padding: '48px 40px',
          textAlign: 'center',
          color: 'white'
        }}>
          <div style={{ 
            fontSize: '3.5rem', 
            marginBottom: '16px',
            filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.2))'
          }}>🌱</div>
          <h1 style={{ 
            margin: 0, 
            fontWeight: '800',
            fontSize: '28px',
            marginBottom: '8px',
            letterSpacing: '-0.5px'
          }}>
            FoodSaver
          </h1>
          <p style={{ 
            margin: 0, 
            fontSize: '16px',
            opacity: 0.9,
            fontWeight: '400'
          }}>
            {isLogin ? 'Welcome back to your dashboard' : 'Join thousands saving food & money'}
          </p>
        </div>

        {/* Form Section */}
        <div style={{ padding: '40px' }}>
          {/* Quick Access */}
          <div style={{ marginBottom: '32px' }}>
            <h3 style={{
              margin: '0 0 20px 0',
              fontSize: '18px',
              fontWeight: '600',
              color: '#1a1a1a',
              textAlign: 'center'
            }}>
              Quick Access
            </h3>
            <div style={{ 
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '12px',
              marginBottom: '24px'
            }}>
              <button
                onClick={() => handleQuickLogin('consumer')}
                disabled={loading}
                style={{
                  padding: '16px 12px',
                  background: 'white',
                  color: theme.colors.primary,
                  border: `2px solid ${theme.colors.primary}`,
                  borderRadius: '12px',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  opacity: loading ? 0.7 : 1,
                  textAlign: 'center',
                  transition: 'all 0.3s ease',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '8px'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.background = theme.colors.primary;
                  e.currentTarget.style.color = 'white';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.background = 'white';
                  e.currentTarget.style.color = theme.colors.primary;
                }}
              >
                <span style={{ fontSize: '20px' }}>🛒</span>
                <span>Customer</span>
              </button>
              <button
                onClick={() => handleQuickLogin('business')}
                disabled={loading}
                style={{
                  padding: '16px 12px',
                  background: 'white',
                  color: theme.colors.secondary,
                  border: `2px solid ${theme.colors.secondary}`,
                  borderRadius: '12px',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  opacity: loading ? 0.7 : 1,
                  textAlign: 'center',
                  transition: 'all 0.3s ease',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '8px'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.background = theme.colors.secondary;
                  e.currentTarget.style.color = 'white';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.background = 'white';
                  e.currentTarget.style.color = theme.colors.secondary;
                }}
              >
                <span style={{ fontSize: '20px' }}>🏪</span>
                <span>Business</span>
              </button>
            </div>
          </div>

          {/* Divider */}
          <div style={{ 
            textAlign: 'center', 
            margin: '32px 0',
            position: 'relative'
          }}>
            <hr style={{ border: 'none', borderTop: '1px solid #e5e5e5' }} />
            <span style={{
              position: 'absolute',
              top: '-10px',
              left: '50%',
              transform: 'translateX(-50%)',
              background: 'white',
              padding: '0 20px',
              fontSize: '14px',
              color: '#666',
              fontWeight: '500'
            }}>
              Or sign in with credentials
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
                    margin: '8px 0',
                    border: '2px solid #e5e5e5',
                    borderRadius: '12px',
                    fontSize: '16px',
                    outline: 'none',
                    boxSizing: 'border-box',
                    fontFamily: theme.fonts.primary,
                    transition: 'all 0.3s ease',
                    background: '#fafafa'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = theme.colors.primary;
                    e.target.style.background = 'white';
                    e.target.style.boxShadow = `0 0 0 3px ${theme.colors.primary}20`;
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#e5e5e5';
                    e.target.style.background = '#fafafa';
                    e.target.style.boxShadow = 'none';
                  }}
                />
                <select
                  value={userType}
                  onChange={(e) => setUserType(e.target.value as 'consumer' | 'business')}
                  style={{ 
                    width: '100%', 
                    padding: '16px 20px', 
                    margin: '8px 0',
                    border: '2px solid #e5e5e5',
                    borderRadius: '12px',
                    fontSize: '16px',
                    backgroundColor: '#fafafa',
                    boxSizing: 'border-box',
                    fontFamily: theme.fonts.primary,
                    transition: 'all 0.3s ease'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = theme.colors.primary;
                    e.target.style.background = 'white';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#e5e5e5';
                    e.target.style.background = '#fafafa';
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
                margin: '8px 0',
                border: '2px solid #e5e5e5',
                borderRadius: '12px',
                fontSize: '16px',
                outline: 'none',
                boxSizing: 'border-box',
                fontFamily: theme.fonts.primary,
                transition: 'all 0.3s ease',
                background: '#fafafa'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = theme.colors.primary;
                e.target.style.background = 'white';
                e.target.style.boxShadow = `0 0 0 3px ${theme.colors.primary}20`;
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#e5e5e5';
                e.target.style.background = '#fafafa';
                e.target.style.boxShadow = 'none';
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
                margin: '8px 0',
                border: '2px solid #e5e5e5',
                borderRadius: '12px',
                fontSize: '16px',
                outline: 'none',
                boxSizing: 'border-box',
                fontFamily: theme.fonts.primary,
                transition: 'all 0.3s ease',
                background: '#fafafa'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = theme.colors.primary;
                e.target.style.background = 'white';
                e.target.style.boxShadow = `0 0 0 3px ${theme.colors.primary}20`;
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#e5e5e5';
                e.target.style.background = '#fafafa';
                e.target.style.boxShadow = 'none';
              }}
            />
            
            <button
              type="submit"
              disabled={loading}
              style={{ 
                width: '100%', 
                padding: '18px', 
                margin: '24px 0 16px 0', 
                background: `linear-gradient(135deg, ${theme.colors.primary} 0%, ${theme.colors.accent} 100%)`, 
                color: 'white', 
                border: 'none',
                borderRadius: '12px',
                fontSize: '16px',
                fontWeight: '600',
                cursor: 'pointer',
                opacity: loading ? 0.7 : 1,
                boxShadow: '0 4px 16px rgba(46, 125, 50, 0.3)',
                transition: 'all 0.3s ease',
                letterSpacing: '0.5px'
              }}
              onMouseOver={(e) => {
                if (!loading) {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 8px 25px rgba(46, 125, 50, 0.4)';
                }
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 16px rgba(46, 125, 50, 0.3)';
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
                margin: '12px 0',
                background: 'white',
                color: '#333',
                border: '2px solid #e5e5e5',
                borderRadius: '12px',
                fontSize: '16px',
                fontWeight: '500',
                cursor: 'pointer',
                opacity: loading ? 0.7 : 1,
                transition: 'all 0.3s ease',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '12px'
              }}
              onMouseOver={(e) => {
                if (!loading) {
                  e.currentTarget.style.borderColor = '#ccc';
                  e.currentTarget.style.background = '#f9f9f9';
                }
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.borderColor = '#e5e5e5';
                e.currentTarget.style.background = 'white';
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Continue with Google
            </button>
          </form>
          
          <p style={{ textAlign: 'center', marginTop: '32px', paddingTop: '24px', borderTop: '1px solid #f0f0f0' }}>
            <span style={{ color: '#666', fontSize: '14px' }}>
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
                fontSize: '14px',
                textDecoration: 'none'
              }}
              onMouseOver={(e) => e.currentTarget.style.textDecoration = 'underline'}
              onMouseOut={(e) => e.currentTarget.style.textDecoration = 'none'}
            >
              {isLogin ? 'Create Account' : 'Sign In'}
            </button>
          </p>
        </div>
      </div>
      
      <Footer />
    </>
  );
};

export default AuthProfessional;