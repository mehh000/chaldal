'use client'; // Ensure this is a client component

import cl from './Navber.module.css';
import Image from 'next/image';
import Link from 'next/link';
import { FaShoppingCart, FaUserAlt, FaSearch } from 'react-icons/fa';
import { useAuth } from '@/Context/AuthProvider';
import { signOut } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { auth } from '@/db/firebase'; // Import your Firebase auth configuration

export default function Navber() {
  const router = useRouter();
  const { handleGetUser, user, loading, userData } = useAuth();

  const handleLogout = async () => {
    try {
      await signOut(auth); // Sign out the user
      router.push('/'); // Redirect after logging out
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  //console.log('from the navber',userData.imageUrl);

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

            <Link href={'/search/all'}> <FaSearch /></Link>
            <div className={cl.cart_container}>

              <Link href={'/cart'}> <FaShoppingCart onClick={handleGetUser} /> </Link>
              {
                userData?.cartList?.length ? <div className={cl.Cart_lenth}>
                  {userData?.cartList?.length}
                </div> : null
              }

            </div>


            {user?.uid ? (
              <div className={cl.menu_container}>
                <div className={cl.user_icon}>
                 {
                  userData?.imageUrl ? <div className=" rounded-full">
                    <Image src={userData.imageUrl} alt='profileIcon' className=' rounded-full' priority width={45} height={40} />
                  </div> : <FaUserAlt />
                 } 
                </div>

                <div className={cl.drop_down}>
                  <div className={cl.drop_down_menus}>
                  <Link href={'/profile'}>
                  <p className={cl.drop_down_menu}>Account</p>
                  </Link>  
                  <Link href={'/setting'}>
                   <p className={cl.drop_down_menu}>Settings</p>
                  </Link>
                   
                    <Link href={'/delivery'}>
                      <p className={cl.drop_down_menu}>Delivery</p>
                       </Link>
                    <Link href={'/addressbook'}> 
                     <p className={cl.drop_down_menu}>Address</p> 
                     </Link>
                   <Link href={'/contact-us'}>
                    <p className={cl.drop_down_menu}>Help</p>
                   </Link>
                    <p className={cl.drop_down_menu} onClick={handleLogout}>Logout</p>
                  </div>
                </div>
              </div>
            ) : (
              <Link href={'/login'}>
                <FaUserAlt />
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* mini search bar
      <div className={cl.mini_search_contain}>
        <div className={cl.mini_search}>
        <Link href={'/search/all'}>  <input
            className={cl.search_input}
            placeholder='Search anything...'
            
          /> </Link>
          <Link href={'/search/all'}>
            <div className={cl.search_icon_container}>
              <FaSearch className={cl.search_icon} />
            </div>
          </Link>
        </div>
      </div> */}
    </>
  );
}
