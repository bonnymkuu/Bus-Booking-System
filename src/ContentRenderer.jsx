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
import RoutesList from './components/RouteList.jsx';

// This component will render the appropriate "page" based on currentView prop
export default function ContentRenderer({ currentView, searchParams, navigateTo }) {
  // Removed the local state for bookingDetails in ContentRenderer.
  // The searchParams passed from navigateTo already contain the bookingDetails
  // when navigating to 'mpesaPayment'.

  switch (currentView) {
    case 'home':
      return <Home navigateTo={navigateTo} />;
    case 'routesList':
      return <RoutesList searchParams={searchParams} navigateTo={navigateTo} />;
    case 'book':
      // For the 'book' page, searchParams is used for currentSearchParams
      return <Book navigateTo={navigateTo} currentSearchParams={searchParams} />;
    case 'mpesaPayment':
      // Directly pass searchParams as bookingDetails to MpesaPayment
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
