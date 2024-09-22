// services/userService.js
import { storage, db } from '@/db/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { doc, updateDoc } from 'firebase/firestore';

// Function to upload image to Firebase Storage
const uploadImage = async (file, userId) => {
  if (!file) return null;

  const storageRef = ref(storage, `profileImages/${userId}`);
  const snapshot = await uploadBytes(storageRef, file);
  const downloadURL = await getDownloadURL(snapshot.ref);
  return downloadURL;
};

// Function to update user details
const updateUserProfile = async (userId, name, phoneNumber, file) => {
  try {
    const imageUrl = file ? await uploadImage(file, userId) : null;

    // Create a reference to the user document in Firestore
    const userRef = doc(db, 'users', userId);

    // Update user data in Firestore
    await updateDoc(userRef, {
      name: name,
      phoneNumber: phoneNumber,
      imageUrl: imageUrl, // If image uploaded, store the new imageUrl
    });

    return { success: true, message: 'Profile updated successfully' };
  } catch (error) {
    console.error('Error updating profile:', error);
    return { success: false, message: 'Error updating profile' };
  }
};

export { updateUserProfile };
