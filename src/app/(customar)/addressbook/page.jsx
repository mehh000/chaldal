'use client'

import React, { useState } from 'react';
import styles from './AddressPage.module.css';
import { addAddressToUser } from '@/service/addAdress';
import { useAuth } from '@/Context/AuthProvider';

const AddressPage = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    landmark: '',
    province: '',
    city: '',
    area: '',
    fullAddress: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCancel = () => {
    setFormData({
      name: '',
      phone: '',
      email: '',
      landmark: '',
      province: '',
      city: '',
      area: '',
      fullAddress: '',
    });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (user?.uid) {
      try {
        // Call the service to add the address to the user's addressList
        await addAddressToUser(user.uid, formData);
        console.log('Address saved:', formData);
      } catch (error) {
        console.error('Error saving address:', error);
      }
    } else {
      console.error('User not authenticated');
    }
  };

  return (
    <div className={styles.addressContainer}>
      <div className={styles.header}>
        <button className={styles.backButton}>&#8592; Back</button>
        <h1 className={styles.title}>Add New Address</h1>
      </div>
      <form className={styles.addressForm} onSubmit={handleSave}>
        <div className={styles.inputRow}>
          <div className={styles.inputGroup}>
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <label>Phone Number</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter your phone number"
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <label>Landmark</label>
            <input
              type="text"
              name="landmark"
              value={formData.landmark}
              onChange={handleChange}
              placeholder="Nearby landmark"
              required
            />
          </div>
        </div>

        <div className={styles.inputRow}>
          <div className={styles.inputGroup}>
            <label>Province/Region</label>
            <input
              type="text"
              name="province"
              value={formData.province}
              onChange={handleChange}
              placeholder="Enter your province/region"
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <label>City</label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              placeholder="Enter your city"
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <label>Area Zone</label>
            <input
              type="text"
              name="area"
              value={formData.area}
              onChange={handleChange}
              placeholder="Enter your area zone"
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <label>Full Address</label>
            <textarea
              name="fullAddress"
              value={formData.fullAddress}
              onChange={handleChange}
              placeholder="Enter your full address"
              required
            />
          </div>
        </div>

        <div className={styles.buttonGroup}>
          <button
            type="button"
            onClick={handleCancel}
            className={styles.cancelButton}
          >
            Cancel
          </button>
          <button type="submit" className={styles.saveButton}>
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddressPage;
