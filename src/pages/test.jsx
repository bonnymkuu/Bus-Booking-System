import { useState, useEffect, useRef } from "react";
import seat from "../assets/images/seat.png";
import power from "../assets/images/power.png";
import vip from "../assets/images/vip.png";
import wifi from "../assets/images/wifi.png";
import earn from "../assets/images/earn.png";
import busImage3 from "../assets/images/bus4.jpg";
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
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold }
    );

    if (elementRef.current) observer.observe(elementRef.current);
    return () => observer.disconnect();
  }, [threshold]);

  return [elementRef, isVisible];
};

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
  const dateInputRef = useRef(null);

  const offices = [
    { name: "MWEMBE TAYARI" }, { name: "COURIER MOMBASA" },
    // ... rest of your offices array
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    navigateTo("routesList", {
      from: searchParams.from,
      to: searchParams.to,
      date: searchParams.date,
    });
  };

  const handleInputChange = (type, value) => {
    const filtered = offices.filter(office =>
      office.name.toLowerCase().includes(value.toLowerCase())
    );
    type === "from" 
      ? (setSearchParams({ ...searchParams, from: value }), setFilteredFrom(filtered))
      : (setSearchParams({ ...searchParams, to: value }), setFilteredTo(filtered));
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

  return (
    <div className="position-relative">
      {/* Hero Section with Bus Background */}
      <div 
        className="position-relative d-flex align-items-center justify-content-center" 
        style={{
          height: "80vh",
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), url(${busImage3})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat"
        }}
      >
        {/* Search Card */}
        <div className="container">
          <div className="bg-white rounded-3 shadow-lg p-4 mx-auto" style={{ maxWidth: "800px" }}>
            <form onSubmit={handleSearch}>
              <div className="row g-3">
                {/* FROM */}
                <div className="col-md-3">
                  <label htmlFor="from" className="form-label text-secondary mb-1">From</label>
                  <div className="input-group">
                    <span className="input-group-text"><i className="bi bi-geo-alt-fill"></i></span>
                    <input
                      list="from-options"
                      className="form-control"
                      value={searchParams.from}
                      onChange={(e) => handleInputChange("from", e.target.value)}
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
                  <label htmlFor="to" className="form-label text-secondary mb-1">To</label>
                  <div className="input-group">
                    <span className="input-group-text"><i className="bi bi-geo-alt"></i></span>
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
                  <label htmlFor="date" className="form-label text-secondary mb-1">Date</label>
                  <div className="input-group">
                    <span className="input-group-text" role="button" onClick={() => dateInputRef.current?.showPicker()}>
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
                  <button type="submit" className="btn btn-primary w-100 d-flex align-items-center justify-content-center gap-1">
                    <i className="bi bi-search"></i> Search
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Features Section - Redesigned */}
      <div className="container my-5">
        <div className="bg-gradient text-white p-4 rounded-4 shadow-lg mx-auto" 
             style={{ 
               maxWidth: "900px",
               background: "linear-gradient(135deg, #6e48aa 0%, #9d50bb 100%)",
               border: "none"
             }}>
          <div className="row g-4 text-center">
            <div className="col-6 col-md-3">
              <div className="p-3 bg-white bg-opacity-10 rounded-3 h-100">
                <img src={vip} alt="VIP" className="img-fluid mb-2" style={{ height: "50px" }} />
                <h6 className="mb-0">Premium Comfort</h6>
              </div>
            </div>
            <div className="col-6 col-md-3">
              <div className="p-3 bg-white bg-opacity-10 rounded-3 h-100">
                <img src={wifi} alt="WiFi" className="img-fluid mb-2" style={{ height: "50px" }} />
                <h6 className="mb-0">Free WiFi</h6>
              </div>
            </div>
            <div className="col-6 col-md-3">
              <div className="p-3 bg-white bg-opacity-10 rounded-3 h-100">
                <img src={power} alt="Power" className="img-fluid mb-2" style={{ height: "50px" }} />
                <h6 className="mb-0">Charging Ports</h6>
              </div>
            </div>
            <div className="col-6 col-md-3">
              <div className="p-3 bg-white bg-opacity-10 rounded-3 h-100">
                <img src={seat} alt="Seat" className="img-fluid mb-2" style={{ height: "50px" }} />
                <h6 className="mb-0">Spacious Seats</h6>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Rest of your components (Why Us, Services, etc.) remain the same */}
      {/* ... */}
    </div>
  );
}