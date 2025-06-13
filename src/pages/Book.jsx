import React, { useState, useEffect } from 'react';
import emptySeat from '../assets/images/empty_seat.png';
import selectedSeat from '../assets/images/booked_seat.png';
import bookedSeat from '../assets/images/selected_seat.png';
// Import the external CSS file
import '../styles/Book.css'; // Adjust path if your styles folder is elsewhere
import Button from '../components/Button';


export default function Book({ navigateTo, currentSearchParams }) {
  const routeId = currentSearchParams?.id;
  const originLocationFromRoutes = currentSearchParams?.originLocation; // Get origin from search params
  const destinationLocationFromRoutes = currentSearchParams?.destinationLocation; 

  // Define the base seat layout with unique numbers up to 45, removing 46 and 47.
  // Seat 45 is now a regular, potentially selectable seat.
  const baseSeatLayout = [
    { number: 4, status: 'empty', type: 'Normal', row: 1, col: 1 },
    { number: 3, status: 'empty', type: 'Normal', row: 2, col: 1 },
    { number: 2, status: 'empty', type: 'Normal', row: 4, col: 1 },
    { number: 1, status: 'empty', type: 'Normal', row: 5, col: 1 },

    { number: 8, status: 'empty', type: 'Normal', row: 1, col: 2 },
    { number: 7, status: 'empty', type: 'Normal', row: 2, col: 2 },
    { number: 6, status: 'empty', type: 'Normal', row: 4, col: 2 },
    { number: 5, status: 'empty', type: 'Normal', row: 5, col: 2 },

    { number: 12, status: 'empty', type: 'Normal', row: 1, col: 3 },
    { number: 11, status: 'empty', type: 'Normal', row: 2, col: 3 },
    { number: 10, status: 'empty', type: 'Normal', row: 4, col: 3 },
    { number: 9, status: 'empty', type: 'Normal', row: 5, col: 3 },

    { number: 16, status: 'empty', type: 'Normal', row: 1, col: 4 },
    { number: 15, status: 'empty', type: 'Normal', row: 2, col: 4 },
    { number: 14, status: 'empty', type: 'Normal', row: 4, col: 4 },
    { number: 13, status: 'empty', type: 'Normal', row: 5, col: 4 },

    { number: 20, status: 'empty', type: 'Normal', row: 1, col: 5 },
    { number: 19, status: 'empty', type: 'Normal', row: 2, col: 5 },
    { number: 18, status: 'empty', type: 'Normal', row: 4, col: 5 },
    { number: 17, status: 'empty', type: 'Normal', row: 5, col: 5 },

    { number: 24, status: 'empty', type: 'Normal', row: 1, col: 6 },
    { number: 23, status: 'empty', type: 'Normal', row: 2, col: 6 },
    { number: 22, status: 'empty', type: 'Normal', row: 4, col: 6 },
    { number: 21, status: 'empty', type: 'Normal', row: 5, col: 6 },

    { number: 28, status: 'empty', type: 'Normal', row: 1, col: 7 },
    { number: 27, status: 'empty', type: 'Normal', row: 2, col: 7 },
    { number: 26, status: 'empty', type: 'Normal', row: 4, col: 7 },
    { number: 25, status: 'empty', type: 'Normal', row: 5, col: 7 },

    { number: 32, status: 'empty', type: 'Normal', row: 1, col: 8 },
    { number: 31, status: 'empty', type: 'Normal', row: 2, col: 8 },
    { number: 30, status: 'empty', type: 'Normal', row: 4, col: 8 },
    { number: 29, status: 'empty', type: 'Normal', row: 5, col: 8 },

    { number: 36, status: 'empty', type: 'Normal', row: 1, col: 9 },
    { number: 35, status: 'empty', type: 'Normal', row: 2, col: 9 },
    { number: 34, status: 'empty', type: 'Normal', row: 4, col: 9 },
    { number: 33, status: 'empty', type: 'Normal', row: 5, col: 9 },

    { number: 40, status: 'empty', type: 'Normal', row: 1, col: 10 },
    { number: 39, status: 'empty', type: 'Normal', row: 2, col: 10 },
    { number: 38, status: 'empty', type: 'Normal', row: 4, col: 10 },
    { number: 37, status: 'empty', type: 'Normal', row: 5, col: 10 },

    // Remaining seats (41-45)
    { number: 45, status: 'empty', type: 'Normal', row: 1, col: 11 }, // End of row 1
    { number: 44, status: 'empty', type: 'Normal', row: 2, col: 11 }, // End of row 2
    { number: 43, status: 'empty', type: 'Normal', row: 3, col: 11 }, // Isolated middle
    { number: 42, status: 'empty', type: 'Normal', row: 4, col: 11 }, // End of row 4
    { number: 41, status: 'empty', type: 'Normal', row: 5, col: 11 }, // End of row 5
  ].map(seat => ({ ...seat, gridArea: `s${seat.number}` })); // Add gridArea for CSS

  const initialRouteData = {
    id: routeId || 'lamu-malindi-nairobi',
    company: 'LAMU-MPK-NBI VIA MLD',
    busType: '47 SEATER A', // This might be dynamically adjusted if 45 seats is a fixed layout
    departureTime: '06:30 PM',
    arrivalTime: '05:30 AM',
    rating: 5,
    fares: {
      vip: 2000,
      bclass: 1800,
      normal: 1500
    },
    amenities: [
      { icon: 'bi-wifi', label: 'WiFi' },
      { icon: 'bi-lightning-charge-fill', label: 'Power Outlet' },
      { icon: 'bi-bus-front-fill', label: 'Comfortable Seating' },
    ],
    seatLayout: baseSeatLayout,
  };

  const [route, setRoute] = useState(initialRouteData);
  const [selectedSeats, setSelectedSeats] = useState([]);
  // Make boarding/dropping points optional by initializing to empty string
  const [selectedBoardingPoint, setSelectedBoardingPoint] = useState('');
  const [selectedDroppingPoint, setSelectedDroppingPoint] = useState('');


  // Assuming 'normal' is the default fare type from the screenshot example.
  const [fareType, setFareType] = useState('normal');

  useEffect(() => {
    // Set initial booked seats based on screenshot (seat 1, 5)
    // Seat 45 is now a regular seat, so it's not marked as 'booked' by default here.
    const updatedSeatLayout = initialRouteData.seatLayout.map(s => {
      if (s.number === 1 || s.number === 5) { // Example booked seats
        return { ...s, status: 'booked' };
      }
      return s;
    });
    setRoute(prev => ({ ...prev, seatLayout: updatedSeatLayout }));
  }, [routeId]);


  const handleSeatClick = (seatNumber) => {
    setRoute(prevRoute => {
      const updatedSeatLayout = prevRoute.seatLayout.map(seat => {
        if (seat.number === seatNumber) {
          if (seat.status === 'empty') {
            setSelectedSeats(prevSelected => [...new Set([...prevSelected, seatNumber])]); // Use Set to ensure uniqueness
            return { ...seat, status: 'selected' };
          } else if (seat.status === 'selected') {
            setSelectedSeats(prevSelected => prevSelected.filter(num => num !== seatNumber));
            return { ...seat, status: 'empty' };
          }
          // If status is 'booked', do nothing (already handled by cursor: not-allowed)
        }
        return seat;
      });
      return { ...prevRoute, seatLayout: updatedSeatLayout };
    });
  };

  const handleContinueToPayment = () => {
    if (selectedSeats.length === 0) {
      alert('Please select at least one seat.'); // Replace with custom modal in a real app
      return;
    }
    // Prepare booking details to pass to the payment page
    const bookingDetails = {
      routeId: route.id,
      selectedSeats: selectedSeats,
      fareType: fareType,
      totalAmount: selectedSeats.length * route.fares[fareType],
      company: route.company,
      departureTime: route.departureTime,
      arrivalTime: route.arrivalTime,
      boardingPoint: selectedBoardingPoint, // Pass selected boarding point (can be empty)
      droppingPoint: selectedDroppingPoint, // Pass selected dropping point (can be empty)
      originLocation: originLocationFromRoutes, // Pass the main origin
      destinationLocation: destinationLocationFromRoutes, // Pass the main destination
    };
    navigateTo('mpesaPayment', bookingDetails);
  };

  if (!route) {
    return <div className="text-center py-5">Loading route details...</div>;
  }

  const selectedSeatNumbersDisplay = selectedSeats.length > 0 ? selectedSeats.join(', ') : '0';
  const totalFare = selectedSeats.length * route.fares[fareType];

  return (
    <div className="container py-4">
      <div className="card shadow-sm mb-4">
        <div className="card-body row">
          <div className="col-md-8"> {/* Left side for seat map and legend */}
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5 className="mb-0 text-muted">Customise Your Journey</h5>
              <i className="bi bi-x-circle-fill text-danger fs-4 cursor-pointer"></i> {/* Close icon */}
            </div>

            {/* Fare Legend (Top Left) */}
            <div className="mb-4 p-3" style={{ backgroundColor: '#fff9e6', borderRadius: '8px' }}>
              {Object.entries(route.fares).map(([key, value]) => (
                <div key={key} className="d-flex align-items-center mb-1">
                  <input
                    className="form-check-input me-2"
                    type="radio"
                    name="fareType"
                    id={`fare-${key}`}
                    value={key}
                    checked={fareType === key}
                    onChange={() => setFareType(key)}
                  />
                  <label className="form-check-label" htmlFor={`fare-${key}`}>
                    <span className={`fare-legend-dot ${key}`}></span>
                    <strong className="text-uppercase me-1">{key}:</strong> KES {value.toLocaleString()}.00
                  </label>
                </div>
              ))}
            </div>

            {/* Seat Map */}
            <div className="seat-map-grid border p-3 rounded position-relative">
              {/* Render dynamic seats */}
              {route.seatLayout.map((seat) => (
                <div
                  key={seat.number} // Key is unique: seat.number
                  className={`seat ${seat.status}`} // Removed driver-seat class
                  style={{ gridArea: seat.gridArea, cursor: seat.status === 'booked' ? 'not-allowed' : 'pointer' }}
                  onClick={() => handleSeatClick(seat.number)}
                >
                  <img
                    src={
                      seat.status === 'booked'
                        ? bookedSeat
                        : seat.status === 'selected'
                          ? selectedSeat
                          : emptySeat
                    }
                    alt={`Seat ${seat.number}`}
                    className="seat-image"
                  />
                  <span className="seat-number">{seat.number}</span>
                </div>
              ))}
            </div>

            {/* Legend (Bottom Right of Left Panel) */}
            <div className="d-flex justify-content-end align-items-center gap-3 mt-3">
                <div className="legend-item">
                    <img src={emptySeat} style={{width: '50px', height: '50px'}}/>
                    <span>Available Seat</span>
                </div>

                <div className="legend-item">
                  <img src={selectedSeat} style={{width: '50px', height: '50px'}}/>
                  <span>Selected Seats</span>
                </div>
                <div className="legend-item">
                  <img src={bookedSeat} style={{width: '50px', height: '50px'}}/>
                  <span>Booked seats</span>
                </div>
            </div>

          </div>

          <div className="col-md-4"> {/* Right side for Boarding & Dropping */}
            <div className="card border-0 shadow-sm">
                <div className="card-header bg-danger text-white py-2">
                    <h5 className="mb-0 card-title h6"><i className="bi bi-geo-alt-fill me-2"></i>Boarding & Dropping</h5>
                </div>
                <div className="card-body">
                    <div className="mb-3">
                        <label htmlFor="boardingPoint" className="form-label visually-hidden">Boarding Point</label>
                        <select className="form-select" id="boardingPoint">
                            <option>Boarding Point</option>
                            {/* Add actual options here */}
                            <option>Nairobi CBD</option>
                            <option>Malindi Town</option>
                        </select>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="droppingPoint" className="form-label visually-hidden">Dropping Point</label>
                        <select className="form-select" id="droppingPoint">
                            <option>Dropping Point</option>
                            {/* Add actual options here */}
                            <option>Lamu Old Town</option>
                            <option>Mombasa Road</option>
                        </select>
                    </div>
                    <div className="mb-3">
                        <label className="form-label fw-bold">Seats</label>
                        <div className="d-flex align-items-center justify-content-between">
                            <div className="d-flex align-items-center gap-2">
                                <i className="bi bi-journal-check fs-4"></i>
                                <span className="fs-5">{selectedSeatNumbersDisplay}</span>
                            </div>
                            <div>
                                <span className="text-danger fw-bold">FARE: {totalFare.toLocaleString()}.00</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
          </div>
        </div>

        <div className="card-footer d-flex justify-content-end align-items-center p-0"> {/* Footer for Continue button */}
          <Button
            onClick={handleContinueToPayment}
            iconClass="bi bi-chevron-right"
            disabled={selectedSeats.length === 0} // Only disable if no seats are selected
          >
            CONTINUE
          </Button>
        </div>
      </div>
    </div>
  );
}