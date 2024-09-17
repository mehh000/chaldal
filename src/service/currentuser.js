import { db } from '@/db/firebase'; // Adjust the import path based on your structure
import { doc, getDoc } from 'firebase/firestore';

// Function to fetch the current user's data
export const getCurrentUserData = async (uid) => {
  try {
    if (!uid) throw new Error("No user ID provided.");

    // Reference to the specific user's document in the 'users' collection
    const userDocRef = doc(db, 'users', uid);
    
    // Fetch the document for the current user
    const userDocSnapshot = await getDoc(userDocRef);
    
    // Check if the user exists in the database
    if (userDocSnapshot.exists()) {
      // Return the user data along with the UID
      return { uid: userDocSnapshot.id, ...userDocSnapshot.data() };
    } else {
      throw new Error("User not found.");
    }
  } catch (error) {
    console.error("Error fetching current user's data:", error);
    throw new Error("Unable to fetch current user's data.");
  }
};
