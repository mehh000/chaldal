import React from 'react';
import cl from './style.module.css';
import Image from 'next/image';
import Link from 'next/link';

function Card({ product }) {

  return (
    <div className={cl.card_container}>
      <Image src={product.imageUrl} height={350} width={200} alt='product' className={cl.product_image} />

      <div className={cl.card_info}>
        {product.name}
      </div>

      <div className={cl.price_container}>
        <p className={cl.price}>Taka {product.price}</p>
        <p className={cl.discount}>{product.discount} %5 off</p>
      </div>

      <Link href={`/productpage/${product.id}`}>
      <button className={cl.addtocart_btn}>Viwe to buy</button> </Link>
    </div>
  );
}

export default Card;
