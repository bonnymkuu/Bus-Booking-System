import React from 'react';
import Button from '../components/Button'; // Assuming your Button component is in this path
import busImage2 from '../assets/images/bus2.jpg'; // Import your specific bus image

/**
 * Renders a 404 Not Found page with a bus image background.
 * Allows navigation back to the home page.
 *
 * @param {object} props - Component props.
 * @param {function} props.navigateTo - Function to navigate to a different route.
 */
export default function NotFound({ navigateTo }) {
  return (
    <div
      className="container-fluid d-flex flex-column align-items-center justify-content-center vh-100 text-center position-relative"
      style={{
        backgroundImage: `url(${busImage2})`, // Use the imported bus image
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundColor: '#343a40', // Dark fallback background for contrast
      }}
    >
      {/* Overlay for better text readability */}
      <div
        className="position-absolute inset-0 bg-dark opacity-75" // Dark, semi-transparent overlay
        style={{ top: 0, left: 0, right: 0, bottom: 0 }}
      ></div>

      {/* Content Layer */}
      <div className="position-relative z-1 text-white"> {/* Ensure text is on top and white */}
        <h1
          className="display-1 fw-bolder mb-3" // Using fw-bolder for even heavier font weight
          style={{ fontSize: '10rem', letterSpacing: '0.1em' }} // Custom large font size and letter spacing
        >
          404
        </h1>
        <h2 className="mb-4 text-warning">Destination Not Found</h2>
        <p className="lead mb-5 px-3">
          It looks like this bus route is off the map! The page you're looking for doesn't exist.
        </p>
        <Button onClick={() => navigateTo('home')} iconClass="bi bi-house-door-fill">
          Go to Home
        </Button>
      </div>
    </div>
  );
}
