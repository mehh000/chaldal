'use client'


import React, { useEffect, useState } from 'react';
import { auth, db } from '../../../db/firebase'; // Ensure Firebase is correctly initialized
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { redirect, useRouter  } from 'next/navigation';
import cl from './Login.module.css'; // Importing your CSS module
import Link from 'next/link';
import { FaGoogle } from 'react-icons/fa'; // For the Google icon
import { useAuth } from '@/Context/AuthProvider';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter(); 
  const { user, loading } = useAuth();
  // Initialize Google Provider
  const googleProvider = new GoogleAuthProvider();




  useEffect(() => {
    if (user && user.uid) {
      router.push('/'); // Redirect to home if user is logged in
    }
  }, [user, loading, router]);

  if (loading) {
    return <p>Loading...</p>; // Display a loading indicator while the auth state is being determined
  }


  // Handle email/password login
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
     // redirect('/'); // Redirect after successful login
      router.push('/')
    } catch (error) {
      setError(error.message); // Handle login errors
    }
  };

  // Handle Google login
  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      redirect('/'); // Redirect after successful Google login
    } catch (error) {
      setError(error.message); // Handle Google login errors
    }
  };

  return (
    <div className={cl.login_container}>
     
      <div className={cl.login_box}>
        <h2 className={cl.title}>Login</h2>
        <form onSubmit={handleLogin} className={cl.form}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={cl.input_field}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={cl.input_field}
          />
          <button type="submit" className={cl.login_button}>Login</button>
        </form>

        {/* Divider */}
        <div className={cl.divider}>OR</div>

        {/* Google Login Button */}
        <button className={cl.google_login} onClick={handleGoogleLogin}>
          <FaGoogle className={cl.google_icon} />
          Login with Google
        </button>

        {error && <p className={cl.error}>{error}</p>}

        <p className={cl.register_link}>
          <Link href={"/signup"}>Dont have an account? Sign up now</Link>
        </p>
      </div>
    </div>
  );
}
