import React, { useState, useEffect } from 'react';

export default function MpesaPayment({ navigateTo, bookingDetails }) {
  const {
    routeId,
    selectedSeats,
    fareType,
    totalAmount,
    company,
    departureTime,
    arrivalTime,
  } = bookingDetails || {};

  const [passengers, setPassengers] = useState([]);
  const [showMessageBox, setShowMessageBox] = useState(false);
  const [messageText, setMessageBoxText] = useState('');
  const [isLoading, setIsLoading] = useState(false); // New loading state

  useEffect(() => {
    if (selectedSeats && selectedSeats.length > 0) {
      setPassengers(
        selectedSeats.map(seatNumber => ({
          seatNumber: seatNumber,
          name: '',
          age: '',
          code: '',
          phone: '',
          gender: '',
          nationality: '',
          nationalId: '',
        }))
      );
    } else {
      setPassengers([]);
    }
  }, [selectedSeats]);

  const handlePassengerChange = (index, field, value) => {
    const updatedPassengers = [...passengers];
    updatedPassengers[index][field] = value;
    setPassengers(updatedPassengers);
  };

  const showCustomAlert = (message) => {
    setMessageBoxText(message);
    setShowMessageBox(true);
  };

  const closeCustomAlert = () => {
    setShowMessageBox(false);
    setMessageBoxText('');
  };

  const handleMakePayment = async () => { // Made the function async
    // Basic validation for passenger details
    const allFieldsFilled = passengers.every(p =>
      p.name && p.age && p.code && p.phone && p.gender && p.nationality && p.nationalId
    );

    if (!allFieldsFilled) {
      showCustomAlert('Please fill in all passenger details for all selected seats.');
      return;
    }

    // Get the primary passenger's phone number for payment
    // Assuming the first passenger in the list is the primary payer.
    const payerPhoneNumber = passengers[0]?.phone;
    const payerPhoneCode = passengers[0]?.code; // Get the country code

    if (!payerPhoneNumber || !payerPhoneCode) {
      showCustomAlert('Please provide a phone number for the primary passenger to initiate payment.');
      return;
    }

    setIsLoading(true); // Start loading state
    showCustomAlert('Initiating payment... Please wait.'); // Inform user about payment initiation

    try {
      // Simulate an API call to a payment gateway
      // In a real application, this would be a fetch() call to your backend
      // which then communicates with Mpesa or another payment provider.
      console.log(`Simulating payment for ${totalAmount} KES to ${payerPhoneCode}${payerPhoneNumber}`);

      // Simulate network delay and API response
      const response = await new Promise(resolve => setTimeout(() => {
        // Simulate a successful USSD push
        resolve({ success: true, message: `USSD push sent to ${payerPhoneCode}${payerPhoneNumber}. Please enter your Mpesa PIN on your phone.` });
        // Simulate a payment failure
        // resolve({ success: false, message: 'Payment initiation failed. Please try again later.' });
      }, 3000)); // 3 second delay to simulate API call

      if (response.success) {
        showCustomAlert(response.message);
        // In a real app, you might navigate to a success page or update booking status here
      } else {
        showCustomAlert(response.message);
      }

    } catch (error) {
      console.error('Payment initiation error:', error);
      showCustomAlert('An error occurred during payment. Please try again.');
    } finally {
      setIsLoading(false); // End loading state
    }
  };

  return (
    <div className="container py-4">
      {/* Custom Alert Message Box (Bootstrap Modal like structure) */}
      {showMessageBox && (
        <div className="modal fade show d-block" tabIndex="-1" role="dialog" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-body text-center py-4">
                {isLoading && (
                  <div className="spinner-border text-primary mb-3" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                )}
                <p className="lead mb-4">{messageText}</p>
                {!isLoading && ( // Only show OK button when not loading
                  <button
                    type="button"
                    className="btn btn-primary px-4"
                    onClick={closeCustomAlert}
                  >
                    OK
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="mb-4">
        <button onClick={() => navigateTo('book', { id: routeId })} className="btn btn-link text-decoration-none p-0 d-flex align-items-center">
          <i className="bi bi-chevron-left me-2"></i>Modify Trip
        </button>
      </div>

      <div className="row g-4"> {/* Use row and g-4 for gap */}
        {/* Left Section: Passengers and Outbound Trip */}
        <div className="col-12 col-md-7"> {/* Adjust column widths for better layout */}
          <div className="card shadow-sm mb-4"> {/* Card for Passengers */}
            <div className="card-body">
              <h3 className="card-title h5 mb-4">Passengers</h3>

              {passengers.map((passenger, index) => (
                <div key={passenger.seatNumber} className="mb-4 p-3 rounded-lg border bg-light">
                  <p className="fw-semibold mb-3">
                    {index === 0 ? 'Primary Passenger' : `Passenger ${index + 1}`}
                    <span className="text-muted small"> Seat: {passenger.seatNumber}</span>
                  </p>
                  <div className="row g-3"> {/* Nested row for passenger inputs */}
                    <div className="col-sm-6">
                      <input
                        type="text"
                        placeholder="Name *"
                        className="form-control"
                        value={passenger.name}
                        onChange={(e) => handlePassengerChange(index, 'name', e.target.value)}
                      />
                    </div>
                    <div className="col-sm-6">
                      <input
                        type="number"
                        placeholder="Age *"
                        className="form-control"
                        value={passenger.age}
                        onChange={(e) => handlePassengerChange(index, 'age', e.target.value)}
                      />
                    </div>
                    <div className="col-sm-6">
                      <select
                        className="form-select"
                        value={passenger.code}
                        onChange={(e) => handlePassengerChange(index, 'code', e.target.value)}
                      >
                        <option value="">Code *</option>
                        <option value="+254">+254 (Kenya)</option>
                        <option value="+255">+255 (Tanzania)</option>
                        {/* Add more country codes */}
                      </select>
                    </div>
                    <div className="col-sm-6">
                      <input
                        type="tel"
                        placeholder="Phone"
                        className="form-control"
                        value={passenger.phone}
                        onChange={(e) => handlePassengerChange(index, 'phone', e.target.value)}
                      />
                    </div>
                    <div className="col-12 col-sm-6 d-flex align-items-center">
                      <div className="form-check me-4">
                        <input
                          className="form-check-input"
                          type="radio"
                          name={`gender-${index}`}
                          id={`female-${index}`}
                          value="Female"
                          checked={passenger.gender === 'Female'}
                          onChange={(e) => handlePassengerChange(index, 'gender', e.target.value)}
                        />
                        <label className="form-check-label" htmlFor={`female-${index}`}>
                          Female
                        </label>
                      </div>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          name={`gender-${index}`}
                          id={`male-${index}`}
                          value="Male"
                          checked={passenger.gender === 'Male'}
                          onChange={(e) => handlePassengerChange(index, 'gender', e.target.value)}
                        />
                        <label className="form-check-label" htmlFor={`male-${index}`}>
                          Male
                        </label>
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <input
                        type="text"
                        placeholder="Nationality *"
                        className="form-control"
                        value={passenger.nationality}
                        onChange={(e) => handlePassengerChange(index, 'nationality', e.target.value)}
                      />
                    </div>
                    <div className="col-sm-6">
                      <input
                        type="text"
                        placeholder="National ID *"
                        className="form-control"
                        value={passenger.nationalId}
                        onChange={(e) => handlePassengerChange(index, 'nationalId', e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="card shadow-sm"> {/* Card for Outbound Trip */}
            <div className="card-body">
              <h3 className="card-title h5 mb-4">Outbound Trip</h3>
              <div className="bg-light p-3 rounded d-flex justify-content-between align-items-center text-sm mb-4">
                <span className="fw-semibold text-success">NAIROBI to MOMBASA | 27 Jun 2025</span>
                <span>Seat(s): {selectedSeats.join(', ')}</span>
              </div>
              <div className="d-flex align-items-start gap-3">
                <div className="flex-shrink-0 text-center">
                  <i className="bi bi-bus-front-fill fs-2 text-muted"></i>
                  <p className="small text-muted mb-0">{company}</p>
                  <p className="small text-muted">NBI-MSA</p>
                </div>
                <div className="flex-grow row g-2 text-sm"> {/* Use row for inner grid */}
                  <div className="col-4">
                    <p className="fw-semibold mb-1">Depart</p>
                    <p className="mb-0">NAIROBI</p>
                    <p className="text-muted small mb-0">{departureTime}</p>
                    <p className="text-muted small mb-0">Boarding</p>
                    <p className="text-muted small">Eastleigh</p> {/* Example specific boarding point */}
                  </div>
                  <div className="col-4">
                    <p className="fw-semibold mb-1">Arrive</p>
                    <p className="mb-0">MOMBASA</p>
                    <p className="text-muted small mb-0">{arrivalTime}</p>
                    <p className="text-muted small mb-0">Dropping</p>
                    <p className="text-muted small"></p> {/* Example specific dropping point */}
                  </div>
                  <div className="col-4 text-end">
                    <p className="fw-semibold mb-1">Total:</p>
                    <p className="fs-5 fw-bold">{totalAmount.toLocaleString()}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section: Trip Summary */}
        <div className="col-12 col-md-5"> {/* Adjust column widths for better layout */}
          <div className="card shadow-sm">
            <div className="card-body">
              <h3 className="card-title h4 mb-4">Trip Summary</h3>
              <div className="d-flex justify-content-between align-items-center mb-2 fs-5">
                <span>Onward Trip</span>
                <span>{totalAmount.toLocaleString()}.00</span>
              </div>
              <hr className="my-3" />
              <div className="d-flex justify-content-between align-items-center mb-4 fs-4 fw-bold">
                <span>Total(inc.VAT)</span>
                <span>KSH {totalAmount.toLocaleString()}.00</span>
              </div>
              <button
                onClick={handleMakePayment}
                className="btn btn-danger w-100 py-3 text-white fw-bold rounded-lg" // Using btn-danger as a close match for pink, added rounded-lg for rounded corners
                disabled={isLoading} // Disable button during loading
                style={{ backgroundColor: '#ff69b4', borderColor: '#ff69b4' }} // Custom pink color if needed
              >
                {isLoading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    Initiating...
                  </>
                ) : (
                  'Make Payment'
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
