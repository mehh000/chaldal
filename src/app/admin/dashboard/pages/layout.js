'use client'


import Navber from '@/components/dashboard/dashboardNav/dashNav'
import Sidebar from '@/components/dashboard/dashboardSidebar/Sidebar'
import React, { useState } from 'react'

function Dashboardlayout({ children }) {
    const [showSidebar, setShowSidebar] = useState(true);
  
    const handletoggle =()=> {
      setShowSidebar(!showSidebar);
     // console.log(showSidebar);
    };
  
    return (
        <div className='flex flex-row w-full '>
           {showSidebar ? <Sidebar /> : null} 
            <dive className='flex flex-col w-full' >
                <Navber  handletoggle={handletoggle} />
                <div className='w-full h-full p-3 bg-white' >
                    {children}
                </div>
            </dive>

        </div>
    )
}

export default Dashboardlayout