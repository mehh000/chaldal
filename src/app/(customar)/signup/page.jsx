'use client'

import React, { useState } from 'react';
import { auth, db } from '../../../db/firebase'; // Ensure Firebase is correctly initialized
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { redirect, useRouter  } from 'next/navigation';
import cl from './Signup.module.css'; // Importing your CSS module
import Link from 'next/link';
import { FaGoogle } from 'react-icons/fa'; // For the Google icon

export default function Signup() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter()

  // Initialize Google Provider
  const googleProvider = new GoogleAuthProvider();

  // Handle normal signup
  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Add default user data to Firestore
      const userDoc = doc(db, 'users', user.uid);
      await setDoc(userDoc, {
        userId: user.uid,
        authType: 'customer',
        name: username,
        email: user.email,
        phoneNumber: '',
        imageUrl: '',
        cartList: [],
        watchList: [],
        checkoutList: [],
        addressList: [],
        userSearchList: [],
        primaryAddress: [],
      });

     // redirect('/');
     router.push('/login');
    } catch (error) {
      setError(error.message);
    }
  };

  // Handle Google signup
  const handleGoogleSignup = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      // Add user data to Firestore
      const userDoc = doc(db, 'users', user.uid);
      await setDoc(userDoc, {
        userId: user.uid,
        authType: 'google',
        name: user.displayName || '',
        email: user.email,
        phoneNumber: user.phoneNumber || '',
        imageUrl: user.photoURL || '',
        cartList: [],
        watchList: [],
        checkoutList: [],
        addressList: [],
        userSearchList: [],
      });

      router.push('/login');

    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className={cl.login_container}>
      <div className={cl.login_box}>
        <h2 className={cl.title}>Sign-Up</h2>
        <form onSubmit={handleSignup} className={cl.form}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={cl.input_field}
          />
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className={cl.input_field}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={cl.input_field}
          />
          <button type="submit" className={cl.login_button}>Sign-Up</button>
        </form>

        {/* Divider */}
        <div className={cl.divider}>OR</div>

        {/* Google Signup Button */}
        <button className={cl.google_login} onClick={handleGoogleSignup}>
          <FaGoogle className={cl.google_icon} />
          Sign-Up with Google
        </button>

        {error && <p className={cl.error}>{error}</p>}

        <p className={cl.register_link}>
          <Link href={"/login"}>Already have an account? Login now</Link>
        </p>
      </div>
    </div>
  );
}
