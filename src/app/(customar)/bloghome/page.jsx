import React from 'react';
import cl from './BlogHome.module.css';
import Image from 'next/image';
import { FaSearch } from 'react-icons/fa';
import SliderHero from '@/components/hero/Hero';
import Link from 'next/link';

function BlogHome() {
  return (
    <> 
      <SliderHero />
      <div className={cl.blog_home}>
        {/* Search Box */}
        <div className="flex items-center justify-around">
            <h1 className='flex flex-wrap text-3xl font-bold' >Daily health tips</h1>
             <div className={cl.search_section}>
          <input type="text" placeholder="Search blog posts..." className={cl.search_input} />
          <FaSearch className={cl.search_icon} />
        </div>
        </div>
       

        {/* Main Content */}
        <div className={cl.main_content}>
          {/* Blog Post Section */}
          <div className={cl.blog_posts}>
            {/* Sample Blog Post */}
            {Array.from({ length: 5 }).map((_, index) => (
              <div key={index} className={cl.blog_card}>
                <div className={cl.blog_image}>
                  <Image src='/alu.png' width={120} height={120} alt='Blog Image' />
                </div>
                <div className={cl.blog_details}>
                  <h2 className={cl.blog_title}>Sample Blog Post Title</h2>
                  <p className={cl.blog_description}>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  </p>
                  <p className={cl.blog_description}>
                    Voluptatem quisquam eveniet aliquam! Lorem ipsum dolor sit amet consectetur.
                  </p>
                  <div className={cl.blog_meta}>
                    <span className={cl.blog_author}>By Himal Hasan</span> •{' '}
                    <span className={cl.blog_date}>Sep 6, 2024</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Topics Section */}
          <div className={cl.topics}>
            <h3 className={cl.topics_heading}>Top Topics</h3>
            <ul className={cl.topics_list}>
              <li>
                <Link href="/category/fitness-tips">Fitness Tips</Link>
              </li>
              <li>
                <Link href="/category/mental-health">Mental Health</Link>
              </li>
              <li>
                <Link href="/category/nutrition">Nutrition</Link>
              </li>
              <li>
                <Link href="/category/lifestyle">Lifestyle</Link>
              </li>
              <li>
                <Link href="/category/self-care">Self-Care</Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Pagination */}
        <div className={cl.pagination}>
          <button className={cl.page_btn}>Prev</button>
          <span className={cl.page_number}>Page 1 of 3</span>
          <button className={cl.page_btn}>Next</button>
        </div>
      </div>
    </>
  );
}

export default BlogHome;
