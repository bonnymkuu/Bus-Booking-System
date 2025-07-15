import React, { useState, useEffect } from "react";
import Button from "../components/Button"; // Ensure this path is correct

export default function MpesaPayment({ navigateTo, bookingDetails }) {
  const {
    routeId,
    selectedSeats,
    fareType,
    totalAmount,
    company,
    departureTime,
    arrivalTime,
    boardingPoint,
    droppingPoint,
    originLocation,
    destinationLocation,
  } = bookingDetails || {};

  const [passengers, setPassengers] = useState([]);
  const [showMessageBox, setShowMessageBox] = useState(false);
  const [messageText, setMessageBoxText] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (selectedSeats && selectedSeats.length > 0) {
      setPassengers(
        selectedSeats.map((seatNumber) => ({
          seatNumber: seatNumber,
          name: "",
          age: "",
          code: "",
          phone: "",
          gender: "",
          nationality: "",
          nationalId: "",
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
    setMessageBoxText("");
  };

  const handleMakePayment = async () => {
    const allFieldsFilled = passengers.every(
      (p) => p.name && p.age && p.code && p.phone && p.gender && p.nationality
    );

    if (!allFieldsFilled) {
      showCustomAlert(
        "Please fill in all passenger details for all selected seats."
      );
      return;
    }

    setIsLoading(true);
    showCustomAlert("Initiating payment... Please wait.");

    try {
      const response = await fetch("http://your-backend-url/api/payments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          passengers: passengers.map((p) => ({
            name: p.name,
            age: p.age,
            code: p.code,
            phone: p.phone,
            gender: p.gender,
            nationality: p.nationality,
            seatNumber: p.seatNumber, // ✅ Include seat number
            travelDate: new Date().toISOString().slice(0, 10), // ✅ or pass from props if available
          })),
          amount: totalAmount,
        }),
      });

      const data = await response.json();

      if (data.success) {
        showCustomAlert(
          `Payment request sent. Please enter your M-Pesa PIN on your phone.`
        );
        setBookingReference(data.bookingReference);

        // 🔔 Send SMS to each passenger
        for (const p of passengers) {
          await sendConfirmationSMS(p.phone, p.name, data.bookingReference);
        }

        // Optional: poll payment status
        pollPaymentStatus(data.bookingReference);
      } else {
        showCustomAlert(
          data.error || "Payment initiation failed. Please try again."
        );
      }
    } catch (error) {
      console.error("Payment initiation error:", error);
      showCustomAlert("An error occurred during payment. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const sendConfirmationSMS = async (phoneNumber, name, reference) => {
    const message = `Hi ${name}, your booking request was received. Reference: ${reference}. Thank you!`;

    try {
      const response = await fetch("https://whatsms.p.rapidapi.com/sms/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-RapidAPI-Key": import.meta.env.RAPIDAPI_KEY,
          "X-RapidAPI-Host": "whatsms.p.rapidapi.com",
        },
        body: JSON.stringify({
          to: phoneNumber,
          body: message,
        }),
      });

      const result = await response.json();
      if (result.success) {
        console.log(`SMS sent to ${phoneNumber}`);
      } else {
        console.warn(`SMS failed for ${phoneNumber}:`, result.message);
      }
    } catch (error) {
      console.error(`SMS error for ${phoneNumber}:`, error.message);
    }
  };

  // Optional: Poll payment status
  const pollPaymentStatus = async (bookingReference) => {
    const interval = setInterval(async () => {
      try {
        const response = await fetch(
          `http://your-backend-url/api/payments/status?reference=${bookingReference}`
        );
        const data = await response.json();

        if (data.status === "completed") {
          clearInterval(interval);
          showCustomAlert("Payment completed successfully!");
          // Proceed with booking confirmation
        }
      } catch (error) {
        console.error("Error checking payment status:", error);
      }
    }, 5000); // Check every 5 seconds
  };

  return (
    <div className="container py-4">
      {showMessageBox && (
        <div
          className="modal fade show d-block"
          tabIndex="-1"
          role="dialog"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-body text-center py-4">
                {isLoading && (
                  <div
                    className="spinner-border text-primary mb-3"
                    role="status"
                  >
                    <span className="visually-hidden">Loading...</span>
                  </div>
                )}
                <p className="lead mb-4">{messageText}</p>
                {!isLoading && (
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
        <button
          onClick={() => navigateTo("book", { id: routeId })}
          className="btn btn-link text-decoration-none p-0 d-flex align-items-center"
        >
          <i className="bi bi-chevron-left me-2"></i>Modify Trip
        </button>
      </div>

      <div className="row g-4">
        <div className="col-12 col-md-7">
          <div className="card shadow-sm mb-4">
            <div className="card-body">
              <h3 className="card-title h5 mb-4">Passengers</h3>

              {passengers.map((passenger, index) => (
                <div
                  key={passenger.seatNumber}
                  className="mb-4 p-3 rounded-lg border bg-light"
                >
                  <p className="fw-semibold mb-3">
                    {index === 0
                      ? "Primary Passenger"
                      : `Passenger ${index + 1}`}
                    <span className="text-muted small">
                      {" "}
                      Seat: {passenger.seatNumber}
                    </span>
                  </p>
                  <div className="row g-3">
                    <div className="col-sm-6">
                      <input
                        type="text"
                        placeholder="Name *"
                        className="form-control"
                        value={passenger.name}
                        onChange={(e) =>
                          handlePassengerChange(index, "name", e.target.value)
                        }
                      />
                    </div>
                    <div className="col-sm-6">
                      <input
                        type="number"
                        placeholder="Age *"
                        className="form-control"
                        value={passenger.age}
                        onChange={(e) =>
                          handlePassengerChange(index, "age", e.target.value)
                        }
                      />
                    </div>
                    <div className="col-sm-6">
                      <select
                        className="form-select"
                        value={passenger.code}
                        onChange={(e) =>
                          handlePassengerChange(index, "code", e.target.value)
                        }
                      >
                        <option value="">Code *</option>
                        <option value="+254">+254 (Kenya)</option>
                        <option value="+255">+255 (Tanzania)</option>
                      </select>
                    </div>
                    <div className="col-sm-6">
                      <input
                        type="tel"
                        placeholder="Phone"
                        className="form-control"
                        value={passenger.phone}
                        onChange={(e) =>
                          handlePassengerChange(index, "phone", e.target.value)
                        }
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
                          checked={passenger.gender === "Female"}
                          onChange={(e) =>
                            handlePassengerChange(
                              index,
                              "gender",
                              e.target.value
                            )
                          }
                        />
                        <label
                          className="form-check-label"
                          htmlFor={`female-${index}`}
                        >
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
                          checked={passenger.gender === "Male"}
                          onChange={(e) =>
                            handlePassengerChange(
                              index,
                              "gender",
                              e.target.value
                            )
                          }
                        />
                        <label
                          className="form-check-label"
                          htmlFor={`male-${index}`}
                        >
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
                        onChange={(e) =>
                          handlePassengerChange(
                            index,
                            "nationality",
                            e.target.value
                          )
                        }
                      />
                    </div>
                    <div className="col-sm-6">
                      <input
                        type="text"
                        placeholder="National ID *"
                        className="form-control"
                        value={passenger.nationalId}
                        onChange={(e) =>
                          handlePassengerChange(
                            index,
                            "nationalId",
                            e.target.value
                          )
                        }
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="card shadow-sm">
            <div className="card-body">
              <h3 className="card-title h5 mb-4">Outbound Trip</h3>
              <div className="bg-light p-3 rounded d-flex flex-wrap justify-content-center align-items-center text-center text-sm mb-4">
                {/* Main route origin and destination */}
                <span className="fw-semibold text-primary mx-1 mb-2 mb-sm-0">
                  {originLocation || "N/A"} to {destinationLocation || "N/A"}
                </span>
                {/* Conditionally display boarding/dropping if selected */}
                {boardingPoint && droppingPoint && (
                  <span className="fw-semibold text-success mx-1 mb-2 mb-sm-0">
                    {boardingPoint} to {droppingPoint}
                  </span>
                )}
                <span className="mx-1">
                  Seat(s): {selectedSeats.join(", ")}
                </span>
              </div>
              <div className="d-flex flex-column flex-sm-row align-items-center align-items-sm-start gap-3">
                <div className="flex-shrink-0 text-center mb-3 mb-sm-0">
                  <i className="bi bi-bus-front-fill fs-2 text-muted"></i>
                  <p className="small text-muted mb-0">{company}</p>
                  <p className="small text-muted">
                    {originLocation || "N/A"}-{destinationLocation || "N/A"}
                  </p>
                </div>
                <div className="flex-grow-1 row g-2 text-sm text-center text-sm-start">
                  <div className="col-12 col-sm-4">
                    <p className="fw-semibold mb-1">Depart</p>
                    <p className="mb-0">
                      {boardingPoint || originLocation || "N/A"}
                    </p>
                    <p className="text-muted small mb-0">{departureTime}</p>
                    <p className="text-muted small mb-0">Boarding</p>
                    <p className="text-muted small">
                      {boardingPoint || originLocation || "N/A"}
                    </p>
                  </div>
                  <div className="col-12 col-sm-4">
                    <p className="fw-semibold mb-1">Arrive</p>
                    <p className="mb-0">
                      {droppingPoint || destinationLocation || "N/A"}
                    </p>
                    <p className="text-muted small mb-0">{arrivalTime}</p>
                    <p className="text-muted small mb-0">Dropping</p>
                    <p className="text-muted small">
                      {droppingPoint || destinationLocation || "N/A"}
                    </p>
                  </div>
                  <div className="col-12 col-sm-4 text-center text-sm-end">
                    <p className="fw-semibold mb-1">Total:</p>
                    <p className="fs-5 fw-bold">
                      {totalAmount.toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-12 col-md-5">
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
              <Button onClick={handleMakePayment} disabled={isLoading}>
                {isLoading ? (
                  <>
                    <span
                      className="spinner-border spinner-border-sm me-2"
                      role="status"
                      aria-hidden="true"
                    ></span>
                    Initiating...
                  </>
                ) : (
                  "Make Payment"
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
