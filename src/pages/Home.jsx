import { useState, useEffect, useRef } from 'react'; 
import ORoutes from '../assets/images/our_routes.png';
import BuscarTicket from '../assets/images/Buscar_ticket_booking.png';
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
import bookingApp from '../assets/images/booking_app.png';
import yellowPromoBg from '../assets/images/yellow_promo.png';
import redPromo from '../assets/images/redPromo.png';
import blackPromo from '../assets/images/blackPromo.png';
import googlePlayBadge from '../assets/images/google_play_badge.png';
import appStoreBadge from '../assets/images/app_store_badge.png';
import bossLogo from '../assets/images/boss_logo.png';
import volticsLogo from '../assets/images/voltics_logo.svg';

const useFadeInOnScroll = (threshold = 0.1) => {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Update our state when observer callback fires
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Optionally, unobserve if you only want the animation to run once
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: threshold, // Percentage of element in view to trigger
      }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }
    return () => {
      if (elementRef.current) {
        observer.disconnect();
      }
    };
  }, [threshold]); // Re-run effect if threshold changes

  return [elementRef, isVisible];
};

// Receive navigateTo as a prop
export default function Home({ navigateTo }) {
  const [searchParams, setSearchParams] = useState({
    from: '',
    to: '',
    date: new Date().toISOString().split('T')[0],
    passengers: 1
  });

  const [whyUsRef, whyUsVisible] = useFadeInOnScroll();
  const [servicesRef, servicesVisible] = useFadeInOnScroll();


  const handleSearch = (e) => {
    e.preventDefault();
    // Use navigateTo to switch to 'routesList' view and pass search parameters
    navigateTo('routesList', {
      from: searchParams.from,
      to: searchParams.to,
      date: searchParams.date
    });
  };

  const [routeIndex, setRouteIndex] = useState(0); // Store the index
  const [promoIndex, setPromoIndex] = useState(0);
  const [isFading, setIsFading] = useState(true); // control opacity

const [prevIndex, setPrevIndex] = useState(null);

const promoImages = [redPromo, blackPromo, yellowPromoBg];
const routeImages = [ORoutes, BuscarTicket];

useEffect(() => {
  const interval = setInterval(() => {
    setPrevIndex(routeIndex); // Store current before changing
    setRouteIndex((prev) => (prev + 1) % routeImages.length);
  }, 3000);

  return () => clearInterval(interval);
}, [routeIndex]);

useEffect(() => {
  const interval = setInterval(() => {
    setPromoIndex((prevIndex) => (prevIndex + 1) % promoImages.length);
  }, 2000);

  return () => clearInterval(interval);
}, []);

function getTomorrowDate() {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  return tomorrow.toISOString().split('T')[0];
}

// Inside your component:
const dateInputRef = useRef(null);

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

  return (
    <div className="position-relative">
      {/* Hero Image */}
      <div className="position-relative hero-bg-image d-flex align-items-center">
        <div className="position-absolute inset-0 opacity-75 w-100 "></div>
        <div className="container position-relative z-1">

          {/* Search Form */}
          <div className="bg-white rounded shadow-lg p-4 max-w-lg mx-auto">
            <form onSubmit={handleSearch}>
              <div className="row g-3">
                {/* FROM */}
                <div className="col-md-3">
                  <label htmlFor="from" className="form-label text-secondary mb-1">From</label>
                  <div className="input-group">
                    <span className="input-group-text">
                      <i className="bi bi-geo-alt-fill"></i>
                    </span>
                    <select
                      id="from"
                      className="form-select"
                      value={searchParams.from}
                      onChange={(e) => setSearchParams({ ...searchParams, from: e.target.value })}
                      required
                    >
                      <option value="">Select Origin</option>
                      {offices.map((office, index) => (
                        <option key={index} value={office.name}>
                          {office.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* TO */}
                <div className="col-md-3">
                  <label htmlFor="to" className="form-label text-secondary mb-1">To</label>
                  <div className="input-group">
                    <span className="input-group-text">
                      <i className="bi bi-geo-alt"></i>
                    </span>
                    <select
                      id="to"
                      className="form-select"
                      value={searchParams.to}
                      onChange={(e) => setSearchParams({ ...searchParams, to: e.target.value })}
                      required
                    >
                      <option value="">Select Destination</option>
                      {offices.map((office, index) => (
                        <option key={index} value={office.name}>
                          {office.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* DATE */}
                <div className="col-md-3">
                  <label htmlFor="date" className="form-label text-secondary mb-1">Date</label>
                  <div className="input-group">
                    <span
                      className="input-group-text"
                      role="button"
                      onClick={() => dateInputRef.current?.showPicker()} // This opens native date picker in modern browsers
                    >
                      <i className="bi bi-calendar-event-fill"></i>
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


                {/* BUTTON */}
                <div className="col-md-3 d-flex align-items-end">
                  <button type="submit" className="btn btn-danger w-100 d-flex align-items-center justify-content-center gap-1">
                    <i className="bi bi-search"></i>
                    Search
                  </button>
                </div>
              </div>
            </form>
          </div>

        </div>
      </div>

      {/* Our Routes Image Section */}
      <div className="mt-5 mb-5 route-image-wrapper">
        {routeImages.map((imgSrc, index) => (
          <img
            key={index}
            src={imgSrc}
            alt={`Route ${index}`}
            className={`route-image ${index === routeIndex ? 'active' : ''}`}
          />
        ))}
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
          <img src={seat} alt="Legroom Icon" className="d-block mx-auto mb-1" style={{ width: '60px', height: '60px' }} />
          <small>Extra Legroom</small>
        </div>
      </div>

      {/* Yellow Promo Section (from screenshot) */}
      <div className="container-fluid py-5 my-5 d-flex flex-lg-row align-items-stretch responsive-section">
        <div
          className="d-flex align-items-center justify-content-center booking-block"
          style={{
            flex: '1 1 50%',
            height: '350px',
            backgroundColor: '#f8f9fa',
            borderRadius: '15px 0 0 15px',
          }}
        >
          <img
            src={bookingApp}
            alt="Booking App"
            className="img-fluid"
            style={{
              maxHeight: '100%',
              objectFit: 'contain',
            }}
          />
        </div>

        <div
          className="promo-block"
          style={{
            flex: '1 1 50%',
            height: '350px',
            backgroundImage: `url(${promoImages[promoIndex]})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            borderRadius: '0 15px 15px 0',
            transition: 'background-image 1s ease-in-out',
            color: 'white',
          }}
        >
        </div>
      </div>

      {/* Why Us Section */}
      <div ref={whyUsRef} className={`container py-5 fade-in ${whyUsVisible ? 'visible' : ''}`}>
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
      <div className={`container py-5 fade-in ${servicesVisible ? 'visible' : ''}`} ref={servicesRef}>
        <h3 className="text-center mb-5 fw-bold">Our Services</h3>
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4">
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
      <div className="container py-5 text-center d-flex flex-column flex-md-row justify-content-between align-items-center">
        <div className="d-flex justify-content-center mb-4 mb-md-0 flex-wrap gap-3">
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
        </div>
      </div>
    </div>
  );
}