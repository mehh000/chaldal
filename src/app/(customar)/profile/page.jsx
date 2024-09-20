"use client"


import React, { useState } from 'react';
import styles from './Profile.module.css';
import { useRouter } from 'next/navigation';
import { FaArrowLeft, FaCamera } from 'react-icons/fa'; // Icons for back and camera
import Image from 'next/image';

function Profile() {
  const router = useRouter();

  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  // Handle going back to the previous page
  const handleBack = () => {
    router.back();
  };

  // Handle save action
  const handleSave = () => {
    console.log('Saved:', { name, phoneNumber });
    // Here you would send the data to an API or update user info
  };

  // Handle cancel action (reset inputs)
  const handleCancel = () => {
    setName('');
    setPhoneNumber('');
  };

  return (
    <div className={styles.profileContainer}>
      <div className={styles.header}>
        <FaArrowLeft className={styles.backIcon} onClick={handleBack} />
        <h2>Profile</h2>
      </div>
      
      <div className={styles.profileContent}>
        <div className={styles.imageWrapper}>
          <Image src="/alu.png" alt="Profile" height={200} width={200} className={styles.profileImage} />
          <FaCamera className={styles.cameraIcon} />
        </div>
        
        <div className={styles.info}>
          <label className={styles.label}>Name</label>
          <input
            type="text"
            className={styles.input}
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <label className={styles.label}>Phone Number</label>
          <input
            type="text"
            className={styles.input}
            placeholder="Enter your phone number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </div>
        
        {/* Buttons */}
        <div className={styles.buttonGroup}>
          <button className={styles.cancelButton} onClick={handleCancel}>Cancel</button>
          <button className={styles.saveButton} onClick={handleSave}>Save</button>
        </div>
      </div>
    </div>
  );
}

export default Profile;
