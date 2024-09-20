'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import cl from './Cart.module.css';
import { useAuth } from '@/Context/AuthProvider';
import { removeFromCart } from '@/service/deleteProduct';
import Link from 'next/link';

const Cart = () => {
  const { userData, handleGetUser, user,  setDeliveryProducts } = useAuth();

  const [selectedItem, setSelectedItem] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState([]);
  const [selectedProductPrice, setSelectedProductPrice] = useState([]);



  // Calculate total price
  const totalPrice = selectedProductPrice.reduce((sum, price) => sum + Number(price), 0);




  const deliveryPrice = 20; // Assuming a flat delivery price

  // Handle removing item from the cart
  const handleRemoveCartItem = async (productID) => {
    try {
      await removeFromCart(user.uid, productID);
      handleGetUser();
    } catch (error) {
      console.log('Cannot remove', error);
    }
  };

  // Handle checkbox toggle for item selection
  const handleCheckbox = (itemId, productID, productPrice, item) => {
    if (selectedItem.includes(itemId)) {
      // Remove from selected items and state
      setSelectedItem(selectedItem.filter(id => id !== itemId));
      setSelectedProduct(selectedProduct.filter(id => id !== productID));
      setSelectedProductPrice(selectedProductPrice.filter(price => price !== productPrice));

      // Remove the product from deliveryProducts.items
      setDeliveryProducts(prevState => ({
        ...prevState,
        items: prevState.items.filter(deliveryItem => deliveryItem.productID !== item.productID), // Corrected removal logic
      }));
      // Remove the product from deliveryProducts.items
      // setDeliveryProducts(prevState => {
      //   if (!prevState || !prevState.items) {
      //     return prevState; // Return the original state if deliveryProducts is invalid
      //   }

      //   return {
      //     ...prevState,
      //     items: prevState.items.filter(deliveryItem => deliveryItem.productID !== item.productID),
      //   };
      // });
    } else {
      // Add to selected items and state
      setSelectedItem([...selectedItem, itemId]);
      setSelectedProduct([...selectedProduct, productID]);
      setSelectedProductPrice([...selectedProductPrice, productPrice]);

 

      // Add product to deliveryProducts.items
  setDeliveryProducts(prevState => ({
        ...prevState,
        items: [...prevState.items, item], // Add new item to the items array
       
        deliveryPrice: deliveryPrice // Update deliveryPrice
      }));


    }
  };


  // Log changes in selected items (optional)
  // useEffect(() => {
  //   console.log('Updated selected items', selectedItem);
  //   console.log('Updated selected products', selectedProduct);
  //   console.log('Updated selected product prices', selectedProductPrice);
  //   console.log('Updated selected product deliveryProducts', deliveryProducts);
  // }, [selectedItem, selectedProduct, selectedProductPrice,deliveryProducts]);
const handlepay=()=>{
  setDeliveryProducts(prevState => ({
    ...prevState,
  
    totalPrice: totalPrice, // Update totalPrice
   
  }));
}

  return (
    <div className={cl.cart_container}>
      <div className={cl.cart_header}>
        <h1>Shopping Cart</h1>
        <p>{totalPrice}</p>
      </div>

      <div className={cl.cart_body}>
        <div className={cl.cart_items}>
          <div className="p-2 w-full bg-slate-200"></div>

          {userData?.cartList?.length > 0 ? (
            userData.cartList.map((item, i) => (
              <div key={item.id} className={cl.cart_item}>
                <input
                  type="checkbox"
                  id={`checkbox-${item.productID}`} // Unique ID for each checkbox
                  checked={selectedItem.includes(i)} // Check if productID is in selected items
                  onChange={() => handleCheckbox(i, item.productID, item.price, item)}
                  className={cl.cheakbox}
                />
                <Image
                  src={item.imageURL}
                  alt={item.name}
                  width={150}
                  height={150}
                  className={cl.cart_item_image}
                />
                <div className={cl.cart_item_info}>
                  <div className={cl.cart_item_name}>{item.name}</div>

                  {/* Product details */}
                  <div className="flex flex-col gap-1">
                    <h3>{item.description}</h3>
                    <h3>{item.price}</h3>
                    <h3>{item.kg}</h3>
                  </div>

                  {/* Remove button */}
                  <div className="flex items-center justify-center p-3 bg-red-400 rounded-md cursor-pointer hover:bg-red-700" onClick={() => handleRemoveCartItem(item.productID)}>
                    <p className="font-bold text-white">Delete</p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <Image src={'/loading.gif'} height={150} width={150} alt='loading' />
          )}
        </div>

        {/* Summary section */}
        <div className="flex flex-col gap-2 h-fit">
          <div className={cl.summary_container}>
            <div className={cl.summary_item}>
              <span>Total Items:</span>
              <span>{selectedItem.length}</span>
            </div>
            <div className={cl.summary_item}>
              <span>Total Price:</span>
              <span>Taka: {totalPrice}</span>
            </div>
            <div className={cl.summary_item}>
              <span>Delivery Price:</span>
              <span>Taka: {deliveryPrice}</span>
            </div>
            <div className={cl.summary_total}>
              <span>Total Taka:</span>
              <span>{totalPrice + deliveryPrice}</span>
            </div>

            <Link href={'/cheakout'}>
              <button onClick={handlepay} className={cl.checkout_button}>Checkout</button>
            </Link>
          </div>

          {/* Address section */}
          <div className="h-5 p-4 w-full bg-slate-100 rounded-lg flex items-center justify-center">
            Address
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
