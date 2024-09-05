'use client'


import React, { useState } from 'react';
import cl from './style.module.css';
import Image from 'next/image';

function ProductDetail() {
  const [weight, setWeight] = useState(0);
  const [priceBeforeDiscount, setPriceBeforeDiscount] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  const pricePerKg = 100; // Price per kilogram
  const discountPercentage = 10; // Discount percentage

  const handleWeightChange = (e) => {
    const inputWeight = parseInt(e.target.value);
    if (isNaN(inputWeight) || inputWeight <= 0) {
      setWeight(0);
      setPriceBeforeDiscount(0);
      setTotalPrice(0);
    } else {
      setWeight(inputWeight);
      const priceBefore = (pricePerKg / 1000) * inputWeight;
      const discountAmount = (priceBefore * discountPercentage) / 100;
      const priceAfter = priceBefore - discountAmount;
      setPriceBeforeDiscount(priceBefore.toFixed(2));
      setTotalPrice(priceAfter.toFixed(2));
    }
  };

  const displayWeight = weight >= 1000 ? `${(weight / 1000).toFixed(2)} kg` : `${weight} g`;

  return (
    <div className={cl.container}>
      <div className={cl.product_container}>
        <div className={cl.image_container}>
          <Image
            src={'/alu.png'}
            height={500}
            width={500}
            alt='Product'
            className={cl.product_image}
          />
        </div>

        <div className={cl.product_info_container}>
          <h2 className={cl.product_name}>Premium Product Name</h2>
          <p className={cl.product_details}>
            This is a premium product description, crafted to highlight the best features and
            benefits. Ideal for your everyday needs.
          </p>

          <div className={cl.price_container}>
            <p className={cl.price}>Price per kg: Taka {pricePerKg}</p>
            <p className={cl.discount}>Discount: {discountPercentage}%</p>
          </div>

          <div className={cl.quantity_container}>
            <div className={cl.net_weight_of_product_container}>
              <span className={cl.weight_label}>Enter Quantity (in grams):</span>
              <input
                type="number"
                className={cl.input}
                placeholder='Enter grams'
                onChange={handleWeightChange}
                min={0}
              />
              <span className={cl.amount_display}>{displayWeight}</span>
            </div>
          </div>

          {totalPrice > 0 && (
            <div className={cl.total_price_container}>
              <span className={cl.total_price_label}>Total Price:</span>
              <span className={cl.total_price_original}>Taka {priceBeforeDiscount}</span>
              <span className={cl.total_price_discounted}>Taka {totalPrice}</span>
            </div>
          )}

          <button className={cl.add_to_cart_btn}>Add to Cart</button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
