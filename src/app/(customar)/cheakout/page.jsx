'use client'

import Image from 'next/image';
import React, { useState } from 'react';

function Checkout() {
  const [selectedOption, setSelectedOption] = useState('');

  // Handle selecting a payment option
  const handleSelectOption = (option) => {
    setSelectedOption(option);
  };

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

        {/* Checkout Button */}
        <div className="mt-6">
          <button
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
