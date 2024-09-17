import React from 'react';
import Image from 'next/image';
import cl from './style.module.css'; // Importing the CSS module
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { FaEye } from "react-icons/fa";

function ProductCard({product}) {
    return (
        <div className={cl.container}>
            {/* Product Image */}
          <Image src={product.imageUrl} height={110} width={150} alt='product' className={cl.productImage} />

            {/* Product Name */}
            <h1 className={cl.productName}>
            {product.name}
            </h1>

            {/* Price and Discount Section */}
            <div className={cl.priceContainer}>
                <p className={cl.price}>taka {product.price}</p>
                <p className={cl.discount}>{product.discount}% Off</p>
                <p className={cl.discountPrice}>0</p>
            </div>

            {/* Action Buttons */}
            <div className={cl.actionContainer}>
                <button className={cl.buyBtn}>
                    <FaEye />
                </button>
                <button className={cl.editBtn}>
                    <FaRegEdit />
                </button>
                <button className={cl.deleteBtn}>
                    <MdDeleteForever />
                </button>
            </div>
        </div>
    );
}

export default ProductCard;
