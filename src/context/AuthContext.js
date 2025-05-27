import React, { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, signOut, getAuth } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db, app } from '../config/firebaseConfig';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState('guest');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setLoading(true);

      if (firebaseUser) {
        setUser(firebaseUser);
        const docRef = doc(db, 'users', firebaseUser.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          if (data.email === 'applications@wearefixo.com') {
            setRole('admin');
          } else if (data.isProfessional && data.applicationStatus === 'approved') {
            setRole('professional');
          } else if (data.applicationStatus === 'pending') {
            setRole('pending');
          } else {
            setRole('user');
          }
        } else {
          setRole('user');
        }
      } else {
        setUser(null);
        setRole('guest');
      }

      setLoading(false);
    });

    return unsubscribe;
  }, []);

  // ✅ Centralizado el logout acá
  const logout = async () => {
    const authInstance = getAuth(app);
    await signOut(authInstance);
    setUser(null);
    setRole('guest');
  };

  return (
    <AuthContext.Provider value={{ user, role, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
