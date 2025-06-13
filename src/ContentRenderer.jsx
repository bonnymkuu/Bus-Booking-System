import React, { useState } from 'react';

// Added .jsx extensions to all imports for proper module resolution
import Home from './pages/Home.jsx';
import Book from './pages/Book.jsx';
import Bookings from './pages/Bookings.jsx';
import Login from './pages/Auth/Login.jsx';
import Register from './pages/Auth/Register.jsx';
import About from './pages/About.jsx';
import Privacy from './pages/Privacy.jsx';
import PrintTicket from './pages/PrintTicket.jsx';
import Gallery from './pages/Gallery.jsx';
import Contact from './pages/Contact.jsx';
import AdminDashboard from './pages/Admin/AdminDashboard.jsx';
import RoutesManagement from './pages/Admin/RoutesManagement.jsx';
import AdminLayout from './pages/Admin/AdminLayout.jsx';
import MpesaPayment from './pages/MpesaPayment.jsx';

// Assuming RouteCard and RoutesList
import RoutesList from './components/RouteList.jsx'; // Corrected path to RoutesList if it's in components
import NotFound from './pages/NotFound.jsx';


// This component will render the appropriate "page" based on currentView prop
export default function ContentRenderer({ currentView, searchParams, navigateTo }) {
  // searchParams prop from the parent (e.g., App.jsx) already contains the data
  // for the current view, be it search parameters or booking details.

  switch (currentView) {
    case 'home':
      return <Home navigateTo={navigateTo} />;
    case 'routesList':
      // FIX: Pass searchParams as initialSearchParams
      return <RoutesList initialSearchParams={searchParams} navigateTo={navigateTo} />;
    case 'book':
      // For the 'book' page, searchParams is used for currentSearchParams
      // This is correct as currentSearchParams prop in Book expects the details
      return <Book navigateTo={navigateTo} currentSearchParams={searchParams} />;
    case 'mpesaPayment':
      // Directly pass searchParams as bookingDetails to MpesaPayment
      // This is correct as bookingDetails prop in MpesaPayment expects the details
      return <MpesaPayment navigateTo={navigateTo} bookingDetails={searchParams} />;
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
    case 'contact':
      return <Contact />;
    case 'notFound':
      return <NotFound navigateTo={navigateTo}/>;  
    case 'adminDashboard':
      return <AdminLayout><AdminDashboard /></AdminLayout>;
    case 'adminRoutes':
      return <AdminLayout><RoutesManagement /></AdminLayout>;
    case 'adminBookings':
      return <AdminLayout><div>Bookings Management</div></AdminLayout>;
    case 'adminUsers':
      return <AdminLayout><div>Users Management</div></AdminLayout>;
    default:
      return <NotFound navigateTo={navigateTo}/>;
  }
}
