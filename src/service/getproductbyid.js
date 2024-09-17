import { doc, getDoc } from "firebase/firestore";
import { db } from '@/db/firebase'; // Ensure you have your Firebase initialized

// Function to get product data by ID from the 'products' collection
export const getProductById = async (productId) => {
  try {
    // Reference to the product document in Firestore
    const productRef = doc(db, "products", productId);

    // Fetch the document
    const productDoc = await getDoc(productRef);

    // Check if the document exists
    if (!productDoc.exists()) {
      throw new Error(`No product found with id: ${productId}`);
    }

    // Return the product data
    return { id: productDoc.id, ...productDoc.data() };
  } catch (error) {
    console.error("Error fetching product data: ", error);
    throw new Error("Unable to fetch product.");
  }
};
