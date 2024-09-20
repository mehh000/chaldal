'use client'

import React, { useState } from 'react';
import styles from './AddressPage.module.css';
import { addAddressToUser } from '@/service/addAdress';
import { useAuth } from '@/Context/AuthProvider';
import Link from 'next/link';
import { redirect, useRouter  } from 'next/navigation';

const AddressPage = () => {
  const { user } = useAuth();
  const [viewAddress, setViewAddress] = useState(true)
  const router = useRouter();
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
      status: 'secondary'
    });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (user?.uid) {
      try {
        // Call the service to add the address to the user's addressList
        await addAddressToUser(user.uid, formData);
       // console.log('Address saved:', formData);
        router.push('/viewaddress');
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
        {
          viewAddress ?
          <Link href={'/viewaddress'}>   <div className="flex cursor-pointer items-center justify-center rounded-lg p-3 bg-slate-500 ">
              <p className="text-white font-bold">
                View Address
              </p>
            </div></Link> 
            :
            <Link href={'/viewaddress'}>     <div className="flex cursor-pointer items-center justify-center rounded-lg p-3 bg-blue-500 ">
              <p className="text-white font-bold">
                Add Address
              </p>
            </div></Link> 
        };

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
