import styles from './Mininav.module.css';
import { FaHome, FaShoppingCart, FaUser } from 'react-icons/fa';

export default function Mininav() {
  return (
    <div className={styles.mininav_container}>
      <FaHome className='text-4xl text-white' />
      <FaShoppingCart  className='text-4xl text-white'  />
      <FaUser  className='text-4xl text-white'  />
    </div>
  );
}
