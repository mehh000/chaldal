// services/firebaseService.js
import { storage, db } from '@/db/firebase'; // Import from your config file
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, addDoc } from 'firebase/firestore';

export const uploadImage = async (imageFile) => {
  try {
    const storageRef = ref(storage, `/products/${imageFile.name}`);
    await uploadBytes(storageRef, imageFile);
    const url = await getDownloadURL(storageRef);
    return url;
  } catch (error) {
    console.error("Error uploading image:", error);
    throw new Error("Image upload failed");
  }
};

export const addProduct = async (productData) => {
  try {
    const productsRef = collection(db, 'products');
    await addDoc(productsRef, productData);
  } catch (error) {
    console.error("Error adding product:", error);
    throw new Error("Product addition failed");
  }
};
