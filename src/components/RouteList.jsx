import { useLocation } from 'react-router-dom';
import RouteCard from './RouteCard';

export default function RoutesList() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const routes = [
    {
      id: 1,
      company: 'Modern Coast',
      from: searchParams.get('from') || 'Nairobi',
      to: searchParams.get('to') || 'Mombasa',
      departure: '08:00 AM',
      arrival: '02:00 PM',
      price: 1200,
      seats: 12,
      busType: 'Executive'
    },
    {
      id: 2,
      company: 'Mash Poa',
      from: searchParams.get('from') || 'Nairobi',
      to: searchParams.get('to') || 'Mombasa',
      departure: '10:30 AM',
      arrival: '04:30 PM',
      price: 1000,
      seats: 24,
      busType: 'Standard'
    },
    {
      id: 3,
      company: 'Easy Coach',
      from: searchParams.get('from') || 'Nairobi',
      to: searchParams.get('to') || 'Mombasa',
      departure: '07:00 AM',
      arrival: '01:00 PM',
      price: 1500,
      seats: 8,
      busType: 'Luxury'
    }
  ];

  return (
    <div className="container mx-auto px-4 py-5"> {/* Bootstrap container, padding */}
      <div className="d-flex justify-content-between align-items-center mb-4"> {/* Bootstrap flex, justify content, alignment, margin-bottom */}
        <h2 className="h4 fw-bold"> {/* Bootstrap heading, font-weight */}
          {searchParams.get('from') || 'Nairobi'} to {searchParams.get('to') || 'Mombasa'} Routes
        </h2>
        <div className="text-secondary"> {/* Bootstrap text color */}
          {new Date(searchParams.get('date') || new Date()).toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}
        </div>
      </div>
      
      <div className="d-grid gap-4"> {/* Using Bootstrap grid-gap (or simply gap utility in newer Bootstrap) */}
        {routes.map(route => (
          <RouteCard key={route.id} route={route} />
        ))}
      </div>
    </div>
  );
}