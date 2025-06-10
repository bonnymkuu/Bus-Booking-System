import { useLocation } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';

// Import components for public pages
import Home from './pages/Home';
import Book from './pages/Book';
import Bookings from './pages/Bookings';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';

// Import the newly created pages
import About from './pages/About';       // Assuming 'About.jsx' is in 'src/pages'
import Privacy from './pages/Privacy';   // Assuming 'Privacy.jsx' is in 'src/pages'
import Contact from './pages/Contact';   // Assuming 'Contact.jsx' is in 'src/pages'
import PrintTicket from './pages/PrintTicket'; // Assuming 'PrintTicket.jsx' is in 'src/pages'
import Gallery from './pages/Gallery';     // Assuming 'Gallery.jsx' is in 'src/pages'

// Import components for admin pages
import AdminDashboard from './pages/Admin/AdminDashboard';
import RoutesManagement from './pages/Admin/RoutesManagement';
import AdminLayout from './pages/Admin/AdminLayout';

// Assuming RouteCard is in './components/RouteCard' as per original import
import RouteCard from './components/RouteCard'; 

// ✅ Renamed this component to avoid conflict
export function RoutesList() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const routes = [
    {
      id: 1,
      company: 'Modern Coast', // Keeping only Modern Coast as requested
      from: searchParams.get('from') || 'Nairobi',
      to: searchParams.get('to') || 'Mombasa',
      departure: '08:00 AM',
      arrival: '02:00 PM',
      price: 1200,
      seats: 12,
      busType: 'Executive'
    },
    // Removed other companies as requested
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">
          {searchParams.get('from') || 'Nairobi'} to {searchParams.get('to') || 'Mombasa'} Routes
        </h2>
        <div className="text-gray-600">
          {new Date(searchParams.get('date') || new Date()).toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}
        </div>
      </div>
      
      <div className="space-y-6">
        {routes.map(route => (
          <RouteCard key={route.id} route={route} />
        ))}
      </div>
    </div>
  );
}

// ✅ Keep only one default export
export default function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      {/* Use RoutesList for the /routes path */}
      <Route path="/routes" element={<RoutesList />} /> 
      <Route path="/book/:id" element={<Book />} />
      <Route path="/bookings" element={<Bookings />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Added new pages here */}
      <Route path="/about" element={<About />} />
      <Route path="/privacy" element={<Privacy />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/print-ticket" element={<PrintTicket />} />
      <Route path="/gallery" element={<Gallery />} />

      {/* Admin Routes */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<AdminDashboard />} />
        <Route path="routes" element={<RoutesManagement />} />
        <Route path="bookings" element={<div>Bookings Management</div>} />
        <Route path="users" element={<div>Users Management</div>} />
      </Route>

      {/* 404 Page */}
      <Route path="*" element={<div>404 Not Found</div>} />
    </Routes>
  );
}