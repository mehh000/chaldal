'use client';

import React, { useState } from 'react';
import cl from './style.module.css';
import { uploadImage, addProduct } from '@/service/addproduct'; // Import Firebase service functions

function AddProduct() {
  const [image, setImage] = useState(null);
  const [productData, setProductData] = useState({
    name: '',
    description: '',
    price: '',
    discount: '',
    quantity: '',
    gram: '',
    availableKg: '',
    availableQuantity: '',
    deliveryFee: '',
    brand: '',
    categories: [],
    comments: [],
    createdat: Date.now(),
    imageUrl: ''
  });
  const [loading, setLoading] = useState(false); // Add loading state

  const categoryOptions = ['Vegetable', 'Meat', 'Soft Drinks', 'Snacks', 'Fruits', 'Milk', 'Desserts', 'Daily Use', 'Hot Deals'];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductData({
      ...productData,
      [name]: value
    });
  };

  const handleImageUpload = (e) => {
    setImage(e.target.files[0]);
  };

  const handleCategoryChange = (e) => {
    const { value, checked } = e.target;
    const updatedCategories = checked
      ? [...productData.categories, value]
      : productData.categories.filter((category) => category !== value);

    setProductData({
      ...productData,
      categories: updatedCategories
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image) {
      alert("Please select an image!");
      return;
    }

    setLoading(true); // Set loading true during the upload process

    try {
      // Upload the image and get the URL
      const imageUrl = await uploadImage(image);

      // Add the image URL to productData
      const productWithImage = {
        ...productData,
        imageUrl
      };

      // Save product data to Firestore
      await addProduct(productWithImage);

      alert("Product added successfully!");

      // Reset form and state after submission
      setProductData({
        name: '',
        description: '',
        price: '',
        discount: '',
        quantity: '',
        gram: '',
        availableKg: '',
        availableQuantity: '',
        deliveryFee: '',
        brand: '',
        categories: [],
        comments: [],
        createdat: Date.now(),
        imageUrl: ''
      });
      setImage(null);
    } catch (error) {
      console.error("Error uploading image or saving product:", error);
    } finally {
      setLoading(false); // Set loading false after process completes
    }
  };

  return (
    <div className={cl.container}>
      <form onSubmit={handleSubmit} className={cl.form}>
        <h1 className={cl.title}>Add New Product</h1>

        {/* Image Input */}
        <div className={cl.formGroup}>
          <label htmlFor="image" className={cl.label}>Product Image:</label>
          <input type="file" id="image" onChange={handleImageUpload} className={cl.input} required />
        </div>

        {/* Product Name */}
        <div className={cl.formGroup}>
          <label htmlFor="name" className={cl.label}>Name:</label>
          <input type="text" id="name" name="name" value={productData.name} onChange={handleInputChange} className={cl.input} required />
        </div>

        {/* Product Description */}
        <div className={cl.formGroup}>
          <label htmlFor="description" className={cl.label}>Description:</label>
          <textarea id="description" name="description" value={productData.description} onChange={handleInputChange} className={cl.textarea} required />
        </div>

        {/* Price */}
        <div className={cl.formGroup}>
          <label htmlFor="price" className={cl.label}>Price:</label>
          <input type="number" id="price" name="price" value={productData.price} onChange={handleInputChange} className={cl.input} required />
        </div>

        {/* Discount */}
        <div className={cl.formGroup}>
          <label htmlFor="discount" className={cl.label}>Discount (%):</label>
          <input type="number" id="discount" name="discount" value={productData.discount} onChange={handleInputChange} className={cl.input} />
        </div>

        {/* Available Quantity */}
        <div className={cl.formGroup}>
          <label htmlFor="availableQuantity" className={cl.label}>Available Quantity:</label>
          <input type="number" id="availableQuantity" name="availableQuantity" value={productData.availableQuantity} onChange={handleInputChange} className={cl.input} />
        </div>

        {/* Available Kg */}
        <div className={cl.formGroup}>
          <label htmlFor="availableKg" className={cl.label}>Available Kg:</label>
          <input type="number" id="availableKg" name="availableKg" value={productData.availableKg} onChange={handleInputChange} className={cl.input} />
        </div>

        {/* Delivery Fee */}
        <div className={cl.formGroup}>
          <label htmlFor="deliveryFee" className={cl.label}>Delivery Fee:</label>
          <input type="number" id="deliveryFee" name="deliveryFee" value={productData.deliveryFee} onChange={handleInputChange} className={cl.input} required />
        </div>

        {/* Brand */}
        <div className={cl.formGroup}>
          <label htmlFor="brand" className={cl.label}>Brand:</label>
          <input type="text" id="brand" name="brand" value={productData.brand} onChange={handleInputChange} className={cl.input} />
        </div>

        {/* Categories (checkboxes for multiple selection) */}
        <div className={cl.formGroup}>
          <label className={cl.label}>Categories:</label>
          <div className={cl.checkboxGroup}>
            {categoryOptions.map((category, index) => (
              <div key={index} className={cl.checkbox}>
                <input
                  type="checkbox"
                  id={`category-${index}`}
                  value={category}
                  checked={productData.categories.includes(category)}
                  onChange={handleCategoryChange}
                />
                <label htmlFor={`category-${index}`}>{category}</label>
              </div>
            ))}
          </div>
        </div>

        {/* Quantity or Gram (checkboxes) */}
        <div className={cl.formGroup}>
          <label className={cl.label}>Quantity or Gram:</label>
          <div className={cl.checkboxGroup}>
            <div className={cl.checkbox}>
              <input
                type="checkbox"
                id="quantity"
                name="quantity"
                checked={productData.quantity}
                onChange={() => setProductData({ ...productData, quantity: !productData.quantity })}
              />
              <label htmlFor="quantity">Quantity</label>
            </div>
            <div className={cl.checkbox}>
              <input
                type="checkbox"
                id="gram"
                name="gram"
                checked={productData.gram}
                onChange={() => setProductData({ ...productData, gram: !productData.gram })}
              />
              <label htmlFor="gram">Gram</label>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <button type="submit" className={cl.submitButton} disabled={loading}>
          {loading ? 'Uploading...' : 'Add Product'}
        </button>
      </form>
    </div>
  );
}

export default AddProduct;
