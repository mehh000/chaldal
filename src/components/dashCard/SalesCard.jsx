import React from 'react';
import { FaChartLine } from 'react-icons/fa'; // Example icon
import cl from './SalesCard.module.css'; // Importing your CSS module

function SalesCard({ iconname: Icon , subtitle, number, iconColor}) {
  return (
    <div className={cl.card}>
      <div className={cl.iconContainer}>
        <Icon className='text-2xl' style={{ color: iconColor }} />
      </div>
      <div className={cl.content}>
        <h3 className={cl.title}>{subtitle}</h3>
      
        <h2 className={cl.amount}>{number}</h2>
      </div>
    </div>
  );
}

export default SalesCard;
