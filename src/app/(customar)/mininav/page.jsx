import React from 'react';
import { FaUser, FaCog, FaTruck, FaMapMarkerAlt, FaQuestionCircle, FaSignOutAlt } from 'react-icons/fa'; // Importing icons
import cl from './style.module.css'; // Importing CSS module
import Link from 'next/link';

function PhoneNav() {
  return (
    <div className={cl.container}>
      <ul className={cl.navList}>
        <Link href={'/profile'}> <li className={cl.navItem}>
          <FaUser className={cl.navIcon} />
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
        <li className={cl.navItem}>
          <FaQuestionCircle className={cl.navIcon} />
          <span className={cl.navText}>Help</span>
        </li>
        <li className={`${cl.navItem} ${cl.logout}`}>
          <FaSignOutAlt className={cl.navIcon} />
          <span className={cl.navText}>Logout</span>
        </li>
      </ul>
    </div>
  );
}

export default PhoneNav;
