import React from 'react';

// Assuming you have images in your assets/images folder, or use external URLs
// For demonstration, using placeholder URLs. Replace these with your actual image imports.
import busImage1 from '../assets/images/bus1.jpg'; 
import busImage2 from '../assets/images/bus2.jpg';
import busImage3 from '../assets/images/bus3.jpg';
import busImage4 from '../assets/images/bus4.jpg';
import busImage5 from '../assets/images/bus5.jpg';
import busImage6 from '../assets/images/bus6.jpg';
import busImage7 from '../assets/images/bus7.jpg';
import busImage8 from '../assets/images/bus8.jpg';
import busImage9 from '../assets/images/bus9.jpg';


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
      <h2 className="text-center display-4 fw-bold mb-5 text-danger">Our Fleet Gallery</h2>
      <div className="row row-cols-1 row-cols-md-3 g-4">
        {busImages.map((image, index) => (
          <div className="col" key={index}>
            <div className="card h-300 w-auto shadow-sm border-0 rounded-lg overflow-hidden" style={{backgroundColor: 'rgb(17, 25, 35)'}}>
              <img src={image} className="card-img-top" alt={`Bus ${index + 1}`} style={{ objectFit: 'cover', height: '350px', width: '100%' }} />
              {/* Optional: Add a card body or title if you want text overlays */}
              {/* <div className="card-body text-center">
                <p className="card-text text-secondary">A comfortable ride awaits.</p>
              </div> */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}