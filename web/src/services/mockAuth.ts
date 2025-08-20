// Mock authentication for testing without Firebase
export const mockAuth = {
  currentUser: null as any,
  signInWithEmailAndPassword: async (email: string, password: string) => {
    const user = { uid: 'mock-user-123', email, displayName: email.split('@')[0] };
    mockAuth.currentUser = user;
    return { user };
  },
  createUserWithEmailAndPassword: async (email: string, password: string) => {
    const user = { uid: 'mock-user-123', email, displayName: email.split('@')[0] };
    mockAuth.currentUser = user;
    return { user };
  },
  signOut: async () => {
    mockAuth.currentUser = null;
  },
  onAuthStateChanged: (callback: (user: any) => void) => {
    callback(mockAuth.currentUser);
    return () => {};
  },
  getIdToken: async () => 'mock-token-123'
};