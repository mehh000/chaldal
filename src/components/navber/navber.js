"use client"


import cl from './Navber.module.css'
import Image from 'next/image';
import Link from 'next/link';
import { FaShoppingCart, FaUserAlt, FaSearch, FaBars } from 'react-icons/fa';

export default function Navber() {

  return (
    <>
    <div className={cl.navbox}>
    <div className={cl.container}>
      {/* Logo and Name */}
      <Link href={'/'}>
      <div className={cl.logo_container}>
        <Image src="/logo.png" height={50} width={50} alt="Chaldal Logo"  />
        <span className={cl.logo_name}>Chaldals</span>
      </div>
 </Link>
      {/* Main Menu */}
      <div className={cl.menu_container}>
        <Link href="/">Homee</Link>
        <Link href="#contact">Contact Us</Link>
        <Link href="#discounts">Discounts</Link>
      </div>

      {/* Icons */}
      <div className={cl.icon_container}>
          <FaSearch />
        <FaShoppingCart />
       <Link href={'./login'}  >
        <FaUserAlt />
       </Link>
      
      </div>

     
    </div>
    
     </div>  
     {/* mini search ber */}

     <div className={cl.mini_search_contain}>
      <div className={cl.mini_search}>
        <input 
          className={cl.search_input} 
          placeholder='Search anything...' 
        />
        <div className={cl.search_icon_container}>
          <FaSearch className={cl.search_icon} />  
        </div>
      </div>
    </div>
     
      </>
  );
}
