import React, { useState, useRef } from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';

export default function RoutesList({ initialSearchParams = {}, navigateTo }) {
  const [searchParams, setSearchParams] = useState({
    from: initialSearchParams.from || 'NAIROBI OFFICE TOWN',
    to: initialSearchParams.to || 'MWEMBE TAYARI OFFICE 1',
    date: initialSearchParams.date || new Date().toISOString().split('T')[0],
  });

  const offices = [
    { name: 'MWEMBE TAYARI OFFICE 1', contact: '0717073333/0731333888' },
    { name: 'MWEMBE TAYARI OFFICE 2', contact: '0702555005' },
    { name: 'COURIER MOMBASA OFFICE', contact: '0798222002/010010000' },
    { name: 'BONDENI OFFICE', contact: '0114500555' },
    { name: 'CHANGAMWE OFFICE', contact: '0793666006' },
    { name: 'MARIAKANI OFFICE', contact: '0759000101' },
    { name: 'NYALI OFFICE', contact: '0752000555' },
    { name: 'BAMBURI OFFICE', contact: '0790616151' },
    { name: 'UTANGE/MAJAONI OFFICE', contact: '0112500555' },
    { name: 'MTWAPA OFFICE', contact: '0792100100' },
    { name: 'KILIFI OFFICE', contact: '0717072020' },
    { name: 'TIMBONI OFFICE', contact: '0711505500' },
    { name: 'MALINDI OFFICE', contact: '0711500888/0791202020' },
    { name: 'VOI OFFICE', contact: '0799999011' },
    { name: 'MACHAKOS JUNCTION OFFICE', contact: '0711515115' },
    { name: 'MLOLONGO OFFICE', contact: '0113555005' },
    { name: 'NAIROBI OFFICE TOWN', contact: '0718127350' },
    { name: 'NAIROBI OFFICE PARCEL', contact: '0790505050' },
    { name: 'SOUTH C OFFICE', contact: '0711502626' },
    { name: 'EASTLEIGH OFFICE', contact: '0790606060' },
    { name: 'INDUSTRIAL AREA OFFICE', contact: 'N/A' }, // Added N/A for missing number
    { name: 'PRESTIGE OFFICE', contact: '0741555005' },
    { name: 'THIKA OFFICE', contact: '0750010101' },
    { name: 'MAKONGENI OFFICE', contact: '0703305555' },
    { name: 'NAKURU OFFICE', contact: '0717027770' },
    { name: 'GILGIL OFFICE', contact: '0741555666' },
    { name: 'KISUMU OFFICE', contact: '0722584333' },
    { name: 'BUSIA OFFICE', contact: '0104972075' },
    { name: 'ELDORET OFFICE', contact: '0717078855' },
    { name: 'MALABA OFFICE', contact: '0758001110' },
    { name: 'KAMPALA OFFICE', contact: 'N/A' }, // Added N/A for missing number
    { name: 'MINJILA OFFICE', contact: '0743110001' },
    { name: 'KIBAONI OFFICE', contact: '0790110001' },
    { name: 'MPEKETONI OFFICE', contact: '0737666333' },
    { name: 'WITU OFFICE', contact: '0795220002' },
    { name: 'HINDI OFFICE', contact: '0114110001' },
    { name: 'MOKOWE OFFICE', contact: '0740220002' },
    { name: 'LAMU OFFICE', contact: '0716500555' }
  ];
  
  const dateInputRef = useRef();

  const handleSearch = (e) => {
    e.preventDefault();
    // Trigger re-fetch of routes if you integrate backend
  };

  const routes = [
    {
      id: 1,
      from: searchParams.from,
      to: searchParams.to,
      departure: '08:00 AM',
      arrival: '02:00 PM',
      vipPrice: 1500,
      normalPrice: 1200,
      seats: 12,
      rating: 4.5,
    },
    {
      id: 2,
      from: searchParams.from,
      to: searchParams.to,
      departure: '10:30 AM',
      arrival: '04:30 PM',
      vipPrice: 1400,
      normalPrice: 1000,
      seats: 24,
      rating: 4.0,
    },
    // Add more routes as needed
  ];

  const getTomorrowDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  };

  const renderStars = (rating) => {
    const full = Math.floor(rating);
    const half = rating % 1 >= 0.5;
    return (
      <>
        {[...Array(full)].map((_, i) => (
          <i key={`full-${i}`} className="bi bi-star-fill text-warning me-1" />
        ))}
        {half && <i className="bi bi-star-half text-warning me-1" />}
        {[...Array(5 - full - (half ? 1 : 0))].map((_, i) => (
          <i key={`empty-${i}`} className="bi bi-star text-warning me-1" />
        ))}
      </>
    );
  };

  return (
    <div className="container my-5">
      {/* Search Form */}
      <div className="bg-white rounded shadow p-4 mb-5">
        <form onSubmit={handleSearch}>
          <div className="row g-3">
            <div className="col-md-3">
              <label htmlFor="from" className="form-label">From</label>
              <div className="input-group">
                <span className="input-group-text"><i className="bi bi-geo-alt-fill" /></span>
                <select
                  id="from"
                  className="form-select"
                  value={searchParams.from}
                  onChange={(e) => setSearchParams({ ...searchParams, from: e.target.value })}
                  required
                >
                  <option value="">Select Origin</option>
                  {offices.map((o, i) => <option key={i} value={o.name}>{o.name}</option>)}
                </select>
              </div>
            </div>

            <div className="col-md-3">
              <label htmlFor="to" className="form-label">To</label>
              <div className="input-group">
                <span className="input-group-text"><i className="bi bi-geo-alt" /></span>
                <select
                  id="to"
                  className="form-select"
                  value={searchParams.to}
                  onChange={(e) => setSearchParams({ ...searchParams, to: e.target.value })}
                  required
                >
                  <option value="">Select Destination</option>
                  {offices.map((o, i) => <option key={i} value={o.name}>{o.name}</option>)}
                </select>
              </div>
            </div>

            <div className="col-md-3">
              <label htmlFor="date" className="form-label">Date</label>
              <div className="input-group">
                <span
                  className="input-group-text"
                  role="button"
                  onClick={() => dateInputRef.current?.showPicker()}
                >
                  <i className="bi bi-calendar-event-fill" />
                </span>
                <input
                  type="date"
                  id="date"
                  className="form-control"
                  ref={dateInputRef}
                  value={searchParams.date}
                  min={getTomorrowDate()}
                  onChange={(e) => setSearchParams({ ...searchParams, date: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="col-md-3 d-flex align-items-end">
              <button type="submit" className="btn btn-danger w-100">
                <i className="bi bi-search me-2" />
                Search
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* Title */}
      <div className="mb-4 text-center">
        <h2 className="fw-bold" style={{ color: 'maroon' }}>Outbound Trip</h2>
        <p className="text-muted">
          {searchParams.from} to {searchParams.to} —{" "}
          {new Date(searchParams.date).toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'short',
            day: 'numeric'
          })}
        </p>
      </div>

      {/* Route Cards */}
      <div className="row gy-4">
        {routes.map((route) => (
          <div key={route.id} className="col-md-6">
            <div className="card shadow-sm border-0">
              <div className="card-body">
                <div className="d-flex align-items-center mb-3">
                  <i className="bi bi-bus-front-fill fs-2 text-maroon me-3" />
                  <div>
                    <h5 className="card-title mb-1">{route.from} → {route.to}</h5>
                    <small className="text-muted">{route.departure} - {route.arrival}</small>
                  </div>
                </div>

                <div className="mb-2">
                  {renderStars(route.rating)}
                </div>

                <div className="d-flex justify-content-between mb-2">
                  <span><strong>VIP:</strong> Ksh {route.vipPrice}</span>
                  <span><strong>Normal:</strong> Ksh {route.normalPrice}</span>
                </div>

                <div className="mb-3">
                  <small className="text-secondary">Seats Available: {route.seats}</small>
                </div>

                <button
                  className="btn btn-outline-maroon w-100"
                  onClick={() => navigateTo('book', { id: route.id })}
                >
                  View Seats
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
