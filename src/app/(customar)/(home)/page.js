
import Category from '@/components/category/Category'
import SliderHero from '@/components/hero/Hero'
import ProductList from '@/components/productlist/productlist'

import React from 'react'
import { useAuth } from '@/Context/AuthProvider'



export default function Home() {




  return (
    <>
    
  
    <div >
   <SliderHero />
   <Category />
   <ProductList />
    
  
    </div> 
   
     </>
  )
}
