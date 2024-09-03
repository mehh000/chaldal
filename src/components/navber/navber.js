"use client"


import cl from './Navber.module.css'
import Image from 'next/image';
import { FaShoppingCart, FaUserAlt, FaSearch, FaBars } from 'react-icons/fa';

export default function Navber() {

  return (
    
    <div className={cl.navbox}>
    <div className={cl.container}>
      {/* Logo and Name */}
      <div className={cl.logo_container}>
        <Image src="/logo.png" height={50} width={50} alt="Chaldal Logo" />
        <span className={cl.logo_name}>Chaldals</span>
      </div>

      {/* Main Menu */}
      <div className={cl.menu_container}>
        <a href="#home">Home</a>
        <a href="#contact">Contact Us</a>
        <a href="#discounts">Discounts</a>
      </div>

      {/* Icons */}
      <div className={cl.icon_container}>
        <FaShoppingCart />
        <FaUserAlt />
        <FaSearch />
      </div>

     
    </div>
    
     </div>
  );
}
