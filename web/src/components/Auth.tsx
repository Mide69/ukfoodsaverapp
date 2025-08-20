import React, { useState } from 'react';
import { mockAuth } from '../services/mockAuth';
import { authAPI } from '../services/api';
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

  const handleGoogleAuth = async () => {
    setLoading(true);
    try {
      await mockAuth.signInWithEmailAndPassword('demo@google.com', 'password');
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
        maxWidth: '400px', 
        margin: '50px auto', 
        padding: '30px',
        background: 'rgba(255,255,255,0.95)',
        borderRadius: '20px',
        backdropFilter: 'blur(20px)',
        boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
        border: '1px solid rgba(255,255,255,0.2)'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <div style={{ fontSize: '3rem', marginBottom: '10px' }}>🍃</div>
          <h2 style={{ margin: 0, color: '#333', fontWeight: '600' }}>
            {isLogin ? 'Welcome Back' : 'Join FoodSaver'}
          </h2>
          <p style={{ color: '#666', margin: '5px 0 0 0', fontSize: '14px' }}>
            {isLogin ? 'Save food, save money' : 'Reduce waste, help community'}
          </p>
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
                  padding: '15px', 
                  margin: '10px 0',
                  border: '2px solid #e1e5e9',
                  borderRadius: '12px',
                  fontSize: '16px',
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
              />
              <select
                value={userType}
                onChange={(e) => setUserType(e.target.value as 'consumer' | 'business')}
                style={{ 
                  width: '100%', 
                  padding: '15px', 
                  margin: '10px 0',
                  border: '2px solid #e1e5e9',
                  borderRadius: '12px',
                  fontSize: '16px',
                  backgroundColor: 'white',
                  boxSizing: 'border-box'
                }}
              >
                <option value="consumer">Consumer</option>
                <option value="business">Business</option>
              </select>
            </>
          )}
          
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ 
              width: '100%', 
              padding: '15px', 
              margin: '10px 0',
              border: '2px solid #e1e5e9',
              borderRadius: '12px',
              fontSize: '16px',
              outline: 'none',
              boxSizing: 'border-box'
            }}
          />
          
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ 
              width: '100%', 
              padding: '15px', 
              margin: '10px 0',
              border: '2px solid #e1e5e9',
              borderRadius: '12px',
              fontSize: '16px',
              outline: 'none',
              boxSizing: 'border-box'
            }}
          />
          
          <button
            type="submit"
            disabled={loading}
            style={{ 
              width: '100%', 
              padding: '15px', 
              margin: '15px 0 10px 0', 
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', 
              color: 'white', 
              border: 'none',
              borderRadius: '12px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: 'pointer',
              opacity: loading ? 0.7 : 1
            }}
          >
            {loading ? 'Loading...' : (isLogin ? 'Login' : 'Sign Up')}
          </button>
        </form>
        
        <button
          onClick={handleGoogleAuth}
          disabled={loading}
          style={{ 
            width: '100%', 
            padding: '15px', 
            margin: '10px 0', 
            background: 'linear-gradient(135deg, #ea4335 0%, #fbbc05 100%)', 
            color: 'white', 
            border: 'none',
            borderRadius: '12px',
            fontSize: '16px',
            fontWeight: '600',
            cursor: 'pointer',
            opacity: loading ? 0.7 : 1
          }}
        >
          {isLogin ? 'Login' : 'Sign Up'} with Google
        </button>
        
        <p style={{ textAlign: 'center', marginTop: '20px' }}>
          <span style={{ color: '#666' }}>
            {isLogin ? "Don't have an account? " : "Already have an account? "}
          </span>
          <button
            type="button"
            onClick={() => setIsLogin(!isLogin)}
            style={{ 
              background: 'none', 
              border: 'none', 
              color: '#667eea', 
              cursor: 'pointer',
              fontWeight: '600',
              textDecoration: 'underline'
            }}
          >
            {isLogin ? 'Sign Up' : 'Login'}
          </button>
        </p>
      </div>
    </>
  );
};

export default Auth;