import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ORoutes from '../assets/images/our_routes.png'; 
import seat from '../assets/images/seat.png'; 
import power from '../assets/images/power.png'; 
import vip from '../assets/images/vip.png'; 
import wifi from '../assets/images/wifi.png'; 
import earn from '../assets/images/earn.png'; 
import save from '../assets/images/save.png'; 
import multiple from '../assets/images/multiple.png'; 
import parcel from '../assets/images/parcel.png'; 
import fleet from '../assets/images/fleet.png'; 
import busRoutes from '../assets/images/bus_route.png'; 
import yellowPromoBg from '../assets/images/yellow_promo.png'; // Assuming this is the yellow promo background image
import googlePlayBadge from '../assets/images/google_play_badge.png'; // Assuming filename for Google Play badge
import appStoreBadge from '../assets/images/app_store_badge.png';   // Assuming filename for App Store badge
import bossLogo from '../assets/images/boss_logo.png';             // Assuming filename for BOSS logo
import volticsLogo from '../assets/images/voltics_logo.svg';       // Assuming filename for VOLTICS logo


export default function Home() {
  const [searchParams, setSearchParams] = useState({
    from: '',
    to: '',
    date: new Date().toISOString().split('T')[0],
    passengers: 1
  });
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/routes?from=${searchParams.from}&to=${searchParams.to}&date=${searchParams.date}`);
  };

  return (
    <div className="position-relative">
      {/* Hero Image */}
      <div className="position-relative hero-bg-image d-flex align-items-center" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')`, height: '400px', backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className="position-absolute inset-0 bg-danger opacity-75 w-100 h-100"></div>
        <div className="container position-relative z-1">
          <h2 className="display-4 fw-bold text-white mb-4">Book Bus Tickets Across Kenya</h2>

          {/* Search Form */}
          <div className="bg-white rounded shadow-lg p-4 max-w-lg mx-auto">
            <form onSubmit={handleSearch}>
              <div className="row g-3">
                <div className="col-md-3">
                  <label htmlFor="from" className="form-label text-secondary mb-1">From</label>
                  <select
                    id="from"
                    className="form-select"
                    value={searchParams.from}
                    onChange={(e) => setSearchParams({...searchParams, from: e.target.value})}
                    required
                  >
                    <option value="">Select Origin</option>
                    <option value="nairobi">Nairobi</option>
                    <option value="mombasa">Mombasa</option>
                    <option value="kisumu">Kisumu</option>
                    <option value="nakuru">Nakuru</option>
                  </select>
                </div>

                <div className="col-md-3">
                  <label htmlFor="to" className="form-label text-secondary mb-1">To</label>
                  <select
                    id="to"
                    className="form-select"
                    value={searchParams.to}
                    onChange={(e) => setSearchParams({...searchParams, to: e.target.value})}
                    required
                  >
                    <option value="">Select Destination</option>
                    <option value="nairobi">Nairobi</option>
                    <option value="mombasa">Mombasa</option>
                    <option value="kisumu">Kisumu</option>
                    <option value="nakuru">Nakuru</option>
                  </select>
                </div>

                <div className="col-md-3">
                  <label htmlFor="date" className="form-label text-secondary mb-1">Date</label>
                  <input
                    type="date"
                    id="date"
                    className="form-control"
                    value={searchParams.date}
                    min={new Date().toISOString().split('T')[0]}
                    onChange={(e) => setSearchParams({...searchParams, date: e.target.value})}
                    required
                  />
                </div>

                <div className="col-md-3 d-flex align-items-end">
                  <button
                    type="submit"
                    className="btn btn-danger w-100"
                  >
                    Search Buses
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Our Routes Image Section */}
      <div className="mt-5 mb-5">
        <img src={ORoutes} alt="Our Routes Map" className="img-fluid" style={{ height: '38.5rem', width: '100%', objectFit: 'cover' }}/>
      </div>

      {/* Red Feature Bar (from screenshot) */}
      <div className="bg-danger text-white py-3 my-5 rounded-pill shadow-lg mx-auto d-flex justify-content-around align-items-center" style={{ maxWidth: '900px' }}>
        <div className="text-center">
          <img src={vip} alt="VIP Icon" className="d-block mx-auto mb-1" style={{ width: '60px', height: '60px' }} />
          <small>VIP Treatment</small>
        </div>
        <div className="text-center">
          <img src={wifi} alt="WiFi Icon" className="d-block mx-auto mb-1" style={{ width: '60px', height: '60px' }} />
          <small>On Board Wifi Available</small>
        </div>
        <div className="text-center">
          <img src={power} alt="Power Icon" className="d-block mx-auto mb-1" style={{ width: '60px', height: '60px' }} />
          <small>Power Outlets</small>
        </div>
        <div className="text-center">
          {/* Using 'seat' for extra legroom, or replace with a specific legroom icon if available */}
          <img src={seat} alt="Legroom Icon" className="d-block mx-auto mb-1" style={{ width: '60px', height: '60px' }} />
          <small>Extra Legroom</small>
        </div>
      </div>

      {/* Yellow Promo Section (from screenshot) */}
      <div className="container text-center py-5 my-5" style={{ 
        backgroundImage: `url(${yellowPromoBg})`, 
        backgroundSize: 'cover', 
        backgroundPosition: 'center', 
        borderRadius: '15px',
        minHeight: '250px', // Adjust as needed
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white' // Assuming text color on yellow background
      }}>
        <h2 className="display-6 fw-bold mb-3">Buy your travel tickets hustle free</h2>
        <h3 className="h4 mb-4">TRAVEL TO MOMBASA</h3>
        <button className="btn btn-dark btn-lg fw-bold px-5 py-3 rounded-pill">BOOK YOUR TICKET</button>
      </div>


      {/* Why Us Section */}
      <div className="container py-5">
        <h3 className="text-center mb-5 fw-bold">Why Us</h3>
        <div className="row row-cols-1 row-cols-md-3 g-4">
          <div className="col">
            <div className="card text-center h-100 shadow-sm p-4 border-0">
              <img src={save} alt="Save Icon" className="mx-auto mb-3" style={{ maxWidth: '150px', height: 'auto' }} />
              <h4 className="h5 fw-bold mb-2">Save</h4>
              <p className="text-secondary">Pay less when using our new Mobile App. You can save up to 25% of your Promo Cash balance in a single purchase.</p>
            </div>
          </div>
          <div className="col">
            <div className="card text-center h-100 shadow-sm p-4 border-0">
              <img src={multiple} alt="Multiple Routes Icon" className="mx-auto mb-3" style={{ maxWidth: '150px', height: 'auto' }} />
              <h4 className="h5 fw-bold mb-2">Multiple Routes</h4>
              <p className="text-secondary">We cover multiple routes and the widest connectivity in Kenya.</p>
            </div>
          </div>
          <div className="col">
            <div className="card text-center h-100 shadow-sm p-4 border-0">
              <img src={earn} alt="Earn Credits Icon" className="mx-auto mb-3" style={{ maxWidth: '150px', height: 'auto' }} />
              <h4 className="h5 fw-bold mb-2">Earn Credits</h4>
              <p className="text-secondary">Receive more credit during promotional periods which will be added into your Promo Cash account.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Our Services Section */}
      <div className="container py-5">
        <h3 className="text-center mb-5 fw-bold">Our Services</h3>
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4"> {/* Adjusted columns for 3 items for parcel, fleet, routes */}
          <div className="col">
            <div className="card text-center h-100 shadow-sm p-3 border-0">
              <img src={parcel} alt="Parcel Delivery" className="card-img-top mx-auto" style={{ maxWidth: '100%', height: 'auto' }} />
              <div className="card-body">
                <h5 className="card-title fw-bold">Parcel Delivery</h5>
                <p className="text-secondary">We deliver parcels to all major towns in the country.</p>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card text-center h-100 shadow-sm p-3 border-0">
              <img src={fleet} alt="Fleet Services" className="card-img-top mx-auto" style={{ maxWidth: '100%', height: 'auto' }} />
              <div className="card-body">
                <h5 className="card-title fw-bold">Fleet</h5>
                <p className="text-secondary">Our has VIP Treatment ,Onboard Wifi Available,Power Outlets and Extra Legroom</p>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card text-center h-100 shadow-sm p-3 border-0">
              <img src={busRoutes} alt="Bus Routes" className="card-img-top mx-auto" style={{ maxWidth: '100%', height: 'auto' }} />
              <div className="card-body">
                <h5 className="card-title fw-bold">Routes</h5>
                <p className="text-secondary">We operate in Tanzania,Kenya and we provide the best Customer Service</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* App Download and Partner Logos */}
      <div className="container py-5 text-center" style={{display: 'flex', justifyContent: 'space-between'}}>
        <div className="d-flex justify-content-center mb-4 flex-wrap gap-3">
          <a href="#" target="_blank" rel="noopener noreferrer">
            <img src={googlePlayBadge} alt="Get it on Google Play" style={{ height: '60px' }} />
          </a>
          <a href="#" target="_blank" rel="noopener noreferrer">
            <img src={appStoreBadge} alt="Download on the App Store" style={{ height: '60px' }} />
          </a>
        </div>
        <div className="d-flex justify-content-center align-items-center gap-4 flex-wrap">
          <img src={bossLogo} alt="BOSS Logo" style={{ height: '50px' }} />
          <img src={volticsLogo} alt="VOLTICS Logo" style={{ height: '50px' }} />
          {/* You can add text like "Legit • Safe • Secure" next to BOSS if needed using Bootstrap classes */}
        </div>
      </div>
    </div>
  );
}