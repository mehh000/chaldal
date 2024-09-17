import SalesCard from '@/components/dashCard/SalesCard'
import React from 'react'
import { FaChartLine, FaPeopleArrows , FaShoppingCart, FaShare,FaProdu   } from 'react-icons/fa'; 
import { MdOutlineDeliveryDining } from "react-icons/md";
import { MdProductionQuantityLimits } from "react-icons/md";
import { BsCartCheck } from "react-icons/bs";
import { TbShoppingCartCancel } from "react-icons/tb";

function Dashboard() {
  return (
    <div className='flex flex-wrap gap-[30px] items-center justify-center'>
      <SalesCard iconname={FaChartLine} subtitle={'Total Sell'}   number={'Taka 20k'} iconColor='red'/>
      <SalesCard iconname={FaPeopleArrows } subtitle={'Total Member'}   number={'23422'} iconColor='blue'/>
      <SalesCard iconname={FaShoppingCart} subtitle={'Total request'}   number={'233'} iconColor='green'/>
      <SalesCard iconname={MdOutlineDeliveryDining } subtitle={'Pending Delivary'}   number={'121'} iconColor='blue'/>
      <SalesCard iconname={MdProductionQuantityLimits} subtitle={'Total Products'}   number={'1200'} iconColor='purpol'/>
      <SalesCard iconname={FaChartLine} subtitle={'This Month sell'}   number={'Taka 10k'} iconColor='gray'/>
      <SalesCard iconname={BsCartCheck} subtitle={'This Month Delivary'}   number={'20k'} iconColor='red'/>
      <SalesCard iconname={TbShoppingCartCancel} subtitle={'Product Return'}   number={'5'} iconColor='red'/>
      </div>
  )
}

export default Dashboard