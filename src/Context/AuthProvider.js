// src/context/AuthContext.jsx
'use client'; // Ensure client-side rendering

import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth } from '@/db/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { getCurrentUserData } from '@/service/currentuser';

// Create the context
const AuthContext = createContext();

// Create the provider component
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // To handle loading state
  const [userData, setUserData] = useState(null); // Renamed from `currentUser` for clarity

  // Listen to authentication state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false); // Set loading to false once the user is determined
    });

    // Clean up the subscription when the component unmounts
    return () => unsubscribe();
  }, []);

  // Fetch the current user's data from Firestore
  const handleGetUser = async () => {
    try {
      if (user && user.uid) {
        const fetchedUserData = await getCurrentUserData(user.uid);
        setUserData(fetchedUserData);
        console.log('Getting current user:', fetchedUserData);
      } else {
        console.log('User not logged in or UID not found.');
      }
    } catch (error) {
      console.log('Cannot get user data:', error);
    }
  };

  // Automatically fetch user data when the user changes
  useEffect(() => {
    if (user) {
      handleGetUser();
    }
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, loading, userData, handleGetUser }}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook to use the AuthContext
export const useAuth = () => useContext(AuthContext);
