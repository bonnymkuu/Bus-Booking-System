export default function Header({ navigateTo }) {
  const isActive = (viewName) => {
    return false;
  };

  return (
    <header className="navbar navbar-expand-lg navbar-dark shadow-sm" style={{backgroundImage: 'linear-gradient(145deg,rgb(4, 58, 75) 0%,rgb(2, 50, 122) 100%)'}}>
      <div className="container">
        <a href="#" onClick={() => navigateTo('home')} className="navbar-brand d-flex align-items-center">
          <h1>Bus Booking System</h1>
        </a>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a
                href="#"
                onClick={() => navigateTo('home')}
                className={`nav-link ${isActive('home') ? 'active text-primary' : 'text-white'}`}
              >
                Home
              </a>
            </li>
            <li className="nav-item">
              <a
                href="#"
                onClick={() => navigateTo('about')}
                className={`nav-link ${isActive('about') ? 'active text-primary' : 'text-white'}`}
              >
                About Us
              </a>
            </li>
            <li className="nav-item">
              <a
                href="#"
                onClick={() => navigateTo('contact')}
                className={`nav-link ${isActive('contact') ? 'active text-primary' : 'text-white'}`}
              >
                Contact Us
              </a>
            </li>
            <li className="nav-item">
              <a
                href="#"
                onClick={() => navigateTo('printTicket')}
                className={`nav-link ${isActive('printTicket') ? 'active text-primary' : 'text-white'}`}
              >
                Print Ticket
              </a>
            </li>
            <li className="nav-item">
              <a
                href="#"
                onClick={() => navigateTo('gallery')}
                className={`nav-link ${isActive('gallery') ? 'active text-primary' : 'text-white'}`}
              >
                Gallery
              </a>
            </li>
            <li className="nav-item">
              <a
                href="#"
                onClick={() => navigateTo('privacy')}
                className={`nav-link ${isActive('privacy') ? 'active text-primary' : 'text-white'}`}
              >
                Privacy
              </a>
            </li>
            {/* Re-added Sign In/Register button */}
            <li className="nav-item">
              <button
                onClick={() => navigateTo('login')}
                className="btn btn-warning text-dark ms-lg-3"
              >
                Sign In/Register
              </button>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}