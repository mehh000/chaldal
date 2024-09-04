import React from 'react'
import cl from './Category.module.css'
import Image from 'next/image'

function Category() {
    return (
        <div className={cl.conatiner}>
            <h2 className={cl.title} >All the Category</h2>
            <div className={cl.cetegory_Container}>
                {/* card */}
                <div className={cl.cat_card}>
                    <Image src={'/mlik.png'} height={150} width={150} alt='cat image' />
                </div>        <div className={cl.cat_card}>
                    <Image src={'/mlik.png'} height={150} width={150} alt='cat image' />
                </div>        <div className={cl.cat_card}>
                    <Image src={'/mlik.png'} height={150} width={150} alt='cat image' />
                </div>        <div className={cl.cat_card}>
                    <Image src={'/mlik.png'} height={150} width={150} alt='cat image' />
                </div>        <div className={cl.cat_card}>
                    <Image src={'/mlik.png'} height={150} width={150} alt='cat image' />
                </div>        <div className={cl.cat_card}>
                    <Image src={'/mlik.png'} height={150} width={150} alt='cat image' />
                </div>        <div className={cl.cat_card}>
                    <Image src={'/mlik.png'} height={150} width={150} alt='cat image' />
                </div>        <div className={cl.cat_card}>
                    <Image src={'/mlik.png'} height={150} width={150} alt='cat image' />
                </div>
            </div>
        </div>
    )
}

export default Category