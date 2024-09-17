'use client'


import cl from './Navber.module.css'
import Image from 'next/image';
import Link from 'next/link';
import { FaShoppingCart, FaUserAlt, FaSearch } from 'react-icons/fa';
import { useAuth } from '@/Context/AuthProvider';

export default function Navber() {
  const { handleGetUser } = useAuth();
  return (
    <>
      <div className={cl.navbox}>
        <div className={cl.container}>
          {/* Logo and Name */}
          <Link href={'/'}>
            <div className={cl.logo_container}>
              <Image src="/logo.png" height={50} width={50} alt="Chaldal Logo" />
              <span className={cl.logo_name}>Chaldals</span>
            </div>
          </Link>
          {/* Main Menu */}
          <div className={cl.menu_container}>
            <Link href="/">Home</Link>
            <Link href="contact-us">Contact Us</Link>
            <Link href="discount">Hot deals</Link>
            <Link href="#discounts">Health tips</Link>
          </div>

          {/* Icons */}
          <div className={cl.icon_container}>
            <Link href={'/search'}> <FaSearch /></Link>
            <Link href={'/cart'}  >  <FaShoppingCart onClick={handleGetUser()} /></Link>
            <Link href={'/login'}  >
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
          <Link href={'/search'}> <div className={cl.search_icon_container}>
            <FaSearch className={cl.search_icon} />
          </div> </Link>
        </div>
      </div>

    </>
  );
}
