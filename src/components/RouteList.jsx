import React, { useState, useRef, useEffect } from 'react'; // Added useEffect
import 'bootstrap-icons/font/bootstrap-icons.css';
import Button from './Button';

export default function RoutesList({ initialSearchParams = {}, navigateTo }) {
  const [searchParams, setSearchParams] = useState({
    from: initialSearchParams.from || '',
    to: initialSearchParams.to || '',
    date: initialSearchParams.date || new Date().toISOString().split('T')[0],
  });

  // Log initialSearchParams to debug what's being passed
  useEffect(() => {
    console.log("RoutesList: initialSearchParams received:", initialSearchParams);
    if (initialSearchParams.from && initialSearchParams.to) {
      // If params are passed, update state to ensure they are used
      setSearchParams(initialSearchParams);
    }
  }, [initialSearchParams]);


  const offices = [
    { name: 'MWEMBE TAYARI' }, { name: 'COURIER MOMBASA' },
    { name: 'BONDENI' }, { name: 'CHANGAMWE' }, { name: 'MARIAKANI' }, { name: 'NYALI' },
    { name: 'BAMBURI' }, { name: 'UTANGE/MAJAONI' }, { name: 'MTWAPA' }, { name: 'KILIFI' },
    { name: 'TIMBONI' }, { name: 'MALINDI' }, { name: 'VOI' }, { name: 'MACHAKOS JUNCTION' },
    { name: 'MLOLONGO' }, { name: 'NAIROBI TOWN' }, { name: 'SOUTH C' },
    { name: 'EASTLEIGH' }, { name: 'INDUSTRIAL AREA' }, { name: 'PRESTIGE' }, { name: 'THIKA' },
    { name: 'MAKONGENI' }, { name: 'NAKURU' }, { name: 'GILGIL' }, { name: 'KISUMU' },
    { name: 'BUSIA' }, { name: 'ELDORET' }, { name: 'MALABA' }, { name: 'KAMPALA' },
    { name: 'MINJILA' }, { name: 'KIBAONI' }, { name: 'MPEKETONI' }, { name: 'WITU' },
    { name: 'HINDI' }, { name: 'MOKOWE' }, { name: 'LAMU' }
  ];

  const dateInputRef = useRef();

  const handleSearch = (e) => {
    e.preventDefault();
  };

  const formatLocationForId = (locationName) => {
    return String(locationName).toLowerCase().replace(/\s+/g, '-');
  };

  const routes = [
    {
      id: `${formatLocationForId(searchParams.from || 'default')}-${formatLocationForId(searchParams.to || 'default')}-route-1`,
      from: searchParams.from,
      to: searchParams.to,
      departure: '08:00 AM',
      arrival: '02:00 PM',
      vipPrice: 1500,
      normalPrice: 1200,
      seats: 43,
      rating: 5.0,
    },
    {
      id: `${formatLocationForId(searchParams.from || 'default')}-${formatLocationForId(searchParams.to || 'default')}-route-2`,
      from: searchParams.from,
      to: searchParams.to,
      departure: '10:30 AM',
      arrival: '04:30 PM',
      vipPrice: 1400,
      normalPrice: 1000,
      seats: 45,
      rating: 5.0,
    },
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
              <button type="submit" className="btn btn-primary w-100">
                <i className="bi bi-search me-2" />
                Search
              </button>
            </div>
          </div>
        </form>
      </div>

      <div className="mb-4 text-center">
        <h2 className="fw-bold text-primary"> Outbound Trip</h2>
        <p className="text-muted">
          {searchParams.from || 'N/A'} to {searchParams.to || 'N/A'} —{" "}
          {new Date(searchParams.date).toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'short',
            day: 'numeric'
          })}
        </p>
      </div>

      <div className="row gy-4">
        {routes.map((route) => (
          <div key={route.id} className="col-md-6">
            <div className="card shadow-sm border-0">
              <div className="card-body">
                <div className="d-flex align-items-center mb-3">
                  <i className="bi bi-bus-front-fill fs-2 text-maroon me-3" />
                  <div>
                    <h5 className="card-title mb-1">
                      {route.from || 'N/A'} → {route.to || 'N/A'}
                    </h5>
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

                <Button
                  onClick={() => navigateTo('book', {
                    id: route.id,
                    originLocation: route.from,
                    destinationLocation: route.to,
                  })}
                  iconClass="bi bi-arrow-right"
                >
                  View Seats
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
