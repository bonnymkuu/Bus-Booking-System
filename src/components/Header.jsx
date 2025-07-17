import { useState } from 'react';

export default function Header({ navigateTo }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const isActive = (viewName) => {
    return false;
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const menuItems = [
    { name: 'Home', icon: 'bi-house', view: 'home' },
    { name: 'About Us', icon: 'bi-info-circle', view: 'about' },
    { name: 'Contact Us', icon: 'bi-telephone', view: 'contact' },
    // { name: 'Print Ticket', icon: 'bi-printer', view: 'printTicket' },
    { name: 'Gallery', icon: 'bi-images', view: 'gallery' },
    { name: 'Privacy', icon: 'bi-shield-lock', view: 'privacy' },
  ];

  return (
    <header className="navbar navbar-expand-lg navbar-dark shadow-sm animated-gradient-header">
      <div className="container">
        <a href="#" onClick={() => navigateTo('home')} className="navbar-brand d-flex align-items-center">
          <h1>Safiri Express</h1>
        </a>

        {/* Custom Toggle Button */}
        <button
          className="navbar-toggler d-lg-none border-0"
          type="button"
          onClick={toggleMenu}
          aria-label="Toggle navigation"
        >
          <div className={`hamburger ${menuOpen ? 'open' : ''}`}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </button>

        {/* Desktop Menu (unchanged) */}
        <div className="collapse navbar-collapse d-none d-lg-block" id="navbarNav">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            {menuItems.map((item, index) => (
              <li className="nav-item" key={index}>
                <a
                  href="#"
                  onClick={() => navigateTo(item.view)}
                  className={`nav-link ${isActive(item.view) ? 'active text-primary' : 'text-white'}`}
                >
                  <i className={`bi ${item.icon} me-1`}></i>
                  {item.name}
                </a>
              </li>
            ))}
            <li className="nav-item">
              <button
                onClick={() => navigateTo('login')}
                className="btn btn-warning text-dark ms-lg-3"
              >
                <i className="bi bi-box-arrow-in-right me-1"></i>
                Sign In/Register
              </button>
            </li>
          </ul>
        </div>

        {/* Mobile Menu */}
        <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
          <div className="mobile-menu-content">
            <ul className="navbar-nav">
              {menuItems.map((item, index) => (
                <li className="nav-item" key={index}>
                  <button
                    onClick={() => {
                      navigateTo(item.view);
                      setMenuOpen(false);
                    }}
                    className={`nav-link btn btn-primary w-100 text-light text-start mb-2 ${isActive(item.view) ? 'active' : ''}`}
                  >
                    <i className={`bi ${item.icon} ms-2 me-2`}></i>
                    {item.name}
                  </button>
                </li>
              ))}
              <li className="nav-item">
                <button
                  onClick={() => {
                    navigateTo('login');
                    setMenuOpen(false);
                  }}
                  className="btn btn-warning text-dark w-100"
                >
                  <i className="bi bi-box-arrow-in-right me-2"></i>
                  Sign In/Register
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Add these styles */}
        <style jsx>{`
          .hamburger {
            width: 30px;
            height: 20px;
            position: relative;
            cursor: pointer;
          }
          
          .hamburger span {
            display: block;
            position: absolute;
            height: 3px;
            width: 100%;
            background: white;
            border-radius: 3px;
            opacity: 1;
            left: 0;
            transform: rotate(0deg);
            transition: .25s ease-in-out;
          }
          
          .hamburger span:nth-child(1) {
            top: 0px;
          }
          
          .hamburger span:nth-child(2) {
            top: 9px;
          }
          
          .hamburger span:nth-child(3) {
            top: 18px;
          }
          
          .hamburger.open span:nth-child(1) {
            top: 9px;
            transform: rotate(135deg);
          }
          
          .hamburger.open span:nth-child(2) {
            opacity: 0;
            left: -30px;
          }
          
          .hamburger.open span:nth-child(3) {
            top: 9px;
            transform: rotate(-135deg);
          }
          
          .mobile-menu {
            position: fixed;
            top: 0;
            left: -100%;
            width: 280px;
            height: 100vh;
            background: linear-gradient(145deg, rgb(4, 58, 75) 0%, rgb(2, 50, 122) 100%);
            z-index: 1050;
            transition: all 0.3s ease;
            padding: 20px;
            box-shadow: 2px 0 10px rgba(0,0,0,0.1);
          }
          
          .mobile-menu.open {
            left: 0;
          }
          
          .mobile-menu-content {
            margin-top: 60px;
          }
          
          @media (min-width: 992px) {
            .mobile-menu {
              display: none !important;
            }
          }
        `}</style>
      </div>
    </header>
  );
}