'use client'



import Image from 'next/image';
import { useAuth } from '@/Context/AuthProvider';


function Delivery() {

    const { userData } = useAuth();




    const handleCancel = (productId) => {
      //  console.log(`Cancel product with ID: ${productId}`);
        // Add cancel functionality here
    };

    return (
        <div className="p-5 w-full flex flex-col items-center">
            <h1 className="text-2xl font-bold mb-5">Delivery Products</h1>

            <div className="w-full max-w-5xl flex flex-col space-y-4">
                {/* lets do our nested mapping */}
{
    userData?.checkoutList ?  
        userData?.checkoutList.map((data, i) => (
            <div className="" key={data.id} >
               
                {userData?.checkoutList[i].products.items.map((product) => (
                    <div key={product.id} className="flex flex-col sm:flex-row items-center justify-between bg-white shadow-md rounded-lg p-4 space-y-4 sm:space-y-0 sm:space-x-4 w-full">
                        {/* Product Image */}
                        <div className="flex-shrink-0">
                            <Image src={product.imageURL} alt={product.name} width={80} height={80} className="rounded-lg" />
                        </div>

                        {/* Product Name */}
                        <div className="text-lg font-bold">{product.name}</div>

                        {/* KG and Price */}
                        <div className="flex flex-col items-center">
                            <p>{product.kg}</p>
                            <p  className="text-green-600 font-semibold">{product.price}</p>
                        </div>

                        {/* Status */}
                        <div className="text-center">
                            <p>pending</p>
                        </div>

                        {/* Cancel Button */}
                        <button
                            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded transition-all"
                            onClick={() => handleCancel(product.id)}
                            disabled={product.status !== 'On the way'} // Disable cancel button if the product is already delivered or cancelled
                        >
                            Cancel
                        </button>
                    </div>
                ))}
                <div className="p-2 flex flex-wrap justify-evenly shadow-md bg-slate-100 w-full rounded-lg items-center ">
                <p className="text-green-500 font-bold">delivery fee :{data.products.deliveryPrice}</p>
                <p className="text-green-500 font-bold">Total Taka :{data.products.totalPrice}</p>
                </div>

            </div>
        ))
     : <div className="w-full flex items-center justify-center h-full">
        <Image src={'/Empty-pana.png'} alt='empty' height={250} width={250} priority />
     </div>
}
                

            </div>
        </div>
    );
}

export default Delivery;
