import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function RouteCard({ route }) {
  const [showDetails, setShowDetails] = useState(false);
  
  return (
    <div className="card shadow-sm border border-light overflow-hidden hover-shadow-lg transition-shadow"> {/* Bootstrap card, shadow, border, overflow, hover effect */}
      <div className="card-body p-4"> {/* Bootstrap card-body, padding */}
        <div className="d-flex flex-column flex-md-row justify-content-between"> {/* Bootstrap flex, responsive flex, justify content */}
          <div className="mb-3 mb-md-0"> {/* Bootstrap margin utilities */}
            <h3 className="h5 fw-bold text-primary">{route.company}</h3> {/* Bootstrap heading, font-weight, text color */}
            <div className="d-flex align-items-center mt-2"> {/* Bootstrap flex, alignment, margin-top */}
              <span className="badge bg-primary text-white rounded-pill px-2 py-1"> {/* Bootstrap badge, background, text, rounded, padding */}
                {route.busType}
              </span>
            </div>
          </div>
          
          <div className="row row-cols-3 g-2 text-center align-items-center"> {/* Bootstrap grid, text-center, alignment */}
            <div className="col">
              <div className="text-muted small">Departure</div> {/* Bootstrap text muted, small text */}
              <div className="fw-bold">{route.departure}</div> {/* Bootstrap font-weight */}
            </div>
            <div className="col d-flex align-items-center justify-content-center"> {/* Bootstrap flex, alignment, justify content */}
              <div className="bg-secondary opacity-25" style={{height: '1px', width: '2rem'}}></div> {/* Bootstrap background, opacity, inline style for size */}
              <svg className="text-muted mx-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{width: '1.25rem', height: '1.25rem'}}> {/* Bootstrap text-muted, margin-x, inline style for size */}
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
              <div className="bg-secondary opacity-25" style={{height: '1px', width: '2rem'}}></div>
            </div>
            <div className="col">
              <div className="text-muted small">Arrival</div>
              <div className="fw-bold">{route.arrival}</div>
            </div>
          </div>
          
          <div className="mt-3 mt-md-0 text-center text-md-end"> {/* Bootstrap margin utilities, text alignment */}
            <div className="h4 fw-bold text-success">KSh {route.price.toLocaleString()}</div> {/* Bootstrap heading, font-weight, text color */}
            <div className="text-muted small mt-1">{route.seats} seats available</div> {/* Bootstrap text muted, small text, margin-top */}
          </div>
        </div>
        
        <div className="mt-4 d-flex flex-column flex-sm-row justify-content-between align-items-center"> {/* Bootstrap flex, responsive flex, justify content, alignment */}
          <button 
            onClick={() => setShowDetails(!showDetails)}
            className="btn btn-link text-primary text-decoration-none mb-3 mb-sm-0" // Bootstrap button link, text color, no underline, margin utilities
          >
            {showDetails ? 'Hide details' : 'Show details'}
          </button>
          
          <Link 
            to={`/book/${route.id}`}
            className="btn btn-primary" // Bootstrap button classes
          >
            Book Now
          </Link>
        </div>
        
        {showDetails && (
          <div className="mt-4 pt-4 border-top border-light"> {/* Bootstrap margin-top, padding-top, border */}
            <h4 className="fw-bold mb-3">Bus Amenities</h4> {/* Bootstrap font-weight, margin-bottom */}
            <div className="row row-cols-2 row-cols-md-4 g-3"> {/* Bootstrap responsive grid with gutters */}
              <div className="col d-flex align-items-center"> {/* Bootstrap flex, alignment */}
                <svg className="text-success me-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{width: '1.25rem', height: '1.25rem'}}> {/* Bootstrap text-success, margin-end, inline style for size */}
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>AC</span>
              </div>
              <div className="col d-flex align-items-center">
                <svg className="text-success me-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{width: '1.25rem', height: '1.25rem'}}>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>WiFi</span>
              </div>
              <div className="col d-flex align-items-center">
                <svg className="text-success me-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{width: '1.25rem', height: '1.25rem'}}>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Charging Ports</span>
              </div>
              <div className="col d-flex align-items-center">
                <svg className="text-success me-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{width: '1.25rem', height: '1.25rem'}}>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Toilet</span>
              </div>
            </div>
            
            <h4 className="fw-bold mt-4 mb-3">Pickup Points</h4> {/* Bootstrap font-weight, margin-top, margin-bottom */}
            <div className="row row-cols-1 row-cols-md-2 g-3"> {/* Bootstrap responsive grid with gutters */}
              <div className="col">
                <h5 className="fw-medium text-secondary">Nairobi</h5> {/* Bootstrap font-weight, text color */}
                <ul className="list-unstyled mt-2 small text-muted"> {/* Bootstrap list-unstyled, margin-top, small text, text muted */}
                  <li>• Railways Bus Station - 6:30 AM</li>
                  <li>• ABC Mall - 6:45 AM</li>
                  <li>• TRM - 7:00 AM</li>
                </ul>
              </div>
              <div className="col">
                <h5 className="fw-medium text-secondary">Mombasa</h5>
                <ul className="list-unstyled mt-2 small text-muted">
                  <li>• Mombasa Bus Station - 1:30 PM</li>
                  <li>• Nyali Cinemax - 1:45 PM</li>
                  <li>• Bamburi - 2:00 PM</li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}