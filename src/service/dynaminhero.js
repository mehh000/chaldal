import { storage, db } from '../db/firebase'; // Adjust the import path as necessary
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { addDoc, collection } from "firebase/firestore";
import {  getDocs } from "firebase/firestore";

// Function to handle image upload
export const uploadImage = async (image) => {
  if (!image) throw new Error("No image provided");

  const storageRef = ref(storage, `hero/${image.name}`); // Store image in 'hero' folder in Firebase Storage
  await uploadBytes(storageRef, image);
  return await getDownloadURL(storageRef); // Get the download URL after uploading
};

// Function to add image data (title and URL) to Firestore
export const addHeroImage = async (imageData) => {
  await addDoc(collection(db, "hero"), imageData); // Adds to 'hero' collection in Firestore
};


// get all the hero data

// Fetch all documents from the 'hero' collection

export const gethero = async () => {
    try {
      const heroRef = collection(db, "hero");
      const querySnapshot = await getDocs(heroRef);
  
      // Process the querySnapshot data to extract relevant information
      const heroData = querySnapshot.docs.map((doc) => doc.data());
  
      // Return the processed hero data
      return heroData;
    } catch (error) {
      console.error("Detailed Error: ", error); // Log full error object
      throw new Error("Unable to fetch hero data service."); // Keep the error for UI feedback
    }
  };
  