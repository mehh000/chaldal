import React from 'react';
import cl from './Signup.module.css';
import { FaGoogle } from 'react-icons/fa';
import Link from 'next/link';

export default function Signup() {
  return (
    <div className={cl.login_container}>
      <div className={cl.login_box}>
        <h2 className={cl.title}>Sign-Up</h2>
        <form className={cl.form}>
          <input type="email" placeholder="Email" className={cl.input_field} />
          <input type="text" placeholder="UserName" className={cl.input_field} />
          <input type="password" placeholder="Password" className={cl.input_field} />
          <button type="submit" className={cl.login_button}>Sign-Up</button>
        </form>
     
        <p className={cl.register_link}>
        <Link href={'/login'} >Already have an account? Login now  </Link> 
        </p>
      </div>
    </div>
  );
}
