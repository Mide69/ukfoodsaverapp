let authCallback: ((user: any) => void) | null = null;

export const mockAuth = {
  currentUser: null as any,
  signInWithEmailAndPassword: async (email: string, password: string) => {
    // Validate inputs
    if (!email || !password) {
      throw new Error('Email and password are required');
    }

    let userType = 'consumer';
    let displayName = email.split('@')[0] || email;
    
    // Admin access (hidden)
    if (email === 'admin' && password === 'admin') {
      userType = 'admin';
      displayName = 'Admin User';
    }
    // Business login - any credentials accepted
    else if (email.includes('business') || email.includes('shop') || email.includes('store') || password === 'business') {
      userType = 'business';
      displayName = displayName.charAt(0).toUpperCase() + displayName.slice(1) + ' Business';
    }
    // Consumer login - any other credentials accepted
    else {
      userType = 'consumer';
      displayName = displayName.charAt(0).toUpperCase() + displayName.slice(1);
    }
    
    const user = { 
      uid: `${userType}-${Date.now()}`, 
      email: email, 
      displayName: displayName,
      userType 
    };
    
    mockAuth.currentUser = user;
    
    // Ensure callback is called
    setTimeout(() => {
      if (authCallback) authCallback(user);
    }, 100);
    
    return { user };
  },
  createUserWithEmailAndPassword: async (email: string, password: string, userType: string = 'consumer', displayName?: string) => {
    if (!email || !password) {
      throw new Error('Email and password are required');
    }

    const name = displayName || email.split('@')[0] || 'New User';
    const user = { 
      uid: `${userType}-${Date.now()}`, 
      email, 
      displayName: name.charAt(0).toUpperCase() + name.slice(1), 
      userType 
    };
    
    mockAuth.currentUser = user;
    
    setTimeout(() => {
      if (authCallback) authCallback(user);
    }, 100);
    
    return { user };
  },
  signInWithPopup: async (provider: any) => {
    // Simulate Google sign-in
    const user = {
      uid: `social-${Date.now()}`,
      email: 'user@gmail.com',
      displayName: 'Google User',
      userType: 'consumer',
      photoURL: 'https://via.placeholder.com/40'
    };
    mockAuth.currentUser = user;
    if (authCallback) authCallback(user);
    return { user };
  },
  signOut: async () => {
    mockAuth.currentUser = null;
    if (authCallback) authCallback(null);
  },
  onAuthStateChanged: (callback: (user: any) => void) => {
    authCallback = callback;
    callback(mockAuth.currentUser);
    return () => { authCallback = null; };
  },
  getIdToken: async () => 'mock-token-123'
};