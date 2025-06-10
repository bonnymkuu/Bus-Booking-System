import React from 'react';
import busImage2 from '../assets/images/bus2.jpg'; // Assuming bus2.jpg is in your assets/images folder

export default function About() {
  return (
    <div className="container-fluid py-5 relative bg-cover bg-center py-16 md:py-24"
     style={{ 
          backgroundImage: `url(${busImage2})`,
          backgroundRepeat: 'no-repeat', // Prevent image repetition
          backgroundSize: 'cover',      // Ensure image covers the area
        }}>
      {/* Image section, similar to the screenshot */}
      <div className='text-black' style={{borderRadius: '18px', backgroundColor: 'rgba(245, 245, 245, 0.7)', fontSize: '20px'}}>
        <h2 className="text-center display-4 fw-bold mb-5 text-danger">About Us</h2>
        <div className="row justify-content-center">
            <div className="col-lg-8">
            <p className=" text-black mb-4 fs-20">
                Welcome to BuscarKenya, your premier online platform for booking bus tickets across Kenya. 
                We are dedicated to providing a seamless, reliable, and comfortable travel experience for all our passengers.
            </p>
            <p className="text-black mb-4">
                Founded with the vision to revolutionize inter-county bus travel, BuscarKenya connects you to a wide network of routes and bus operators, ensuring you find the perfect journey at the best price. Our user-friendly interface makes booking quick and easy, while our commitment to customer satisfaction drives everything we do.
            </p>
            <h3 className="h4 fw-bold mb-3 text-danger">Our Mission</h3>
            <p className="text-black mb-4">
                To provide accessible, affordable, and high-quality bus travel solutions, empowering Kenyans to explore their country with ease and confidence.
            </p>
            <h3 className="h4 fw-bold mb-3 text-danger">Our Values</h3>
            <ul className="list-unstyled text-black mb-4">
                <li className="mb-2"><i className="bi bi-check-circle-fill me-2 text-danger"></i> Reliability: Ensuring timely and safe journeys.</li>
                <li className="mb-2"><i className="bi bi-check-circle-fill me-2 text-danger"></i> Customer Focus: Prioritizing your needs and feedback.</li>
                <li className="mb-2"><i className="bi bi-check-circle-fill me-2 text-danger"></i> Innovation: Continuously improving our platform and services.</li>
                <li className="mb-2"><i className="bi bi-check-circle-fill me-2 text-danger"></i> Accessibility: Making travel easy for everyone.</li>
            </ul>
            <p className="text-black">
                Thank you for choosing BuscarKenya. We look forward to being a part of your next adventure!
            </p>
            </div>
        </div>
      </div>
    </div>
  );
}