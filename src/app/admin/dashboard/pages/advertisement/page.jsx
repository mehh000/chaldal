"use client";

import React, { useEffect, useState } from 'react';
import { FaTrash } from 'react-icons/fa';
import cl from './style.module.css';
import { uploadImage, addHeroImage, gethero } from '@/service/dynaminhero';
import Image from 'next/image';

function Advertisement() {
  const [images, setImages] = useState([]);
  const [title, setTitle] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch hero images from Firestore
  useEffect(() => {
    const fetchHeroData = async () => {
      try {
        const heroData = await gethero();
        console.log("Fetched hero data: ", heroData); // Check if data is being fetched
        setImages(heroData);
      } catch (error) {
        console.error("Error fetching hero data: ", error);
      }
    };

    // Call fetchHeroData only once on initial render
    fetchHeroData();
  }, []);
  

  // Handle image upload
  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!imageFile || !title) return;

    setLoading(true); // Start loading indicator
    try {
      const imageUrl = await uploadImage(imageFile);
      const newImage = { title, url: imageUrl };
      await addHeroImage(newImage);

      // Add the new image to the local state
      setImages([...images, { ...newImage, id: Date.now() }]);
      setTitle('');
      setImageFile(null);
    } catch (error) {
      console.error('Error uploading image:', error.message);
    } finally {
      setLoading(false); // Stop loading indicator
    }
  };

  // Handle image delete locally (not removing from Firestore)
  const handleDelete = (id) => {
    setImages(images.filter((image) => image.id !== id));
  };

  return (
    <div className={cl.container}>
      <form onSubmit={handleSubmit} className={cl.uploadForm}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter image title"
          className={cl.input}
        />
        <input type="file" onChange={handleImageChange} className={cl.fileInput} />
        <button type="submit" className={cl.submitBtn} disabled={loading}>
          {loading ? 'Uploading...' : 'Upload Image'}
        </button>
      </form>

      <div className={cl.imageGrid}>
        {images.length === 0 ? (
          <p>No images available</p>
        ) : (
          images.map((image) => (
            <div key={image.id} className={cl.card}>
              <Image
                src={image.url}
                alt={image.title}
                width={600}
                height={300}
                content='cover'
                className={cl.image}
              />
              <div className={cl.cardFooter}>
                <span className={cl.title}>{image.title}</span>
                <button className={cl.deleteBtn} onClick={() => handleDelete(image.id)}>
                  <FaTrash />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Advertisement;
