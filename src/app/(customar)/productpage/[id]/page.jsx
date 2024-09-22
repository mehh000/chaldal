'use client'


import React, { useEffect, useState } from 'react';
import cl from './style.module.css';
import Image from 'next/image';
import { getProductById } from '@/service/getproductbyid';
import { addToCart} from '@/service/addtocart';
import { useAuth } from '@/Context/AuthProvider';


function ProductDetail({ params }) {
const productID = {params}.params.id;
// console.log({params}.params.id);
// console.log(productID);


  const [weight, setWeight] = useState(0);
  const [priceBeforeDiscount, setPriceBeforeDiscount] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);
  const { user,handleGetUser,userData } = useAuth();



  const pricePerKg = product.price; // Price per kilogram
  const discountPercentage = product.discount; // Discount percentage

  useEffect(() => {
    try {
      const handlegetproduct = async () => {
        const data = await getProductById(productID);
        setProduct(data);
        console.log('prodcut data:', data);
        setLoading(false)
      };
      handlegetproduct();
    } catch (error) {

    }




  }, [])


  const handleWeightChange = (e) => {
    const inputWeight = parseInt(e.target.value);
    if (isNaN(inputWeight) || inputWeight <= 0) {
      setWeight(0);
      setPriceBeforeDiscount(0);
      setTotalPrice(0);
    } else {
      setWeight(inputWeight);
      const priceBefore = (product.price / 1000) * inputWeight;
      const discountAmount = (priceBefore * discountPercentage) / 100;
      const priceAfter = priceBefore - discountAmount;
      setPriceBeforeDiscount(priceBefore.toFixed(2));
      setTotalPrice(priceAfter.toFixed(2));
    }
  };

  const displayWeight = weight >= 1000 ? `${(weight / 1000).toFixed(2)} kg` : `${weight} g`;

  const handleADDtoCart = async()  =>{
    const productData ={
      productID: productID,
      imageURL: product.imageUrl,
      name: product.name,
      price: totalPrice,
      kg: displayWeight,
      quantity: '',
    }
        try {
          await  addToCart(user.uid, productData)
          handleGetUser()
        } catch (error) {
          
        }
  }





  return (
    <>
      {
        loading ? <div role="status" className="space-y-8 animate-pulse md:space-y-0 md:space-x-8 rtl:space-x-reverse md:flex md:items-center">
          <div className="flex items-center justify-center w-full h-48 bg-gray-300 rounded sm:w-96 dark:bg-gray-700">
            <svg className="w-10 h-10 text-gray-200 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
              <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
            </svg>
          </div>
          <div className="w-full">
            <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[480px] mb-2.5"></div>
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[440px] mb-2.5"></div>
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[460px] mb-2.5"></div>
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]"></div>
          </div>
          <span className="sr-only">Loading...</span>
        </div> :




          <div className={cl.container}>
            <div className={cl.product_container}>
              <div className={cl.image_container}>
                <Image
                  src={product.imageUrl}
                  height={500}
                  width={500}
                  alt='Product'
                  className={cl.product_image}
                />
              </div>

              <div className={cl.product_info_container}>
                <h2 className={cl.product_name}>{product.name}</h2>
                <p className={cl.product_details}>
                  {product.description}
                </p>

                <div className={cl.price_container}>
                  <p className={cl.price}>Price per kg: Taka {product.price}</p>
                  <p className={cl.discount}>Discount: {product.discount}%</p>
                </div>

                <div className={cl.quantity_container}>
                  <div className={cl.net_weight_of_product_container}>
                    <span className={cl.weight_label}>Enter Quantity (in grams):</span>
                    <input
                      type="number"
                      className={cl.input}
                      placeholder='Enter grams'
                      onChange={handleWeightChange}
                      min={0}
                    />
                    <span className={cl.amount_display}>{displayWeight}</span>
                  </div>
                </div>

                {totalPrice > 0 && (
                  <div className={cl.total_price_container}>
                    <span className={cl.total_price_label}>Total Price:</span>
                    <span className={cl.total_price_original}>Taka {priceBeforeDiscount}</span>
                    <span className={cl.total_price_discounted}>Taka {totalPrice}</span>
                  </div>
                )}

                <button className={cl.add_to_cart_btn} onClick={handleADDtoCart} >Add to Cart</button>
              </div>
            </div>
          </div>}




    </>
  );
}

export default ProductDetail;
