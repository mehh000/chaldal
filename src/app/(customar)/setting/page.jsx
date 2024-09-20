'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaArrowLeft, FaUser, FaBell, FaTrashAlt } from 'react-icons/fa';
import { deleteUserAccount } from '@/service/accountdelete';
import styles from './Setting.module.css';

function Setting() {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  const handleDeleteClick = () => {
    setShowDeleteModal(true);
  };

  const handleCloseModal = () => {
    setShowDeleteModal(false);
  };

  const handleConfirmDelete = async () => {
    try {
      await deleteUserAccount(); // Call the utility function to delete the user account and data
      router.push('/login'); // Redirect to the login page after account deletion
    } catch (error) {
      console.error('Error deleting account: ', error.message);
    }
    setShowDeleteModal(false);
  };

  return (
    <div className={styles.settingContainer}>
      <div className={styles.header}>
        <FaArrowLeft className={styles.backIcon} onClick={handleBack} />
        <h2>Settings</h2>
      </div>

      <div className={styles.settingContent}>
        <div className={styles.menuItem}>
          <FaUser className={styles.menuIcon} />
          <span>Profile</span>
        </div>

        <div className={styles.menuItem}>
          <FaBell className={styles.menuIcon} />
          <span>Notifications</span>
        </div>

        <div className={`${styles.menuItem} ${styles.deleteOption}`} onClick={handleDeleteClick}>
          <FaTrashAlt className={styles.menuIcon} />
          <span>Delete Account</span>
        </div>
      </div>

      {showDeleteModal && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h3>Are you sure?</h3>
            <p>Do you really want to delete your account? This action cannot be undone.</p>
            <div className={styles.modalButtons}>
              <button className={styles.cancelButton} onClick={handleCloseModal}>Cancel</button>
              <button className={styles.confirmButton} onClick={handleConfirmDelete}>Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Setting;
