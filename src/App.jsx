// src/App.jsx
import { useState } from 'react'; // Import useState
// Removed BrowserRouter as Router
import Header from './components/Header';
import Footer from './components/Footer';
import './App.css';
import ContentRenderer from './ContentRenderer'; // Renamed and modified from AppRoutes
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap-icons/font/bootstrap-icons.css';

function App() {
  // State to manage the currently displayed view
  const [currentView, setCurrentView] = useState('home');
  const [searchParams, setSearchParams] = useState({}); // State to hold search parameters

  // Function to navigate between views
  const navigateTo = (view, params = {}) => {
    setCurrentView(view);
    setSearchParams(params); // Update search parameters if provided
  };

  return (
    // Removed <Router>
    <div className="d-flex flex-column min-vh-100 bg-light">
      {/* Pass navigateTo function to Header for navigation */}
      <Header navigateTo={navigateTo} />
      <main className="flex-grow-1"> 
        {/* Render content based on currentView and pass searchParams */}
        <ContentRenderer currentView={currentView} searchParams={searchParams} navigateTo={navigateTo} />
      </main>
      <Footer />
    </div>
    // Removed </Router>
  );
}

export default App;