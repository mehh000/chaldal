import React from 'react'
import cl from './style.module.css'
import Image from 'next/image'

function CategoryPhoneView() {
    return (
        <div className='flex flex-col items-center p-1' >
             <h2 className={cl.title} >All the Category</h2>
            <div className={cl.cetegory_Container}>
                {/* card */}
                <div className={cl.cat_card}>
                    <Image src={'/mlik.png'} height={80} width={80} alt='cat image' />
                </div>  <div className={cl.cat_card}>
                    <Image src={'/mlik.png'} height={80} width={80} alt='cat image' />
                </div>  <div className={cl.cat_card}>
                    <Image src={'/mlik.png'} height={80} width={80} alt='cat image' />
                </div>  <div className={cl.cat_card}>
                    <Image src={'/mlik.png'} height={80} width={80} alt='cat image' />
                </div>  <div className={cl.cat_card}>
                    <Image src={'/mlik.png'} height={80} width={80} alt='cat image' />
                </div>  <div className={cl.cat_card}>
                    <Image src={'/mlik.png'} height={80} width={80} alt='cat image' />
                </div>  <div className={cl.cat_card}>
                    <Image src={'/mlik.png'} height={80} width={80} alt='cat image' />
                </div>  <div className={cl.cat_card}>
                    <Image src={'/mlik.png'} height={80} width={80} alt='cat image' />
                </div>

            </div>
        </div>
    )
}

export default CategoryPhoneView