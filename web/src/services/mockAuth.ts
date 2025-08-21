let authCallback: ((user: any) => void) | null = null;

export const mockAuth = {
  currentUser: null as any,
  signInWithEmailAndPassword: async (email: string, password: string) => {
    let userType = 'consumer';
    if (email === 'admin' && password === 'admin') {
      userType = 'admin';
    } else if (email === 'business' && password === 'business') {
      userType = 'business';
    }
    
    const user = { 
      uid: `${userType}-123`, 
      email: email === 'admin' ? 'admin@foodsaver.com' : email, 
      displayName: userType.charAt(0).toUpperCase() + userType.slice(1) + ' User',
      userType 
    };
    mockAuth.currentUser = user;
    if (authCallback) authCallback(user);
    return { user };
  },
  createUserWithEmailAndPassword: async (email: string, password: string) => {
    const user = { uid: 'user-123', email, displayName: 'New User', userType: 'consumer' };
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