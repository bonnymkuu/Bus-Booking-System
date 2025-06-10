import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

export default function Book() {
  const { id } = useParams(); // Get the route ID from the URL

  // Placeholder data for the specific route shown in the screenshot
  // In a real application, you would fetch this data from an API based on the 'id'
  const routeData = {
    id: 'lamu-malindi-nairobi',
    company: 'LAMU-MPK-NBI VIA MLD', // Bus name
    busType: '47 SEATER A', //
    departureTime: '06:30 PM', //
    arrivalTime: '05:30 AM', //
    rating: 5, // 5 stars
    fares: {
      normal: 2500, // KES
      vip: 2500,   // KES
      bclass: 2000 // KES
    },
    // Example amenities (as icons from screenshot)
    amenities: [
        { icon: 'bi-wifi', label: 'WiFi' },
        { icon: 'bi-lightning-charge-fill', label: 'Power Outlet' },
        { icon: 'bi-bus-front-fill', label: 'Comfortable Seating' },
    ],
    // Initial seat map configuration (based on screenshot's layout and numbers)
    // 'available', 'booked', 'selected'
    // Seat numbers are manually mapped to positions for this specific layout.
    seatLayout: [
      { number: 4, status: 'available', type: 'Normal', row: 1, col: 1 },
      { number: 8, status: 'available', type: 'Normal', row: 1, col: 2 },
      { number: 12, status: 'available', type: 'Normal', row: 1, col: 3 },
      { number: 16, status: 'available', type: 'Normal', row: 1, col: 4 },
      { number: 20, status: 'available', type: 'Normal', row: 1, col: 5 },
      { number: 24, status: 'available', type: 'Normal', row: 1, col: 6 },
      { number: 28, status: 'available', type: 'Normal', row: 1, col: 7 },
      { number: 32, status: 'available', type: 'Normal', row: 1, col: 8 },
      { number: 36, status: 'available', type: 'Normal', row: 1, col: 9 },
      { number: 40, status: 'available', type: 'Normal', row: 1, col: 10 },
      { number: 42, status: 'available', type: 'Normal', row: 1, col: 11 },
      { number: 47, status: 'available', type: 'Normal', row: 1, col: 12 },

      { number: 3, status: 'available', type: 'Normal', row: 2, col: 1 },
      { number: 7, status: 'available', type: 'Normal', row: 2, col: 2 },
      { number: 11, status: 'available', type: 'Normal', row: 2, col: 3 },
      { number: 15, status: 'available', type: 'Normal', row: 2, col: 4 },
      { number: 19, status: 'available', type: 'Normal', row: 2, col: 5 },
      { number: 23, status: 'available', type: 'Normal', row: 2, col: 6 },
      { number: 27, status: 'available', type: 'Normal', row: 2, col: 7 },
      { number: 31, status: 'available', type: 'Normal', row: 2, col: 8 },
      { number: 35, status: 'available', type: 'Normal', row: 2, col: 9 },
      { number: 39, status: 'available', type: 'Normal', row: 2, col: 10 },
      { number: 41, status: 'available', type: 'Normal', row: 2, col: 11 },
      { number: 46, status: 'booked', type: 'Normal', row: 2, col: 12 }, // Assuming 46 is booked from screenshot "46 seats available" implies one is booked

      { number: 2, status: 'available', type: 'Normal', row: 4, col: 1 },
      { number: 6, status: 'available', type: 'Normal', row: 4, col: 2 },
      { number: 10, status: 'available', type: 'Normal', row: 4, col: 3 },
      { number: 14, status: 'available', type: 'Normal', row: 4, col: 4 },
      { number: 18, status: 'available', type: 'Normal', row: 4, col: 5 },
      { number: 22, status: 'available', type: 'Normal', row: 4, col: 6 },
      { number: 26, status: 'available', type: 'Normal', row: 4, col: 7 },
      { number: 30, status: 'available', type: 'Normal', row: 4, col: 8 },
      { number: 34, status: 'available', type: 'Normal', row: 4, col: 9 },
      { number: 38, status: 'available', type: 'Normal', row: 4, col: 10 },
      { number: 44, status: 'available', type: 'Normal', row: 4, col: 11 },

      { number: 1, status: 'available', type: 'Normal', row: 5, col: 1 },
      { number: 5, status: 'available', type: 'Normal', row: 5, col: 2 },
      { number: 9, status: 'available', type: 'Normal', row: 5, col: 3 },
      { number: 13, status: 'available', type: 'Normal', row: 5, col: 4 },
      { number: 17, status: 'available', type: 'Normal', row: 5, col: 5 },
      { number: 21, status: 'available', type: 'Normal', row: 5, col: 6 },
      { number: 25, status: 'available', type: 'Normal', row: 5, col: 7 },
      { number: 29, status: 'available', type: 'Normal', row: 5, col: 8 },
      { number: 33, status: 'available', type: 'Normal', row: 5, col: 9 },
      { number: 37, status: 'available', type: 'Normal', row: 5, col: 10 },
      { number: 43, status: 'available', type: 'Normal', row: 5, col: 11 },
      { number: 45, status: 'available', type: 'Normal', row: 3, col: 11}, // Special placement for seat 45 based on screenshot
    ],
    boardingPoints: ['Malindi Bus Station', 'Malindi Town Center'],
    droppingPoints: ['Nairobi CBD', 'Nairobi Railways', 'ABC Place Nairobi'],
  };

  const [selectedSeats, setSelectedSeats] = useState([]);
  const [selectedFareType, setSelectedFareType] = useState('normal'); // Default to Normal
  const [boardingPoint, setBoardingPoint] = useState('');
  const [droppingPoint, setDroppingPoint] = useState('');
  const [seatsData, setSeatsData] = useState(routeData.seatLayout); // Manage seat status in state

  const today = new Date();
  const futureDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 15); // Example date from screenshot
  const formattedDate = futureDate.toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' });


  useEffect(() => {
    // In a real app, fetch route details here based on 'id'
    // For now, using hardcoded routeData
  }, [id]);

  const handleSeatClick = (seatNumber) => {
    setSeatsData(prevSeatsData => {
      return prevSeatsData.map(seat => {
        if (seat.number === seatNumber) {
          if (seat.status === 'available') {
            setSelectedSeats(prev => [...prev, seatNumber]);
            return { ...seat, status: 'selected' };
          } else if (seat.status === 'selected') {
            setSelectedSeats(prev => prev.filter(s => s !== seatNumber));
            return { ...seat, status: 'available' };
          }
        }
        return seat;
      });
    });
  };

  const calculateTotalFare = () => {
    const farePerSeat = routeData.fares[selectedFareType] || 0;
    return selectedSeats.length * farePerSeat;
  };

  const handleContinue = () => {
    if (selectedSeats.length === 0) {
      alert('Please select at least one seat.');
      return;
    }
    if (!boardingPoint || !droppingPoint) {
      alert('Please select boarding and dropping points.');
      return;
    }
    // Proceed to next step (e.g., payment, confirmation)
    console.log({
      selectedSeats,
      selectedFareType,
      boardingPoint,
      droppingPoint,
      totalFare: calculateTotalFare()
    });
    alert('Booking details collected. Proceeding to payment (console for details).');
    // Implement actual navigation to payment page or confirmation.
  };

  // Helper to get seat class based on status
  const getSeatClass = (seat) => {
    if (seat.status === 'booked') {
      return 'bg-gray-400 cursor-not-allowed'; // Booked seats
    } else if (seat.status === 'selected') {
      return 'bg-blue-600 text-white'; // Selected seats
    } else {
      return 'bg-blue-200 hover:bg-blue-300 cursor-pointer'; // Available seats
    }
  };

  // Organize seats by row for rendering
  const seatsByRow = seatsData.reduce((acc, seat) => {
    if (!acc[seat.row]) {
      acc[seat.row] = [];
    }
    acc[seat.row][seat.col] = seat;
    return acc;
  }, {});

  const maxCol = Math.max(...seatsData.map(s => s.col));
  const maxRow = Math.max(...seatsData.map(s => s.row));

  const renderSeatRow = (row) => {
    const rowSeats = seatsByRow[row] || [];
    const rowElements = [];
    for (let i = 1; i <= maxCol; i++) {
      const seat = rowSeats[i];
      if (seat) {
        rowElements.push(
          <button
            key={seat.number}
            className={`w-10 h-10 flex items-center justify-center rounded text-sm font-semibold m-1 ${getSeatClass(seat)}`}
            onClick={() => handleSeatClick(seat.number)}
            disabled={seat.status === 'booked'}
          >
            {seat.number}
          </button>
        );
      } else {
        // Render empty space for layout alignment (e.g., for the aisle)
        rowElements.push(<div key={`empty-${row}-${i}`} className="w-10 h-10 m-1"></div>);
      }
    }
    return rowElements;
  };


  return (
    <div className="container py-5">
      {/* Route Header */}
      <div className="text-center mb-5">
        <h3 className="text-2xl font-bold text-gray-800">MALINDI &gt; NAIROBI</h3>
        <p className="text-gray-600">Date: {formattedDate}</p>
      </div>

      {/* Main Content Area */}
      <div className="row justify-content-center">
        <div className="col-lg-10">
          <div className="card shadow-lg p-4 mb-4">
            <div className="card-body">
              {/* Bus Info Section */}
              <div className="d-flex align-items-center mb-4 pb-3 border-bottom">
                <i className="bi bi-bus-front-fill display-5 text-danger me-3"></i>
                <div>
                  <h4 className="mb-0 fw-bold">{routeData.company}</h4>
                  <p className="text-muted mb-1">{routeData.busType}</p>
                  <p className="text-muted mb-0">{routeData.departureTime} - {routeData.arrivalTime}</p>
                </div>
                <div className="ms-auto text-end">
                  <div className="text-warning">
                    {'★'.repeat(routeData.rating)}{'☆'.repeat(5 - routeData.rating)} {/* Stars */}
                  </div>
                  <p className="mb-0 text-success fw-bold">{routeData.seats} seats available</p>
                </div>
              </div>

              {/* Customise Your Journey & Legend */}
              <div className="mb-4 d-flex justify-content-between align-items-center bg-light p-3 rounded">
                <div>
                  <h5 className="fw-bold mb-2">Customise Your Journey</h5>
                  <p className="mb-1"><span className="fw-bold text-danger">Normal:</span> KES {routeData.fares.normal.toLocaleString()}</p>
                  <p className="mb-1"><span className="fw-bold text-success">Vip:</span> KES {routeData.fares.vip.toLocaleString()}</p>
                  <p className="mb-0"><span className="fw-bold text-info">Bclass:</span> KES {routeData.fares.bclass.toLocaleString()}</p>
                </div>
                <div className="d-flex align-items-center">
                  <span className="me-2 text-muted">Available Seat</span> <div className="seat-legend available me-3"></div>
                  <span className="me-2 text-muted">Selected Seats</span> <div className="seat-legend selected me-3"></div>
                  <span className="me-2 text-muted">Booked seats</span> <div className="seat-legend booked"></div>
                </div>
              </div>
              
              {/* Seat Map Layout */}
              <div className="bus-layout bg-warning-subtle p-4 rounded mb-4 position-relative">
                <div className="door-indicator position-absolute">Door</div> {/* Door indicator */}

                {/* Seat Rows - dynamically rendered based on seatLayout */}
                <div className="d-flex flex-column align-items-center">
                  {Array.from({ length: maxRow }).map((_, rowIndex) => (
                    <div key={rowIndex} className="d-flex my-1">
                      {renderSeatRow(rowIndex + 1)}
                    </div>
                  ))}
                </div>
              </div>

              {/* Boarding & Dropping Points */}
              <div className="mb-4">
                <h5 className="fw-bold mb-3">Boarding & Dropping</h5>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <select
                      className="form-select"
                      value={boardingPoint}
                      onChange={(e) => setBoardingPoint(e.target.value)}
                      required
                    >
                      <option value="">Select Boarding Point</option>
                      {routeData.boardingPoints.map(point => (
                        <option key={point} value={point}>{point}</option>
                      ))}
                    </select>
                  </div>
                  <div className="col-md-6 mb-3">
                    <select
                      className="form-select"
                      value={droppingPoint}
                      onChange={(e) => setDroppingPoint(e.target.value)}
                      required
                    >
                      <option value="">Select Dropping Point</option>
                      {routeData.droppingPoints.map(point => (
                        <option key={point} value={point}>{point}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Fare Summary */}
              <div className="d-flex justify-content-between align-items-center bg-light p-3 rounded">
                <div className="fw-bold">Seats: {selectedSeats.length}</div>
                <div className="fw-bold text-danger">FARE: KES {calculateTotalFare().toLocaleString()}</div>
              </div>
            </div>
          </div>
          
          {/* Continue Button */}
          <div className="text-center mt-4">
            <button 
              onClick={handleContinue} 
              className="btn btn-danger btn-lg px-5 py-3" // Using danger color for consistency
            >
              CONTINUE <i className="bi bi-arrow-right ms-2"></i>
            </button>
          </div>
        </div>
      </div>

      {/* Custom CSS for seat map legend and layout */}
      <style>{`
        .seat-legend {
          width: 20px;
          height: 20px;
          border-radius: 4px;
          display: inline-block;
          vertical-align: middle;
        }
        .seat-legend.available { background-color: #bee3f8; } /* bg-blue-200 */
        .seat-legend.selected { background-color: #2b6cb0; } /* bg-blue-700 */
        .seat-legend.booked { background-color: #a0aec0; } /* bg-gray-400 */

        .bus-layout {
          display: grid;
          grid-template-columns: repeat(12, 1fr); /* Adjust based on max columns */
          gap: 5px;
          min-height: 300px; /* Ensure space for seats */
          position: relative;
          padding-top: 50px; /* Space for the "Driver" text */
          padding-bottom: 20px;
        }
        .door-indicator {
            position: absolute;
            bottom: 10px; /* Adjust as needed */
            left: 10px; /* Adjust as needed */
            font-size: 0.8em;
            color: #666;
            transform: rotate(-90deg); /* To match screenshot orientation */
            transform-origin: bottom left;
        }

        .bus-layout > div {
            display: contents; /* Allows child elements to be positioned by grid directly */
        }
        .bus-layout button {
            grid-column: span 1; /* Each button takes 1 grid column */
        }

        /* Specific seat positioning based on screenshot */
        .bus-layout .seat-1 { grid-row: 5; grid-column: 1; }
        .bus-layout .seat-2 { grid-row: 4; grid-column: 1; }
        .bus-layout .seat-3 { grid-row: 2; grid-column: 1; }
        .bus-layout .seat-4 { grid-row: 1; grid-column: 1; }
        /* ... and so on for all seats, mapping to the grid */

        /* Using grid area for specific layout might be more precise for complex layouts */
        .seat-map-grid {
            display: grid;
            grid-template-areas:
                ". s4 s8 s12 s16 s20 s24 s28 s32 s36 s40 s42 s47"
                ". s3 s7 s11 s15 s19 s23 s27 s31 s35 s39 s41 s46"
                "d . . . . . . . . . . . s45"
                ". s2 s6 s10 s14 s18 s22 s26 s30 s34 s38 s44 ."
                ". s1 s5 s9 s13 s17 s21 s25 s29 s33 s37 s43 .";
            gap: 5px;
            padding: 20px;
            background-color: #fff9e6; /* yellow-subtle */
            border-radius: 8px;
            position: relative;
            justify-content: center;
        }
        .seat-map-grid .door { grid-area: d; align-self: end; justify-self: start; transform: rotate(-90deg); }

        /* General seat styling */
        .seat {
            width: 40px;
            height: 40px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 4px;
            font-weight: 600;
            cursor: pointer;
            transition: background-color 0.2s ease-in-out;
        }
        .seat.available { background-color: #bee3f8; } /* bg-blue-200 */
        .seat.selected { background-color: #2b6cb0; color: white; } /* bg-blue-700 */
        .seat.booked { background-color: #a0aec0; cursor: not-allowed; } /* bg-gray-400 */
      `}</style>
    </div>
  );
}