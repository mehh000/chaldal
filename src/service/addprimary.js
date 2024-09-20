import { doc, updateDoc } from 'firebase/firestore';
import { db } from '@/db/firebase'; // Import your custom Firestore instance

/**
 * Replace the primaryAddress array in the user's document with a new address.
 * @param {string} userId - The user ID (UID) of the user whose document needs to be updated.
 * @param {Object} newAddress - The new address object to replace the user's primaryAddress array.
 */
export const addToPrimaryAddress = async (userId, newAddress) => {
  try {
    if (!userId) {
      throw new Error('User ID is required.');
    }

    // Reference to the user's document in the users collection
    const userDocRef = doc(db, 'users', userId);

    // Update the user's document by replacing the primaryAddress array with the new address
    await updateDoc(userDocRef, {
      primaryAddress: [newAddress], // Replace the entire array with the new address
    });

    console.log('Address replaced in primaryAddress successfully');
  } catch (error) {
    console.error('Error replacing address in primaryAddress:', error);
  }
};
