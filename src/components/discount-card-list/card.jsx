import React from 'react';
import Image from 'next/image';
import cl from './style.module.css';

const HotDealCard = () => {
  return (
    <div className={cl.card_container}>
      <div className={cl.image_wrapper}>
        <Image src={'/alu.png'} height={300} width={300} alt="Hot Deal" className={cl.product_image} />
        <div className={cl.hot_deal_message}>Hot Deal 25% OFF</div>
      </div>
      <div className={cl.card_info}>
        <p className={cl.product_title}>Product Title</p>
        <div className={cl.price_container}>
          <p className={cl.price}>$10.99</p>
          <p className={cl.discount_price}>$8.99</p>
        </div>
        <div className={cl.addtocartbtn}>View to Buy</div>
      </div>
    </div>
  );
};

export default HotDealCard;
