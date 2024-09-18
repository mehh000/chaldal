import { doc, updateDoc, arrayUnion } from 'firebase/firestore';
import { db } from '@/db/firebase'; // Import your Firebase config

/**
 * Add a new address to the user's addressList array in Firestore
 * @param {string} userId - The ID of the current user
 * @param {object} addressData - The address data to be added
 */
export const addAddressToUser = async (userId, addressData) => {
  try {
    const userDocRef = doc(db, 'users', userId); // Reference to the user's document

    // Update the user's addressList array by adding a new address
    await updateDoc(userDocRef, {
      addressList: arrayUnion(addressData),
    });

    console.log('Address added successfully!');
  } catch (error) {
    console.error('Error adding address: ', error);
  }
};
