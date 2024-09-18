'use client'

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import cl from './Cart.module.css';
import { useAuth } from '@/Context/AuthProvider';
import { removeFromCart } from '@/service/deleteProduct';
import Link from 'next/link';
const Cart = () => {
  const { userData, handleGetUser, user } = useAuth();

  const [selectedItem, setSelectedItem] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState([]);
  const [selectedProductPrice, setSelectedProductPrice] = useState([]);


  // useEffect(() => {
  //   if (userData) {
  //     console.log('User data from cart page:', userData);
  //   }
  // }, [userData]); // Add userData as a dependency to update when it changes

  // Calculate total items and total price
  const totalItems = userData?.cartList?.reduce((sum, item) => sum + item.quantity, 0) || 0;
  const totalPrice = selectedProductPrice.reduce((sum, price) => sum + Number(price), 0);


  const deliveryPrice = 20; // Assuming a flat delivery price


  const hanleRemoveCartItem = async (productID) => {
    try {
      await removeFromCart(user.uid, productID);
      handleGetUser();
    } catch (error) {
      console.log('cant remove', error);
    }
  }

  const handleCheckbox = (itemId, productID, productPrice) => {
    if (selectedItem.includes(itemId)) {
      // Remove itemId from the selectedItem array
      setSelectedItem(selectedItem.filter(id => id !== itemId));
      // Remove productID from the selectedProduct array
      setSelectedProduct(selectedProduct.filter(id => id !== productID));
      // Remove productPrice from the selectedProductPrice array
      setSelectedProductPrice(selectedProductPrice.filter(price => price !== productPrice));
    } else {
      // Add itemId to the selectedItem array
      setSelectedItem([...selectedItem, itemId]);
      // Add productID to the selectedProduct array
      setSelectedProduct([...selectedProduct, productID]);
      // Add productPrice to the selectedProductPrice array
      setSelectedProductPrice([...selectedProductPrice, productPrice]);
    }
  };
  // This will run every time selectedItem updates
  useEffect(() => {
    console.log('Checking updated selectedItem', selectedItem);
    console.log('Checking updated selectedProduct', selectedProduct);
    console.log('Checking updated selectedProductPrice', selectedProductPrice);
  }, [selectedItem, selectedProduct, selectedProductPrice]);



  return (
    <div className={cl.cart_container}>
      <div className={cl.cart_header}>
        <h1>Shopping Cart</h1>
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
                  checked={selectedItem.includes(i)} // Check if productID is in the selectedItem array
                  onChange={() => handleCheckbox(i, item.productID, item.price)}
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
                  {/* product details */}
                  <div className="flex flex-col gap-1">
                    <h3>{item.description}</h3>
                    <h3>{item.price}</h3>
                    <h3>{item.kg}</h3>
                  </div>

                  <div className="flex items-center justify-center p-3 bg-red-400 rounded-md cursor-pointer hover:bg-red-700" onClick={() => hanleRemoveCartItem(item.productID)}>
                    <p className="font-bold text-white">Delete</p>
                  </div>

                </div>
              </div>
            ))
          ) : (
            <Image src={'/loading.gif'} height={150} width={150} alt='loading' />
          )}
        </div>
        <div className="flex flex-col gap-2">
        <div className={cl.summary_container}>
          <div className={cl.summary_item}>
            <span>Total Items:</span>
            <span>{selectedItem?.length}</span>
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
            <span>Grand Total:</span>
            <span>Taka: {totalPrice + deliveryPrice}</span>
          </div>
          <Link href={'/cheakout'} >
            <button className={cl.checkout_button}>Checkout</button>
          </Link>
        </div>

        <div className="h-5 p-4 w-full bg-slate-100 rounded-lg flex items-center justify-center">
          Address
        </div>
        
        </div>
      </div>
    </div>
  );
};

export default Cart;
