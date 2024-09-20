'use client'; // Add this if you are using Next.js with server components

import React from 'react';
import styles from './style.module.css';
import { useAuth } from '@/Context/AuthProvider';
import Link from 'next/link';
import { addToPrimaryAddress } from '@/service/addprimary'; // Adjust the import path if necessary

function ViewAddress() {
  const { userData } = useAuth();

  // Function to handle saving the address
  const handleSaveAddress = async (addressData) => {
   // console.log('From the address view page:', addressData);

    try {
      if (!userData?.uid) {
        throw new Error('User is not authenticated.');
      }

      // Call the service function to add the address to the user's primaryAddress array
      await addToPrimaryAddress(userData.uid, addressData);
      console.log('Address saved successfully!');
    } catch (error) {
      console.error('Error saving address:', error);
    }
  };

  return (
    <div className="w-full flex items-center flex-col p-3">
      <div className={styles.header}>
        <button className={styles.backButton}>&#8592; Back</button>
        <h1 className={styles.title}>Add New Address</h1>

        <Link href={'/addressbook'}>
          <div className="flex cursor-pointer items-center justify-center rounded-lg p-3 bg-slate-500">
            <p className="text-white font-bold">Add Address</p>
          </div>
        </Link>
      </div>

      <div className="flex items-center justify-center flex-wrap gap-4 w-full sm:w-3/4 bg-slate-200 p-2 rounded-lg">
        {/* Display Address Cards */}
        {userData?.addressList?.map((data) => (
          <div key={data.id} className="p-2 bg-white rounded-lg">
            <div className="flex items-center justify-between gap-4">
              <h2 className="text-lg font-bold">{data.name}</h2>
              <button
                onClick={() => handleSaveAddress(data)} 
                className="bg-green-200 hover:bg-green-500 text-white font-bold py-2 px-4 rounded"
              >
                Make Primary
              </button>
            </div>
            <h2>{data.fullAddress}</h2>
            <h2>{data.city}</h2>
            <h2>{data.email}</h2>
            <div className="flex items-center justify-between">
              <p>{data.phone}</p>
              <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ViewAddress;
