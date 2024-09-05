import React from 'react';
import cl from './style.module.css';
import Image from 'next/image';
import Link from 'next/link';

function Card() {
  return (
    <div className={cl.card_container}>
      <Image src={'/alu.png'} height={350} width={200} alt='product' className={cl.product_image} />
      
      <div className={cl.card_info}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum, temporibus.
      </div>
      
      <div className={cl.price_container}>
        <p className={cl.price}>Taka 170</p>
        <p className={cl.discount}>10% off</p>
      </div>
      
    <Link href={'/product-detail'}><button className={cl.addtocart_btn}>Viwe to buy</button> </Link> 
    </div>
  );
}

export default Card;
