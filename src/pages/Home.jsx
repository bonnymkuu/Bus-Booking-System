import { useState, useEffect, useRef } from "react";
import seat from "../assets/images/seat.png";
import power from "../assets/images/power.png";
import vip from "../assets/images/vip.png";
import wifi from "../assets/images/wifi.png";
import earn from "../assets/images/earn.png";
import busImage3 from "../assets/images/bus7.jpg";
import save from "../assets/images/save.png";
import multiple from "../assets/images/multiple.png";
import parcel from "../assets/images/parcel.png";
import fleet from "../assets/images/busplain.png";
import busRoutes from "../assets/images/routes.png";
import googlePlayBadge from "../assets/images/google_play_badge.png";
import appStoreBadge from "../assets/images/app_store_badge.png";

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
    from: "",
    to: "",
    date: new Date().toISOString().split("T")[0],
    passengers: 1,
  });

  const [filteredFrom, setFilteredFrom] = useState([]);
  const [filteredTo, setFilteredTo] = useState([]);

  const [whyUsRef, whyUsVisible] = useFadeInOnScroll();
  const [servicesRef, servicesVisible] = useFadeInOnScroll();

  const offices = [
    { name: "MWEMBE TAYARI" },
    { name: "COURIER MOMBASA" },
    { name: "BONDENI" },
    { name: "CHANGAMWE" },
    { name: "MARIAKANI" },
    { name: "NYALI" },
    { name: "BAMBURI" },
    { name: "UTANGE/MAJAONI" },
    { name: "MTWAPA" },
    { name: "KILIFI" },
    { name: "TIMBONI" },
    { name: "MALINDI" },
    { name: "VOI" },
    { name: "MACHAKOS JUNCTION" },
    { name: "MLOLONGO" },
    { name: "NAIROBI TOWN" },
    { name: "SOUTH C" },
    { name: "EASTLEIGH" },
    { name: "INDUSTRIAL AREA" },
    { name: "PRESTIGE" },
    { name: "THIKA" },
    { name: "MAKONGENI" },
    { name: "NAKURU" },
    { name: "GILGIL" },
    { name: "KISUMU" },
    { name: "BUSIA" },
    { name: "ELDORET" },
    { name: "MALABA" },
    { name: "KAMPALA" },
    { name: "MINJILA" },
    { name: "KIBAONI" },
    { name: "MPEKETONI" },
    { name: "WITU" },
    { name: "HINDI" },
    { name: "MOKOWE" },
    { name: "LAMU" },
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    // Use navigateTo to switch to 'routesList' view and pass search parameters
    navigateTo("routesList", {
      from: searchParams.from,
      to: searchParams.to,
      date: searchParams.date,
    });
  };

  const handleInputChange = (type, value) => {
    const filtered = offices.filter((office) =>
      office.name.toLowerCase().includes(value.toLowerCase())
    );

    if (type === "from") {
      setSearchParams({ ...searchParams, from: value });
      setFilteredFrom(filtered);
    } else {
      setSearchParams({ ...searchParams, to: value });
      setFilteredTo(filtered);
    }
  };

  useEffect(() => {
    setFilteredFrom(offices);
    setFilteredTo(offices);
  }, []);

  function getTomorrowDate() {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split("T")[0];
  }

  // Inside your component:
  const dateInputRef = useRef(null);

  return (
    <div className="position-relative">
      {/* Hero Section with Background Image */}
      <div
        className="position-relative hero-bg-image d-flex align-items-center"
        style={{
          backgroundImage: `url(${busImage3})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "800px",
        }}
      >
        {/* Dark overlay */}
        <div
          className="position-absolute top-0 start-0 w-100 h-100"
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.4)",
          }}
        ></div>

        {/* Content over background */}
        <div className="container position-relative z-1 text-center text-white">
          {/* Title */}
          <h1 className="fw-bold display-5 mb-3">
            Explore Routes. Book Easily.
          </h1>

          {/* Description */}
          <p
            className="lead mb-4"
            style={{ maxWidth: "600px", margin: "0 auto" }}
          >
            Discover and book your journey between cities with our easy-to-use
            search. Enter your origin, destination, and travel date to get
            started.
          </p>

          {/* Search Form Card */}
          <div
            className="rounded shadow-lg p-4 mt-4 mx-auto"
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.4)",
              maxWidth: "850px",
            }}
          >
            <form onSubmit={handleSearch}>
              <div className="row g-3">
                {/* FROM */}
                <div className="col-md-3">
                  <label htmlFor="from" className="form-label text-black mb-1">
                    From
                  </label>
                  <div className="input-group">
                    <span className="input-group-text">
                      <i className="bi bi-geo-alt-fill"></i>
                    </span>
                    <input
                      list="from-options"
                      className="form-control"
                      value={searchParams.from}
                      onChange={(e) =>
                        handleInputChange("from", e.target.value)
                      }
                      placeholder="Type origin"
                      required
                    />
                    <datalist id="from-options">
                      {filteredFrom.map((office, index) => (
                        <option key={index} value={office.name} />
                      ))}
                    </datalist>
                  </div>
                </div>

                {/* TO */}
                <div className="col-md-3">
                  <label htmlFor="to" className="form-label text-black mb-1">
                    To
                  </label>
                  <div className="input-group">
                    <span className="input-group-text">
                      <i className="bi bi-geo-alt"></i>
                    </span>
                    <input
                      list="to-options"
                      className="form-control"
                      value={searchParams.to}
                      onChange={(e) => handleInputChange("to", e.target.value)}
                      placeholder="Type destination"
                      required
                    />
                    <datalist id="to-options">
                      {filteredTo.map((office, index) => (
                        <option key={index} value={office.name} />
                      ))}
                    </datalist>
                  </div>
                </div>

                {/* DATE */}
                <div className="col-md-3">
                  <label htmlFor="date" className="form-label text-black mb-1">
                    Date
                  </label>
                  <div className="input-group">
                    <span
                      className="input-group-text"
                      role="button"
                      onClick={() => dateInputRef.current?.showPicker()}
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
                      onChange={(e) =>
                        setSearchParams({
                          ...searchParams,
                          date: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                </div>

                {/* BUTTON */}
                <div className="col-md-3 d-flex align-items-end">
                  <button
                    type="submit"
                    className="btn btn-primary w-100 d-flex align-items-center justify-content-center gap-1"
                  >
                    <i className="bi bi-search"></i>
                    Search
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Features Section - Redesigned */}
      <div className="container my-5">
        <div
          className="text-white p-4 rounded-4 shadow-lg mx-auto"
          style={{
            maxWidth: "900px",
            background:
              "linear-gradient(135deg,rgb(5, 98, 114) 0%,rgb(0, 77, 155) 100%)",
            border: "none",
          }}
        >
          <div className="row g-4 text-center">
            <div className="col-6 col-md-3">
              <div className="p-3 bg-white bg-opacity-10 rounded-3 h-100">
                <img
                  src={vip}
                  alt="VIP"
                  className="img-fluid mb-2"
                  style={{ height: "50px" }}
                />
                <h6 className="mb-0">Premium Comfort</h6>
              </div>
            </div>
            <div className="col-6 col-md-3">
              <div className="p-3 bg-white bg-opacity-10 rounded-3 h-100">
                <img
                  src={wifi}
                  alt="WiFi"
                  className="img-fluid mb-2"
                  style={{ height: "50px" }}
                />
                <h6 className="mb-0">Free WiFi</h6>
              </div>
            </div>
            <div className="col-6 col-md-3">
              <div className="p-3 bg-white bg-opacity-10 rounded-3 h-100">
                <img
                  src={power}
                  alt="Power"
                  className="img-fluid mb-2"
                  style={{ height: "50px" }}
                />
                <h6 className="mb-0">Charging Ports</h6>
              </div>
            </div>
            <div className="col-6 col-md-3">
              <div className="p-3 bg-white bg-opacity-10 rounded-3 h-100">
                <img
                  src={seat}
                  alt="Seat"
                  className="img-fluid mb-2"
                  style={{ height: "50px" }}
                />
                <h6 className="mb-0">Spacious Seats</h6>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className={`container py-5 fade-in ${servicesVisible ? "visible" : ""}`}
        ref={servicesRef}
      >
        <h3 className="text-center mb-5 fw-bold">What We Offer</h3>
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4">
          {/* Card 1 - Express Delivery */}
          <div className="col">
            <div className="card text-center h-100 shadow-sm p-3 border-0">
              <img
                src={parcel}
                alt="Express Delivery"
                className="card-img-top mx-auto"
                style={{ maxWidth: "100%", height: "auto" }}
              />
              <div className="card-body">
                <h5 className="card-title fw-bold">Express Delivery</h5>
                <p className="text-secondary">
                  Fast and secure parcel delivery services with real-time
                  tracking for your peace of mind.
                </p>
              </div>
            </div>
          </div>

          {/* Card 2 - Premium Fleet */}
          <div className="col">
            <div className="card text-center h-100 shadow-sm p-3 border-0">
              <img
                src={fleet}
                alt="Premium Fleet"
                className="card-img-top mx-auto"
                style={{ maxWidth: "100%", height: "auto" }}
              />
              <div className="card-body">
                <h5 className="card-title fw-bold">Premium Fleet</h5>
                <p className="text-secondary">
                  Modern, well-maintained buses equipped with comfortable
                  seating, charging ports, and climate control.
                </p>
              </div>
            </div>
          </div>

          {/* Card 3 - Cross-Border Travel */}
          <div className="col">
            <div className="card text-center h-100 shadow-sm p-3 border-0">
              <img
                src={busRoutes}
                alt="Cross-Border Travel"
                className="card-img-top mx-auto"
                style={{ maxWidth: "100%", height: "auto" }}
              />
              <div className="card-body">
                <h5 className="card-title fw-bold">Cross-Border Travel</h5>
                <p className="text-secondary">
                  Hassle-free international travel with dedicated routes
                  connecting major cities in Kenya, Uganda, and Tanzania.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* App Download and Partner Logos */}
      <div className="container py-5 text-center d-flex flex-column flex-md-row justify-content-between align-items-center">
        <div className="d-flex justify-content-center mb-4 mb-md-0 flex-wrap gap-3">
          <a href="#" target="_blank" rel="noopener noreferrer">
            <img
              src={googlePlayBadge}
              alt="Get it on Google Play"
              style={{ height: "60px" }}
            />
          </a>
          <a href="#" target="_blank" rel="noopener noreferrer">
            <img
              src={appStoreBadge}
              alt="Download on the App Store"
              style={{ height: "60px" }}
            />
          </a>
        </div>
      </div>
    </div>
  );
}
