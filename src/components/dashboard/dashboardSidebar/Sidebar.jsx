import React from 'react';
import cl from './style.module.css';
import Image from 'next/image';
import { FaHome, FaShoppingCart, FaBoxOpen, FaTruck, FaBell, FaUsers, FaListAlt, FaSignOutAlt, FaAdversal  } from 'react-icons/fa'; // Icons for menu
import Link from 'next/link';

function Sidebar() {
  return (
    <div className={cl.container}>
      <div className={cl.header}>
        <div className={cl.logo_container}>
          <Image src={'/logo.png'} height={80} width={80} alt='logo' />
          <h2 className={cl.title}>ChaldalBD</h2>
        </div>
      </div>

      <div className={cl.body}>
        <ul className={cl.menu_list}>
          <Link href={'/admin/dashboard/pages/home'}> <li className={cl.menu_item}>
            <FaHome className={cl.icon} />
            <span>Home</span>
          </li>
          </Link>
          <Link href={'/admin/dashboard/pages/home'}>  <li className={cl.menu_item}>
            <FaShoppingCart className={cl.icon} />
            <span>Sells</span>
          </li>
          </Link>
          <Link href={'/admin/dashboard/pages/home'}> <li className={cl.menu_item}>
            <FaListAlt className={cl.icon} />
            <span>Requests</span>
          </li>
          </Link>
          <Link href={'/admin/dashboard/pages/products'}>  <li className={cl.menu_item}>
            <FaBoxOpen className={cl.icon} />
            <span>Products</span>
          </li>
          </Link>
          <Link href={'/admin/dashboard/pages/home'}>    <li className={cl.menu_item}>
            <FaTruck className={cl.icon} />
            <span>Delivery</span>
          </li>
          </Link>
          <Link href={'/admin/dashboard/pages/home'}>  <li className={cl.menu_item}>
            <FaBell className={cl.icon} />
            <span>Notification</span>
          </li>
          </Link>
          <Link href={'/admin/dashboard/pages/users'}>    <li className={cl.menu_item}>
            <FaUsers className={cl.icon} />
            <span>Users</span>
          </li> </Link>
          <Link href={'/admin/dashboard/pages/advertisement'}>    <li className={cl.menu_item}>
            <FaAdversal  className={cl.icon} />
            <span>Ads</span>
          </li> </Link>
        </ul>
      </div>

      <div className={cl.footer}>
        <div className={cl.logout_container}>
          <FaSignOutAlt className={cl.icon} />
          <span className={cl.logout_title}>Log Out</span>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
