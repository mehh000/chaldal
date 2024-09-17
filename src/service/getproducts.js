// Import Firebase functions
import { db } from '../db/firebase'; // Adjust the import path as necessary

import { collection, getDocs } from "firebase/firestore";

// Function to get all products from Firestore
export const getAllProducts = async () => {
  const productsCollection = collection(db, "products");
  const productsSnapshot = await getDocs(productsCollection);
  const productsList = productsSnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
  return productsList;
};
