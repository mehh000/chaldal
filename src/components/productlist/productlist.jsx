'use client'

import React, { useEffect, useState } from 'react';
import cl from './style.module.css';
import Card from './card';
import { getAllProducts } from '@/service/getproducts';

function ProductList() { 
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsData = await getAllProducts();
        setProducts(productsData);
        // console.log(
        //   productsData
        // );
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);
  return (
    <>

      <h1 className='text-3xl text-center font-bold sm:text-5xl' >New Products</h1>
      <div className={cl.list_container}>
      

        {products.map(product => (
          <Card key={product.id} product={product}  />
        ))}

      </div>    </>
  );
}

export default ProductList;
