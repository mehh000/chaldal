'use client'


import Link from 'next/link';
import styles from './Mininav.module.css';
import { FaHome, FaShoppingCart, FaUser, FaPerbyte, FaHotjar } from 'react-icons/fa';
import { useAuth } from '@/Context/AuthProvider';
import Image from 'next/image';


export default function Mininav() {


  const { userData, user,loading } = useAuth();



  return (
    <div className={styles.mininav_container}>
      <Link href={'/'}>   <FaHome className='text-4xl text-white' /></Link>
      <Link href={'/categorymini'}>   <FaPerbyte className='text-4xl text-white' /></Link>
      <Link href={'/discount'}>   <FaHotjar className='text-4xl text-white' /></Link>
      <Link href={'/cart'}>  <FaShoppingCart className='text-4xl text-white' /></Link>
      <Link href={'/mininav'}>
        {
          userData?.imageUrl ? <div className=" rounded-full">
            <Image src={userData.imageUrl} alt='profileIcon' className=' rounded-full' priority width={35} height={30} />
          </div> : <FaUser className='text-4xl text-white' />
        }
      
      </Link>
    </div>
  );
}
