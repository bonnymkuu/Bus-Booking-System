import React from 'react';
import { useState, useEffect, useRef } from 'react';

import busImage1 from '../assets/images/bus1.jpg'; 
import busImage2 from '../assets/images/bus2.jpg';
import busImage3 from '../assets/images/bus3.jpg';
import busImage4 from '../assets/images/bus4.jpg';
import busImage5 from '../assets/images/bus5.jpg';
import busImage6 from '../assets/images/bus6.jpg';
import busImage7 from '../assets/images/bus7.jpg';
import busImage8 from '../assets/images/bus8.jpg';
import busImage9 from '../assets/images/bus9.jpg';

const useFadeInOnScroll = (threshold = 0.3) => {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold }
    );

    if (elementRef.current) observer.observe(elementRef.current);

    return () => {
      if (elementRef.current) observer.disconnect();
    };
  }, [threshold]);

  return [elementRef, isVisible];
};


export default function Gallery() {
  const busImages = [
    busImage1,
    busImage2,
    busImage3,
    busImage4,
    busImage5,
    busImage6,
    busImage7,
    busImage8,
    busImage9,
  ];

  return (
    <div className="container-fluid py-5 bg-black">
      <h2 className="text-center display-4 fw-bold mb-5 text-primary">Gallery</h2>
      <div className="row row-cols-1 row-cols-md-3 g-4">
        {busImages.map((image, index) => {
          const [ref, isVisible] = useFadeInOnScroll();

          return (
            <div className="col" key={index} ref={ref}>
              <div
                className={`card h-300 w-auto shadow-sm border-0 rounded-lg overflow-hidden fade-in ${isVisible ? 'show' : ''}`}
                style={{ backgroundColor: 'rgb(17, 25, 35)' }}
              >
                <img
                  src={image}
                  className="card-img-top"
                  alt={`Bus ${index + 1}`}
                  style={{ objectFit: 'cover', height: '350px', width: '100%' }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}