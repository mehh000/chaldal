'use client';

import React, { useState } from 'react';
import { FaSearch, FaFilter } from 'react-icons/fa';
import ProductList from '@/components/productlist/productlist';
import cl from './Search.module.css';

function Search() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Function to toggle drawer
  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <div className={cl.search_container}>
      {/* Search Bar */}
      <div className={cl.search_bar}>
        <input type="text" placeholder="Search products..." className={cl.search_input} />
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
                <input type="number" placeholder="Min" />
              </div>
              <div className={cl.price_input}>
                <label>Max Price (Taka)</label>
                <input type="number" placeholder="Max" />
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
      <ProductList />

      {/* Overlay when drawer is open */}
      {drawerOpen && <div className={cl.overlay} onClick={toggleDrawer}></div>}
    </div>
  );
}

export default Search;
