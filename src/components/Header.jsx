// src/components/Header.jsx
import logo from '../assets/images/logo.png';

export default function Header({ navigateTo }) {
  const isActive = (viewName) => {
    return false;
  };

  return (
    <header className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
      <div className="container">
        <a href="#" onClick={() => navigateTo('home')} className="navbar-brand d-flex align-items-center">
          <img src={logo} alt="BuscarKenya Logo" className="me-2" style={{ height: '4.5rem' }} />
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
                className={`nav-link ${isActive('home') ? 'active text-danger' : 'text-white'}`}
              >
                Home
              </a>
            </li>
            <li className="nav-item">
              <a
                href="#"
                onClick={() => navigateTo('about')}
                className={`nav-link ${isActive('about') ? 'active text-danger' : 'text-white'}`}
              >
                About Us
              </a>
            </li>
            <li className="nav-item">
              <a
                href="#"
                onClick={() => navigateTo('contact')}
                className={`nav-link ${isActive('contact') ? 'active text-danger' : 'text-white'}`}
              >
                Contact Us
              </a>
            </li>
            <li className="nav-item">
              <a
                href="#"
                onClick={() => navigateTo('printTicket')}
                className={`nav-link ${isActive('printTicket') ? 'active text-danger' : 'text-white'}`}
              >
                Print Ticket
              </a>
            </li>
            <li className="nav-item">
              <a
                href="#"
                onClick={() => navigateTo('gallery')}
                className={`nav-link ${isActive('gallery') ? 'active text-danger' : 'text-white'}`}
              >
                Gallery
              </a>
            </li>
            <li className="nav-item">
              <a
                href="#"
                onClick={() => navigateTo('privacy')}
                className={`nav-link ${isActive('privacy') ? 'active text-danger' : 'text-white'}`}
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