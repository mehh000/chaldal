import { doc, updateDoc, arrayUnion } from "firebase/firestore";
import { db } from '@/db/firebase'; // Ensure this points to your Firestore instance

// Service to add a product to the user's cart
export const addToCart = async (userId, productData) => {
  try {
    // Reference to the user's document in Firestore
    const userDocRef = doc(db, "users", userId);

    // Update the user's cartList with the new product data
    await updateDoc(userDocRef, {
      cartList: arrayUnion({
        productID: productData.productID,
        imageURL: productData.imageURL,
        name: productData.name,
        price: productData.price,
        kg: productData.kg,
        quantity: productData.quantity,
      }),
    });

    console.log("Product added to cart successfully.");
  } catch (error) {
    console.error("Error adding product to cart: ", error.message);
    throw new Error("Unable to add product to cart.");
  }
};
