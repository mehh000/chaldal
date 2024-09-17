import Link from 'next/link';
import styles from './Mininav.module.css';
import { FaHome, FaShoppingCart, FaUser, FaPerbyte, FaHotjar } from 'react-icons/fa';

export default function Mininav() {
  return (
    <div className={styles.mininav_container}>
      <Link href={'/'}>   <FaHome className='text-4xl text-white' /></Link>
      <Link href={'/categorymini'}>   <FaPerbyte className='text-4xl text-white' /></Link>
      <Link href={'/discount'}>   <FaHotjar className='text-4xl text-white' /></Link>
      <Link href={'/cart'}>  <FaShoppingCart className='text-4xl text-white' /></Link>
      <Link href={'/mininav'}>  <FaUser className='text-4xl text-white' /></Link>
    </div>
  );
}
