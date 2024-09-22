import { db } from '@/db/firebase'; // Import your Firebase configuration
import { doc, deleteDoc } from 'firebase/firestore';

/**
 * Deletes a product from the Firestore database using its ID.
 * @param {string} productId - The ID of the product to delete.
 * @returns {Object} - Returns a success message or an error message.
 */
export const deleteProduct = async (productId) => {
  try {
    const productRef = doc(db, 'products', productId);
    await deleteDoc(productRef);
    return { success: true, message: 'Product successfully deleted.' };
  } catch (error) {
    console.error('Error deleting product:', error);
    return { success: false, message: 'Error deleting product. Please try again.' };
  }
};
