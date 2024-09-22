'use client';

import React, { useEffect, useState } from 'react';
import { FaSearch, FaFilter } from 'react-icons/fa';
import cl from './Search.module.css';
import { getAllProducts } from '@/service/getproducts';
import Card from '@/components/productlist/card';
import Loading from '@/app/loading';

function Search({ params }) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [minPrice, setMinPrice] = useState(''); // State for min price
  const [maxPrice, setMaxPrice] = useState(''); // State for max price
  const [loading, setLoading] = useState(true);


  const categorie = params.categories
  const categories = categorie || 'all';
  //console.log(params.categories);
  // Function to toggle drawer
  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsData = await getAllProducts();
        setProducts(productsData);
  
        // Check if the category exists in the array and filter products accordingly
        if (categories !== 'all') {
          const validProducts = productsData.filter(product =>
            product.categories.some(cat => cat.toLowerCase() === categories.toLowerCase())
          );
          setFilteredProducts(validProducts);
        } else {
          setFilteredProducts(productsData); // If 'all', show all products
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchProducts();
  }, [categories]); // Refetch products when the category changes

  // Handle search input change
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    filterProducts(e.target.value, minPrice, maxPrice, categories);
  };

  // Handle min price input change
  const handleMinPriceChange = (e) => {
    const value = e.target.value;
    setMinPrice(value);
    filterProducts(searchTerm, value, maxPrice, categories);
  };

  // Handle max price input change
  const handleMaxPriceChange = (e) => {
    const value = e.target.value;
    setMaxPrice(value);
    filterProducts(searchTerm, minPrice, value, categories);
  };

  // Function to filter products based on search term, price range, and category
  const filterProducts = (searchTerm, minPrice, maxPrice, categories) => {
    let filtered = products;



    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by price range
    if (minPrice) {
      filtered = filtered.filter(product => product.price >= Number(minPrice));
    }

    if (maxPrice) {
      filtered = filtered.filter(product => product.price <= Number(maxPrice));
    }

    setFilteredProducts(filtered);
  };

  return (
    <div className={cl.search_container}>
      {/* Search Bar */}
      <div className={cl.search_bar}>
        <input
          type="text"
          placeholder="Search products..."
          className={cl.search_input}
          value={searchTerm}
          onChange={handleSearch} // Attach the handler to search input
        />
        <button className={cl.search_icon}>
          <FaSearch />
        </button>
        <button className={cl.filter_icon} onClick={toggleDrawer}>
          <FaFilter />
        </button>
      </div>

      {/* Side Drawer for Filters */}
      <div className={`${cl.side_drawer} ${drawerOpen ? cl.open : ''}`}>
        <div className={cl.drawer_content}>
          <h3>Filter Options</h3>

          {/* Price Filter Box */}
          <div className={cl.filter_box}>
            <h4>Filter by Price</h4>
            <div className={cl.price_input_container}>
              <div className={cl.price_input}>
                <label>Min Price (Taka)</label>
                <input
                  type="number"
                  placeholder="Min"
                  value={minPrice}
                  onChange={handleMinPriceChange} // Attach handler for min price
                />
              </div>
              <div className={cl.price_input}>
                <label>Max Price (Taka)</label>
                <input
                  type="number"
                  placeholder="Max"
                  value={maxPrice}
                  onChange={handleMaxPriceChange} // Attach handler for max price
                />
              </div>
            </div>
          </div>

          {/* Free Delivery Filter */}
          <div className={cl.filter_box}>
            <h4>Free Delivery</h4>
            <label className={cl.checkbox_container}>
              <input type="checkbox" />
              <span className={cl.checkbox_label}>Show products with free delivery</span>
            </label>
          </div>

          {/* Most Sold, Discount, Latest Update Filters */}
          <div className={cl.filter_box}>
            <h4>Most Sold</h4>
            <button>Sort by Most Sold</button>
          </div>

          <div className={cl.filter_box}>
            <h4>By Discount</h4>
            <button>Sort by Discount</button>
          </div>

          <div className={cl.filter_box}>
            <h4>By Latest Update</h4>
            <button>Sort by Latest</button>
          </div>
        </div>
      </div>

      {/* Product List */}
      <div className={cl.list_container}>
        {filteredProducts.length > 0 ? (
          filteredProducts.map(product => (
            <Card key={product.id} product={product} />
          ))
        ) : (
          <Loading />
        )}
      </div>

      {/* Overlay when drawer is open */}
      {drawerOpen && <div className={cl.overlay} onClick={toggleDrawer}></div>}
    </div>
  );
}

export default Search;
