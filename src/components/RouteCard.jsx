// src/components/RouteCard.jsx
import { useState } from 'react';
// import { Link } from 'react-router-dom'; // Link is not used, if you still need it, re-add it

export default function RouteCard({ route, navigateTo }) { // Added navigateTo prop
  const [showDetails, setShowDetails] = useState(false);
  
  const handleBookNow = () => {
    // Navigate to the booking page for this specific route
    navigateTo(`/book/${route.id}`);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition duration-300">
      <div className="p-6">
        <div className="flex flex-col md:flex-row justify-between">
          <div className="mb-4 md:mb-0">
            {/* Removed the company name display completely */}
            {/* <h3>{route.company}</h3> */}
            <div className="flex items-center mt-2">
              <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">
                {route.busType}
              </span>
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-gray-500 text-sm">Departure</div>
              <div className="font-bold">{route.departure}</div>
            </div>
            <div className="flex items-center justify-center">
              <div className="h-px bg-gray-300 w-8"></div>
              <svg className="w-5 h-5 text-gray-400 mx-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
              <div className="h-px bg-gray-300 w-8"></div>
            </div>
            <div>
              <div className="text-gray-500 text-sm">Arrival</div>
              <div className="font-bold">{route.arrival}</div>
            </div>
          </div>

          <div className="text-right">
            <div className="text-gray-500 text-sm">Price</div>
            <div className="text-2xl font-bold text-green-600">KES {route.price}</div>
            <div className="text-gray-500 text-sm">{route.seats} seats left</div>
            <button
              onClick={handleBookNow}
              className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300"
            >
              Book Now
            </button>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-200 px-6 py-4 bg-gray-50">
        <button
          onClick={() => setShowDetails(!showDetails)}
          className="text-blue-600 hover:underline text-sm"
        >
          {showDetails ? 'Hide Details' : 'Show Details'}
        </button>
      </div>

      {showDetails && (
        <div className="p-6 pt-0">
          <h4 className="font-bold mt-6 mb-3">Amenities</h4>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-gray-700">
            {/* Example Amenities - replace with actual data */}
            <div className="flex items-center">
              <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>WiFi</span>
            </div>
            <div className="flex items-center">
              <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>AC</span>
            </div>
            <div className="flex items-center">
              <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>Reclining Seats</span>
            </div>
            <div className="flex items-center">
              <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>Charging Ports</span>
            </div>
            <div className="flex items-center">
              <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>Toilet</span>
            </div>
          </div>
          
          <h4 className="font-bold mt-6 mb-3">Pickup Points</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h5 className="font-medium text-gray-700">Nairobi</h5>
              <ul className="mt-2 space-y-1 text-sm text-gray-600">
                <li>• Railways Bus Station - 6:30 AM</li>
                <li>• ABC Mall - 6:45 AM</li>
                <li>• TRM - 7:00 AM</li>
              </ul>
            </div>
            <div>
              <h5 className="font-medium text-gray-700">Mombasa</h5>
              <ul className="mt-2 space-y-1 text-sm text-gray-600">
                <li>• Mombasa Bus Station - 1:30 PM</li>
                <li>• Nyali Cinemax - 1:45 PM</li>
                <li>• Likoni Ferry - 2:00 PM</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}