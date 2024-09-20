'use client'

import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { useAuth } from '@/Context/AuthProvider';
import Link from 'next/link';
import { addToCheckoutList } from '@/service/addcheakout';
import { useRouter } from 'next/navigation';

function Checkout() {
  const { userData , handleGetUser,deliveryProducts } = useAuth();
  const [selectedOption, setSelectedOption] = useState('');
  const router = useRouter()

  const handleSelectOption = (option) => {
    setSelectedOption(option);
  };

  useEffect(()=>{
    handleGetUser();
  },[])

  const [cheakout, setCheakout] = useState({});
   console.log('from the cheakout:',deliveryProducts);
  const handleCheakout = async () => {
    const finalupdate = {
      ...cheakout, // Spread the current checkout state
      paymentMethod: selectedOption, // Add payment method
      products: deliveryProducts, // Add products
      address: userData?.primaryAddress[0],
      status: 'pending' // Add primary address 
    };

    setCheakout(finalupdate); // Update the checkout state
 

    try {
      // Pass userId and the updated cheakout object to Firestore
      if (userData && userData.uid) {
        await addToCheckoutList(userData.uid, finalupdate);
        router.push('/');
      //  console.log('Checkout data added successfully.');
      } else {
       // console.log('User data is missing.');
      }
    } catch (error) {
   //   console.log('Error adding to checkout:', error);
    }
  };
  
  // useEffect to log `cheakout` whenever it gets updated
  useEffect(() => {
   // console.log('From the checkout page final update:', cheakout);
  }, [cheakout]); // This will trigger when `cheakout` changes
  



  // Check if any option is selected to enable the checkout button
  const isOptionSelected = selectedOption !== '';

  return (
    <div className="w-full h-full p-5 flex items-center justify-center">
      <div className="flex flex-col p-6 rounded-md shadow-lg bg-white">
        <div className="p-3 rounded-lg bg-green-500 mb-4 text-center">
          <h1 className="text-white font-bold text-lg">Choose Your Payment Option</h1>
        </div>

        {/* Payment Options */}
        <div className="flex flex-col space-y-4">
          {/* Bkash Option */}
          <div
            className={`p-4 rounded-md cursor-pointer transition-all duration-300 ${selectedOption === 'bkash' ? 'border-2 border-green-500' : 'border-2 border-transparent'}`}
            onClick={() => handleSelectOption('bkash')}
          >
            <div className="flex items-center space-x-3">
              <Image src={'/bkash-logo.png'} alt='Bkash' height={50} width={50} />
              <p className="font-semibold">Bkash</p>
            </div>
          </div>

          {/* Cash on Delivery Option */}
          <div
            className={`p-4 rounded-md cursor-pointer transition-all duration-300 ${selectedOption === 'cash' ? 'border-2 border-green-500' : 'border-2 border-transparent'}`}
            onClick={() => handleSelectOption('cash')}
          >
            <div className="flex items-center space-x-3">
              <Image src={'/handcash.png'} alt='Cash on Delivery' height={50} width={50} />
              <p className="font-semibold">Cash on Delivery</p>
            </div>
          </div>

          {/* Nagad Option */}
          <div
            className={`p-4 rounded-md cursor-pointer transition-all duration-300 ${selectedOption === 'nagad' ? 'border-2 border-green-500' : 'border-2 border-transparent'}`}
            onClick={() => handleSelectOption('nagad')}
          >
            <div className="flex items-center space-x-3">
              <Image src={'/nagad-logo.png'} alt='Nagad' height={50} width={50} />
              <p className="font-semibold">Nagad</p>
            </div>
          </div>
        </div>

        {/* adresss view */}
        <div className="p-2 bg-white rounded-lg border-red-200 border-2 mt-3">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-lg font-bold">{userData?.primaryAddress[0].name}</h2>

          </div>
          <h2>{userData?.primaryAddress[0].email}</h2>
          <h2>{userData?.primaryAddress[0].area}</h2>
          <h2>{userData?.primaryAddress[0].fullAddress}</h2>
          <div className="flex items-center justify-between">
            <p>{userData?.primaryAddress[0].name}</p>
            <Link href={'/viewaddress'}>
              <div className=" hover:bg-red-700 hover:text-white text-red-500 font-bold py-2 px-4 rounded">
                chnage
              </div> </Link>
          </div>
        </div>
{/* 
        {
          deliveryProducts  ? <p className="text-green-500">have prodcucts: {deliveryProducts} </p> : <p className="text-red-500">dont have products</p>
        } */}

        {/* Checkout Button */}
        <div className="mt-6">
          <button
          onClick={handleCheakout}
            className={`w-full py-2 rounded-md text-white font-bold transition-all duration-300 ${isOptionSelected ? 'bg-green-500 hover:bg-green-600' : 'bg-gray-300 cursor-not-allowed'}`}
            disabled={!isOptionSelected}
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
