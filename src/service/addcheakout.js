import { doc, updateDoc, arrayUnion } from 'firebase/firestore';
import { db } from '@/db/firebase'; // Import your custom Firestore instance

/**
 * Add a new checkout item to the checkoutList array in the user's document.
 * @param {string} userId - The user ID (UID) of the user whose document needs to be updated.
 * @param {Object} newCheckoutItem - The new checkout item object to add to the user's checkoutList array.
 */
export const addToCheckoutList = async (userId, newCheckoutItem) => {
  try {
    if (!userId) {
      throw new Error('User ID is required.');
    }

    // Reference to the user's document in the users collection
    const userDocRef = doc(db, 'users', userId);

    // Update the user's document by adding the new checkout item using arrayUnion
    await updateDoc(userDocRef, {
      checkoutList: arrayUnion(newCheckoutItem),
    });

    console.log('Checkout item added to checkoutList successfully');
  } catch (error) {
    console.error('Error adding checkout item to checkoutList:', error);
  }
};
