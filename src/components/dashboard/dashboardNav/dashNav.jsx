'use client'


import React from 'react'
import cl from './style.module.css'
import Image from 'next/image'
import { FaBell } from "react-icons/fa";
import { FaBarsStaggered } from "react-icons/fa6";



function Navber({handletoggle}) {

  return (
    <div className={cl.container}>
      <div className="flex items-center justify-center gap-5">
      <FaBarsStaggered onClick={handletoggle}  />

          <p className={cl.page_title}>/Home</p>
      </div>
    
      <div className={cl.menu_container}>
        <FaBell className={cl.noti_icon} />
        <Image src={'/user.png'} height={50} width={50} alt='user' />
      </div>
    </div>
  )
}

export default Navber