// services/userService.js

import { db,auth  } from '@/db/firebase'; // Ensure this points to your Firestore instance
import { doc, deleteDoc } from 'firebase/firestore';
import {  deleteUser } from 'firebase/auth';

// Function to delete user account and Firestore data
export const deleteUserAccount = async () => {
  const user = auth.currentUser;

  if (!user) {
    throw new Error('No user is signed in');
  }

  const userId = user.uid;

  try {
    // Delete Firestore user data
    const userDocRef = doc(db, 'users', userId); // Adjust 'users' if your collection name is different
    await deleteDoc(userDocRef);

    // Delete user authentication account
    await deleteUser(user);
    console.log('Account successfully deleted');
  } catch (error) {
    throw new Error(`Error deleting account: ${error.message}`);
  }
};
