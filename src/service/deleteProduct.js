import { doc, updateDoc, arrayRemove, getDoc } from "firebase/firestore";
import { db } from '@/db/firebase'; // Ensure this points to your Firestore instance

// Service to remove a product from the user's cart
export const removeFromCart = async (userId, productID) => {
  try {
    // Reference to the user's document in Firestore
    const userDocRef = doc(db, "users", userId);

    // Get the user's document to find the matching item in the cartList
    const userDocSnapshot = await getDoc(userDocRef);
    
    if (!userDocSnapshot.exists()) {
      throw new Error('User not found');
    }

    const userData = userDocSnapshot.data();
    const cartList = userData.cartList || [];

    // Find the item in the cartList that matches the given productID
    const productToRemove = cartList.find(item => item.productID === productID);

    if (!productToRemove) {
      throw new Error('Product not found in cart');
    }

    // Remove the found product from the user's cartList
    await updateDoc(userDocRef, {
      cartList: arrayRemove(productToRemove)
    });

    console.log("Product removed from cart successfully.");
  } catch (error) {
    console.error("Error removing product from cart: ", error.message);
    throw new Error("Unable to remove product from cart.");
  }
};
