'use client'


import React, { useEffect } from 'react';
import { FaUser, FaCog, FaTruck, FaMapMarkerAlt, FaSignOutAlt } from 'react-icons/fa'; // Importing icons
import cl from './style.module.css'; // Importing CSS module
import Link from 'next/link';
import { useAuth } from '@/Context/AuthProvider';
import Image from 'next/image';
import { auth } from '@/db/firebase'; 
import { signOut } from 'firebase/auth';
import { useRouter } from 'next/navigation';

function PhoneNav() {

  const { userData, user,loading } = useAuth();

  const router = useRouter();

  useEffect(() => {
    if (!user ) {
      router.push('/login'); // Redirect to home if user is logged in
    }
  }, [user, loading, router]);



  const handleLogout = async () => {
    try {
      await signOut(auth); // Sign out the user
      router.push('/'); // Redirect after logging out
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };
  
  return (
    <div className={cl.container}>
      <ul className={cl.navList}>
        <Link href={'/profile'}> <li className={cl.navItem}>
        {
                  userData?.imageUrl ? <div className=" rounded-full">
                    <Image src={userData.imageUrl} alt='profileIcon' className=' rounded-full' priority width={35} height={30} />
                  </div> : <FaUser />
                 } 
          <span className={cl.navText}>Account</span>
        </li>
        </Link>
        <Link href={'/profile'}>
          <li className={cl.navItem}>
            <FaCog className={cl.navIcon} />
            <span className={cl.navText}>Settings</span>
          </li>
        </Link>
        <Link href={'/delivery'}>  <li className={cl.navItem}>
          <FaTruck className={cl.navIcon} />
          <span className={cl.navText}>Delivery</span>
        </li> </Link>
        <Link href={'/addressbook'}> <li className={cl.navItem}>
          <FaMapMarkerAlt className={cl.navIcon} />
          <span className={cl.navText}>Address</span>
        </li></Link>
        <Link href={'/contact-us'}> <li className={cl.navItem}>
          <FaMapMarkerAlt className={cl.navIcon} />
          <span className={cl.navText}>Help</span>
        </li></Link>
        <li onClick={handleLogout} className={`${cl.navItem} ${cl.logout}`}>
          <FaSignOutAlt className={cl.navIcon} />
          <span className={cl.navText}>Logout</span>
        </li>
      </ul>
    </div>
  );
}

export default PhoneNav;
