import React from 'react';
import cl from './style.module.css';
import Card from './card';

function ProductList() {
  return (
    <>
    
<h1 className='text-3xl text-center ftextont-bold sm:text-5xl' >New Products</h1>
    <div className={cl.list_container}>
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        </div>    </>
  );
}

export default ProductList;
