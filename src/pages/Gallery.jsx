import React from 'react';
import { useState, useEffect, useRef } from 'react';
import Typewriter from "typewriter-effect";
import busImage1 from '../assets/images/bus1.jpg'; 
import busImage2 from '../assets/images/bus2.jpg';
import busImage3 from '../assets/images/bus3.jpg';
import busImage4 from '../assets/images/bus4.jpg';
import busImage5 from '../assets/images/bus5.jpg';
import busImage6 from '../assets/images/bus6.jpg';
import busImage7 from '../assets/images/bus7.jpg';
import busImage8 from '../assets/images/bus8.jpg';
import busImage9 from '../assets/images/bus9.jpg';

const useFadeInOnScroll = (threshold = 0.1) => {
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

const busCaptions = [
  "Luxury Redefined: Our flagship coach with premium recliners",
  "Business Class on Wheels: Your mobile office at 100km/h",
  "Adventure Awaits: Rugged comfort for scenic routes",
  "City Slicker: Navigating urban jungles in style",
  "The Green Machine: Eco-friendly travel never looked so good",
  "Night Rider: Comfort through the midnight hours",
  "Family Cruiser: Spacious cabins for your whole crew",
  "Executive Express: Where business meets comfort",
  "The Explorer: Conquering long distances with ease"
];

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
      <div className="text-center mb-5">
        <h2 className="display-3 fw-bold text-white mb-3">
          <Typewriter
              options={{
                strings: ["Our Fleet Gallery"],
                autoStart: true,
                loop: true,
                delay: 75,
              }}
            />
        </h2>
        <p className=" text-light mb-4">
          Where <span className="text-warning">comfort</span> meets the open road
        </p>
        <div className="d-flex justify-content-center">
          <div className="border-bottom border-primary border-3" style={{ width: '100px' }}></div>
        </div>
      </div>

      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4 px-3 px-md-5">
        {busImages.map((image, index) => {
          const [ref, isVisible] = useFadeInOnScroll(0.1 + (index * 0.05));

          return (
            <div 
              className="col" 
              key={index} 
              ref={ref}
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <div
                className={`card h-100 shadow-lg border-0 overflow-hidden transition-all ${isVisible ? 'show' : ''}`}
                style={{
                  backgroundColor: 'rgba(30, 40, 50, 0.7)',
                  transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
                  opacity: isVisible ? 1 : 0,
                  transition: 'transform 0.6s ease-out, opacity 0.6s ease-out'
                }}
              >
                <div className="position-relative overflow-hidden">
                  <img
                    src={image}
                    className="card-img-top img-fluid"
                    alt={`Bus ${index + 1}`}
                    style={{ 
                      objectFit: 'cover', 
                      height: '300px', 
                      width: '100%',
                      filter: 'brightness(0.9)',
                      transition: 'transform 0.5s ease'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.03)'}
                    onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                  />
                  <div className="position-absolute bottom-0 start-0 end-0 p-3 text-white" 
                    style={{
                      background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)'
                    }}>
                    <h5 className="mb-0 fw-bold">{busCaptions[index]}</h5>
                  </div>
                </div>
                <div className="card-body bg-dark text-center">
                  <button 
                    className="btn btn-outline-primary btn-sm px-4"
                    onClick={() => console.log(`Selected bus ${index + 1}`)}
                  >
                    <i className="bi bi-zoom-in me-2"></i>View Features
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="text-center mt-5 pt-4">
        <h3 className="text-light mb-4">Ready to Experience the Difference?</h3>
        <p className="text-secondary mb-4">Our fleet is more than just transportation - it's your mobile sanctuary</p>
        <button className="btn btn-primary btn-lg px-5 py-3 rounded-pill shadow">
          Book Your Ride Now <i className="bi bi-arrow-right ms-2"></i>
        </button>
      </div>
    </div>
  );
}