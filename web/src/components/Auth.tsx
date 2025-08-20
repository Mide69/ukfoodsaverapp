import React, { useState } from 'react';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../services/firebase';
import { authAPI } from '../services/api';

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
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        await authAPI.register({
          name,
          email,
          userType,
        });
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
      const result = await signInWithPopup(auth, googleProvider);
      if (!isLogin) {
        await authAPI.register({
          name: result.user.displayName || 'User',
          email: result.user.email,
          userType,
        });
      }
      onAuthSuccess();
    } catch (error: any) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto', padding: '20px' }}>
      <h2>{isLogin ? 'Login' : 'Sign Up'}</h2>
      
      <form onSubmit={handleEmailAuth}>
        {!isLogin && (
          <>
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              style={{ width: '100%', padding: '10px', margin: '10px 0' }}
            />
            <select
              value={userType}
              onChange={(e) => setUserType(e.target.value as 'consumer' | 'business')}
              style={{ width: '100%', padding: '10px', margin: '10px 0' }}
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
          style={{ width: '100%', padding: '10px', margin: '10px 0' }}
        />
        
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ width: '100%', padding: '10px', margin: '10px 0' }}
        />
        
        <button
          type="submit"
          disabled={loading}
          style={{ width: '100%', padding: '10px', margin: '10px 0', backgroundColor: '#007bff', color: 'white', border: 'none' }}
        >
          {loading ? 'Loading...' : (isLogin ? 'Login' : 'Sign Up')}
        </button>
      </form>
      
      <button
        onClick={handleGoogleAuth}
        disabled={loading}
        style={{ width: '100%', padding: '10px', margin: '10px 0', backgroundColor: '#db4437', color: 'white', border: 'none' }}
      >
        {isLogin ? 'Login' : 'Sign Up'} with Google
      </button>
      
      <p>
        {isLogin ? "Don't have an account? " : "Already have an account? "}
        <button
          type="button"
          onClick={() => setIsLogin(!isLogin)}
          style={{ background: 'none', border: 'none', color: '#007bff', cursor: 'pointer' }}
        >
          {isLogin ? 'Sign Up' : 'Login'}
        </button>
      </p>
    </div>
  );
};

export default Auth;