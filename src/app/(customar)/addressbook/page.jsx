'use client'


// components/AddressPage.js
import React, { useState } from 'react';
import styles from './AddressPage.module.css';

const AddressPage = () => {
  // Initial state for the address form
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

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form reset
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

  // Handle form submission
  const handleSave = () => {
    console.log('Saved Data:', formData);
  };

  return (
    <div className={styles.addressContainer}>
      <div className={styles.header}>
        <button className={styles.backButton}>&#8592; Back</button>
        <h1 className={styles.title}>Add New Address</h1>
      </div>
      <form className={styles.addressForm}>
        {/* Input fields */}
        <div className={styles.inputGroup}>
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your name"
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
          />
        </div>

        <div className={styles.inputGroup}>
          <label>Province/Region</label>
          <input
            type="text"
            name="province"
            value={formData.province}
            onChange={handleChange}
            placeholder="Enter your province/region"
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
          />
        </div>

        <div className={styles.inputGroup}>
          <label>Full Address</label>
          <textarea
            name="fullAddress"
            value={formData.fullAddress}
            onChange={handleChange}
            placeholder="Enter your full address"
          />
        </div>

        {/* Buttons */}
        <div className={styles.buttonGroup}>
          <button type="button" onClick={handleCancel} className={styles.cancelButton}>
            Cancel
          </button>
          <button type="button" onClick={handleSave} className={styles.saveButton}>
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddressPage;
