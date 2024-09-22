import React from 'react'
import cl from './style.module.css'
import Image from 'next/image'
import Link from 'next/link';
import { FaShoppingCart, FaUserAlt, FaSearch } from 'react-icons/fa';


function CategoryPhoneView() {
    const categoryOptions = [
        { name: 'fruits', imgSrc: '/fruits.png', id: 1 },
        { name: 'meat', imgSrc: '/meat.png', id: 2 },
        { name: 'milk', imgSrc: '/mlik.png', id: 3 },
        { name: 'rice', imgSrc: '/rice.png', id: 4 },
        { name: 'snacks', imgSrc: '/snacks.png', id: 5 },
        { name: 'vegetable', imgSrc: '/vegetable.png', id: 6 },
        { name: 'egg', imgSrc: '/egg.png', id: 7 },
        { name: 'soft-drinks', imgSrc: '/drink.png', id: 8 }, // Example additional category
    ];
    return (
        <div className='flex flex-col items-center p-1 mb-3' >
             <h2 className={cl.title} >All the Category</h2>


          <Link href={'/search/all'}>  <div className="flex items-center justify-center p-3 rounded-lg bg-slate-500 flex-row mb-4 ">
              <p className="text-white font-semibold flex items-center justify-center gap-4">
              Search your needs <FaSearch className='text-2xl text-white' />
              </p>
            </div></Link>


            <div className={cl.cetegory_Container}>
                {/* card */}
                {
                    categoryOptions.map((data) => (
                        <Link key={data.id} href={`/search/${data.name}`}>
                            <div className={cl.cat_card}>
                                <Image src={data.imgSrc} height={80} style={{ width: 'auto', height: 'auto' }} width={80} alt='cat image' priority />
                            </div>
                        </Link>
                    ))
                }
            </div>
        </div>
    )
}

export default CategoryPhoneView