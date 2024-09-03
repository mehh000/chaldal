import React from 'react';
import cl from './Login.module.css';
import { FaGoogle } from 'react-icons/fa';
import Link from 'next/link';

export default function Login() {
  return (
    <div className={cl.login_container}>
      <div className={cl.login_box}>
        <h2 className={cl.title}>Login</h2>
        <form className={cl.form}>
          <input type="email" placeholder="Email" className={cl.input_field} />
          <input type="password" placeholder="Password" className={cl.input_field} />
          <button type="submit" className={cl.login_button}>Login</button>
        </form>
        <div className={cl.divider}>OR</div>
        <button className={cl.google_login}>
          <FaGoogle className={cl.google_icon} />
          Login with Google
        </button>
        <p className={cl.register_link}>
          Don’t have an account? <Link href="signup">Register now</Link>
        </p>
      </div>
    </div>
  );
}
