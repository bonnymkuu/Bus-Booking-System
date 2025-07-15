import React from 'react';

/**
 * A reusable shiny 3D button with a maroon and black linear gradient.
 *
 * @param {object} props - Component props.
 * @param {function} props.onClick - The function to call when the button is clicked.
 * @param {string} props.children - The text content to display inside the button.
 * @param {string} [props.iconClass] - Optional Bootstrap icon class (e.g., "bi bi-arrow-right").
 */
export default function Button({ onClick, children, iconClass }) {
  // Define hover styles outside the render for better performance and readability
  const buttonStyle = {
    backgroundImage: 'linear-gradient(145deg,rgb(16, 193, 247) 0%,rgb(4, 26, 59) 100%)', // Slightly brighter gradient
    color: 'white', // White text for contrast
    border: 'none', // Remove default border
    transition: 'all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)', // Smoother transition
    fontSize: '1rem',
    gap: '8px', // Space between text and icon
    boxShadow: 'inset 0 1px 0px rgba(255, 255, 255, 0.2), /* Top light */ ' +
                'inset 0 -1px 0px rgba(0, 0, 0, 0.3), /* Bottom dark */ ' +
                '0 4px 6px rgba(0, 0, 0, 0.3), /* Main lift shadow */ ' +
                '0 1px 3px rgba(0, 0, 0, 0.2)', /* Smaller detail shadow */
    cursor: 'pointer',
    position: 'relative', // Needed for pseudo-elements or more complex effects if desired
    overflow: 'hidden',   // Ensures no overflow from inner shine effects
  };

  const hoverStyle = {
    transform: 'translateY(-2px)', // Slight lift
    boxShadow: 'inset 0 1px 0px rgba(255, 255, 255, 0.3), ' +
                'inset 0 -1px 0px rgba(0, 0, 0, 0.4), ' +
                '0 6px 10px rgba(0, 0, 0, 0.4), ' + // Increased lift shadow
                '0 2px 4px rgba(0, 0, 0, 0.3)',
    backgroundImage: 'linear-gradient(145deg,rgb(0, 141, 160) 0%,rgb(0, 33, 64) 50%,rgb(16, 16, 16) 100%)', // Slightly brighter gradient
  };

  const handleMouseOver = (e) => {
    Object.assign(e.currentTarget.style, hoverStyle);
  };

  const handleMouseOut = (e) => {
    Object.assign(e.currentTarget.style, buttonStyle); // Revert to initial style
  };

  return (
    <button
      className="btn shadow-lg rounded-pill py-2 px-4 d-flex align-items-center justify-content-center"
      onClick={onClick} // Use the onClick prop directly
      style={buttonStyle}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
    >
      {children} {/* Display text passed as children */}
      {iconClass && <i className={iconClass}></i>} {/* Conditionally render icon */}
    </button>
  );
}
