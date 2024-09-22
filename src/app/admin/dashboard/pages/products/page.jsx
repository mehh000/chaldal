
'use client'

import ProductCard from '@/components/productcard/ProductCard'
import React, { useEffect, useState } from 'react'
import cl from './Products.module.css'
import Link from 'next/link';
import { getAllProducts } from '@/service/getproducts';
import { deleteProduct } from '@/service/deleteProductdb';

function Products() {
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('all');

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      const productsData = await getAllProducts();
      setProducts(productsData);
      console.log(
        productsData
      );
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    await deleteProduct(id);
    fetchProducts();
    console.log('geting', id);
  }


  if (loading) {
    return <p>Loading products...</p>;
  }

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  return (
    <div className={cl.container}>
      <div className={cl.controls}>
        {/* Dropdown for Categories */}
        <select className={cl.select} value={category} onChange={handleCategoryChange}>
          <option value="all">All Products</option>
          <option value="milk">Milk</option>
          <option value="vegetables">Vegetables</option>
        </select>

        {/* Search Input */}
        <input
          type="text"
          placeholder="Search products..."
          className={cl.search}
          value={searchTerm}
          onChange={handleSearchChange}
        />

        {/* Add Product Button */}
        <Link href={'/admin/dashboard/pages/products/addproduct'} >
          <button className={cl.addBtn}>Add Product</button>
        </Link>
      </div>

      {/* Responsive Product List */}
      <div className={cl.productList}>


        {products.map(product => (
          <ProductCard key={product.id} product={product} handleDelete={handleDelete} />
        ))}


        {/* Add more <ProductCard /> components as needed */}
      </div>
    </div>
  );
}

export default Products;
