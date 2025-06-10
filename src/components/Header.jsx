import { Link, NavLink } from 'react-router-dom';
import logo from '../assets/images/logo.png'; 

export default function Header() {
  return (
    <header className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm"> {/* Bootstrap dark navbar, shadow */}
      <div className="container"> {/* Bootstrap container for responsiveness */}
        <Link to="/" className="navbar-brand d-flex align-items-center"> {/* Bootstrap navbar-brand for logo/site title */}
          <img src={logo} alt="BuscarKenya Logo" className="me-2" style={{ height: '5.5rem' }} /> {/* Logo image with Bootstrap margin-end */}
        </Link>

        {/* Navbar Toggler for mobile */}
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

        {/* Navbar Collapse for menu items */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0"> {/* Bootstrap nav classes, margin-start auto to push to right, margin-bottom */}
            <li className="nav-item">
              <NavLink
                to="/"
                className={({ isActive }) => `nav-link ${isActive ? 'active text-danger' : 'text-white'}`} // Bootstrap active class for current page
                aria-current="page"
                end
              >
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/about"
                className={({ isActive }) => `nav-link ${isActive ? 'active text-danger' : 'text-white'}`}
              >
                About Us
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/contact"
                className={({ isActive }) => `nav-link ${isActive ? 'active text-danger' : 'text-white'}`}
              >
                Contact Us
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/print-ticket"
                className={({ isActive }) => `nav-link ${isActive ? 'active text-danger' : 'text-white'}`}
              >
                Print Ticket
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/gallery"
                className={({ isActive }) => `nav-link ${isActive ? 'active text-danger' : 'text-white'}`}
              >
                Gallery
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/privacy" // Assuming this path exists
                className={({ isActive }) => `nav-link ${isActive ? 'active text-danger' : 'text-white'}`}
              >
                Privacy
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/login"
                className="btn btn-warning text-dark ms-lg-3" // Bootstrap button, margin-start for large screens
              >
                Sign In/Register
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}