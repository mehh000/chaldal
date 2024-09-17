'use client'

import React, { useEffect } from 'react';
import Image from 'next/image';
import cl from './Cart.module.css';
import { useAuth } from '@/Context/AuthProvider';
import { removeFromCart } from '@/service/deleteProduct';
const Cart = () => {
  const { userData, handleGetUser, user } = useAuth();

  // useEffect(() => {
  //   if (userData) {
  //     console.log('User data from cart page:', userData);
  //   }
  // }, [userData]); // Add userData as a dependency to update when it changes

  // Calculate total items and total price
  const totalItems = userData?.cartList?.reduce((sum, item) => sum + item.quantity, 0) || 0;
  const totalPrice = userData?.cartList?.reduce((sum, item) => sum + item.price * item.quantity, 0) || 0;
  const deliveryPrice = 20; // Assuming a flat delivery price


  const hanleRemoveCartItem = async (productID) => {
    try {
      await removeFromCart(user.uid, productID);
      handleGetUser();
    } catch (error) {
      console.log('cant remove', error);
    }
  }

  return (
    <div className={cl.cart_container}>
      <div className={cl.cart_header}>
        <h1>Shopping Cart</h1>
      </div>
      <div className={cl.cart_body}>
        <div className={cl.cart_items}>
          {userData?.cartList?.length > 0 ? (
            userData.cartList.map((item) => (
              <div key={item.id} className={cl.cart_item}>
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
        <div className={cl.summary_container}>
          <div className={cl.summary_item}>
            <span>Total Items:</span>
            <span>{totalItems}</span>
          </div>
          <div className={cl.summary_item}>
            <span>Total Price:</span>
            <span>${totalPrice}</span>
          </div>
          <div className={cl.summary_item}>
            <span>Delivery Price:</span>
            <span>${deliveryPrice}</span>
          </div>
          <div className={cl.summary_total}>
            <span>Grand Total:</span>
            <span>${totalPrice + deliveryPrice}</span>
          </div>
          <button className={cl.checkout_button}>Checkout</button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
