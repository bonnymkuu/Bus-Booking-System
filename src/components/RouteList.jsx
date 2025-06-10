// src/components/RouteList.jsx
// Removed useLocation
import RouteCard from './RouteCard';

// Receive searchParams as a prop
export default function RoutesList({ searchParams, navigateTo }) {
  // Use searchParams from props instead of URL
  const from = searchParams.from || 'Nairobi';
  const to = searchParams.to || 'Mombasa';
  const date = searchParams.date || new Date().toISOString().split('T')[0];

  const routes = [
    {
      id: 1,
      company: 'Modern Coast',
      from: from,
      to: to,
      departure: '08:00 AM',
      arrival: '02:00 PM',
      price: 1200,
      seats: 12,
      busType: 'Executive'
    },
    {
      id: 2,
      company: 'Mash Poa',
      from: from,
      to: to,
      departure: '10:30 AM',
      arrival: '04:30 PM',
      price: 1000,
      seats: 24,
      busType: 'Standard'
    },
    {
      id: 3,
      company: 'Easy Coach',
      from: from,
      to: to,
      departure: '07:00 AM',
      arrival: '01:00 PM',
      price: 1500,
      seats: 8,
      busType: 'Luxury'
    }
  ];

  return (
    <div className="container mx-auto px-4 py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="h4 fw-bold">
          {from} to {to} Routes
        </h2>
        <div className="text-secondary">
          {new Date(date).toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}
        </div>
      </div>

      <div className="space-y-6">
        {routes.map(route => (
          // You might need to pass navigateTo down to RouteCard if it has navigation
          <RouteCard key={route.id} route={route} navigateTo={navigateTo} />
        ))}
      </div>
    </div>
  );
}