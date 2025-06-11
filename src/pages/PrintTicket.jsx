import React, { useState } from 'react';
import Ticket from '../assets/images/ticket.png';
import Background from '../assets/images/interior.png';
import { jsPDF } from 'jspdf';

export default function PrintTicket() {
  const [ticketDetails, setTicketDetails] = useState({
    ticketNo: '',
    countryCode: '',
    phone: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTicketDetails(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleCreatePDF = (e) => {
    e.preventDefault();

    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text('Buscar Ticket Details', 20, 20);

    doc.setFontSize(14);
    doc.text(`Ticket No: ${ticketDetails.ticketNo}`, 20, 40);
    doc.text(`Country Code: ${ticketDetails.countryCode}`, 20, 50);
    doc.text(`Phone: ${ticketDetails.phone}`, 20, 60);

    doc.save(`ticket_${ticketDetails.ticketNo}.pdf`);

    setTicketDetails({
      ticketNo: '',
      countryCode: '',
      phone: ''
    });
  };

  return (
    <div
      className="container-fluid py-5"
      style={{
        backgroundImage: `url(${Background})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        minHeight: '100vh',
        position: 'relative'
      }}
    >
      <div className="container"
       style={{
        alignItems: 'center',
        paddingTop: '30px',
        paddingBottom: '20px',
        backgroundColor: 'rgba(255, 255, 255, 0.65)',
        borderRadius: '20px',
        zIndex: 0
      }}>

      <div className="position-relative" style={{ zIndex: 1 }}>
        <div className="d-flex flex-column align-items-center mb-4">
          <img src={Ticket} alt="Ticket" className='sizing'/>
          <h2 className="text-center h3 fw-bold mb-4">Print Ticket</h2>
        </div>

        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-4">
            <div className="card shadow p-4 border-0">
              <form onSubmit={handleCreatePDF}>
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Ticket No"
                    name="ticketNo"
                    value={ticketDetails.ticketNo}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="row mb-3 g-3">
                  <div className="col-5">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Country Code"
                      name="countryCode"
                      value={ticketDetails.countryCode}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="col-7">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Phone"
                      name="phone"
                      value={ticketDetails.phone}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div className="d-grid">
                  <button type="submit" className="btn btn-primary d-flex align-items-center justify-content-center">
                    <i className="bi bi-file-earmark-pdf-fill me-2"></i> Create PDF
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}
