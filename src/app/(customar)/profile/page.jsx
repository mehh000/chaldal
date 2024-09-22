"use client";

import React, { useState, useEffect } from 'react';
import styles from './Profile.module.css';
import { useRouter } from 'next/navigation';
import { FaArrowLeft, FaCamera } from 'react-icons/fa';
import Image from 'next/image';
import { updateUserProfile } from '@/service/userUpdate';
import { useAuth } from '@/Context/AuthProvider';

function Profile() {
  const { userData } = useAuth(); // Assuming this returns userData or null if not logged in
  const router = useRouter();

  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null); // For error handling

  useEffect(() => {
    if (userData) {
      setName(userData.name || ''); // Set initial values if available
      setPhoneNumber(userData.phoneNumber || '');
    }
  }, [userData]);

  const handleBack = () => {
    router.back();
  };

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setProfileImage(e.target.files[0]);
    }
  };

  const handleSave = async () => {
    if (!userData) {
      setError('User is not authenticated');
      return;
    }

    const userId = userData.uid; // Safe access to userId now

    setLoading(true);
    setError(null);

    const response = await updateUserProfile(userId, name, phoneNumber, profileImage);
    setLoading(false);

    if (response.success) {
    //  console.log(response.message);
    } else {
      setError(response.message);
    }
  };

  const handleCancel = () => {
    setName(userData?.name || '');
    setPhoneNumber(userData?.phoneNumber || '');
    setProfileImage(null);
  };

  if (!userData) {
    return <div className={styles.error}>User not authenticated</div>;
  }

  return (
    <div className={styles.profileContainer}>
      <div className={styles.header}>
        <FaArrowLeft className={styles.backIcon} onClick={handleBack} />
        <h2>Profile</h2>
      </div>

      <div className={styles.profileContent}>
        <div className={styles.imageWrapper}>
          <Image
            src={profileImage ? URL.createObjectURL(profileImage) : '/boy.jpg'}
            alt="Profile"
            height={200}
            width={200}
            className={styles.profileImage}
          />
          <label htmlFor="file-upload" className={styles.cameraIcon}>
            <FaCamera size={34} color="blue" />
          </label>
          <input
            id="file-upload"
            type="file"
            accept="image/*"
            style={{ display: 'none' }}
            onChange={handleFileChange}
          />
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

        <div className={styles.buttonGroup}>
          <button className={styles.cancelButton} onClick={handleCancel}>
            Cancel
          </button>
          <button
            className={styles.saveButton}
            onClick={handleSave}
            disabled={loading}
          >
            {loading ? 'Saving...' : 'Save'}
          </button>
        </div>

        {error && <div className={styles.error}>{error}</div>}
      </div>
    </div>
  );
}

export default Profile;
