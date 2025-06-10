// src/ContentRenderer.jsx
// Removed useLocation, Routes, Route
// Import all your "pages" here that were previously routes
import Home from './pages/Home';
import Book from './pages/Book';
import Bookings from './pages/Bookings';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import About from './pages/About';
import Privacy from './pages/Privacy';
import PrintTicket from './pages/PrintTicket';
import Gallery from './pages/Gallery';
import Contact from './pages/Contact'; // Import the new Contact component

// Admin components (assuming these exist)
import AdminDashboard from './pages/Admin/AdminDashboard';
import RoutesManagement from './pages/Admin/RoutesManagement';
import AdminLayout from './pages/Admin/AdminLayout';

// Assuming RouteCard and RoutesList
import RoutesList from './components/RouteList';

// This component will render the appropriate "page" based on currentView prop
export default function ContentRenderer({ currentView, searchParams, navigateTo }) {
  switch (currentView) {
    case 'home':
      return <Home navigateTo={navigateTo} />;
    case 'routesList':
      return <RoutesList searchParams={searchParams} navigateTo={navigateTo} />;
    case 'book':
      return <Book navigateTo={navigateTo} />;
    case 'bookings':
      return <Bookings navigateTo={navigateTo} />;
    case 'login':
      return <Login navigateTo={navigateTo} />;
    case 'register':
      return <Register navigateTo={navigateTo} />;
    case 'about':
      return <About />;
    case 'privacy':
      return <Privacy />;
    case 'printTicket':
      return <PrintTicket />;
    case 'gallery':
      return <Gallery />;
    case 'contact': // Add the new contact case
      return <Contact />;
    case 'adminDashboard':
      return <AdminLayout><AdminDashboard /></AdminLayout>;
    case 'adminRoutes':
      return <AdminLayout><RoutesManagement /></AdminLayout>;
    case 'adminBookings':
      return <AdminLayout><div>Bookings Management</div></AdminLayout>;
    case 'adminUsers':
      return <AdminLayout><div>Users Management</div></AdminLayout>;
    default:
      return <div>404 Not Found</div>;
  }
}