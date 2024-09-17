'use client'

import Image from 'next/image';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css'; // Import Slick Carousel styles
import 'slick-carousel/slick/slick-theme.css'; // Import Slick Carousel theme styles
import styles from './Hero.module.css'; // Ensure you create and import your CSS module

const SliderHero = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    autoplay: true, // Enable autoplay
    autoplaySpeed: 3500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true, // Enable navigation arrows
  };

  return (
    <div className={styles.sliderHeroContainer}>
      <Slider {...settings}>
        <div className={styles.slide}>
        <Image src={'/bannertree.webp'} height={400} width={2024} layout="responsive" objectFit="cover" alt="Banner Image" />

        </div>
        <div className={styles.slide}>
        <Image src={'/bannertree.webp'} height={400} width={2024} layout="responsive" objectFit="cover" alt="Banner Image" />

        </div>
        <div className={styles.slide}>
        <Image src={'/bannertwo.webp'} height={400} width={2024} layout="responsive" objectFit="cover" alt="Banner Image" />
        </div>
      </Slider>
    </div>
  );
};

export default SliderHero;
