import React from 'react'
import cl from './Category.module.css'
import Image from 'next/image'
import Link from 'next/link';

function Category() {
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
        <div className={cl.conatiner}>
            <h2 className={cl.title} >All the Category</h2>
            <div className={cl.cetegory_Container}>
                {/* card */}
                {
                    categoryOptions.map((data) => (
                        <Link key={data.id} href={`/search/${data.name}`}>
                            <div className={cl.cat_card}>
                                <Image src={data.imgSrc} height={150} width={150} alt='cat image' />
                            </div>
                        </Link>
                    ))
                }

            </div>
        </div>
    )
}

export default Category