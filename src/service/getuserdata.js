import { db } from '../db/firebase'; // Adjust the import path based on your structure
import { collection, getDocs } from 'firebase/firestore';

// Function to fetch all users' data
export const getAllUsers = async () => {
  try {
    const usersCollection = collection(db, 'users');
    const usersSnapshot = await getDocs(usersCollection);
    
    // Create an array of user data along with their UID
    const usersList = usersSnapshot.docs.map((doc) => ({
      uid: doc.id, // Get the document ID as the UID
      ...doc.data() // Spread the user data
    }));
    
    return usersList; // Return the array of users
  } catch (error) {
    console.error("Error fetching users data: ", error);
    throw new Error("Unable to fetch users.");
  }
};
