import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function RoutesManagement() {
  const [routes, setRoutes] = useState([
    {
      id: 1,
      from: 'Nairobi',
      to: 'Mombasa',
      departureTime: '08:00',
      arrivalTime: '14:00',
      price: 1200,
      bus: 'KBS 123A',
      active: true
    },
    {
      id: 2,
      from: 'Nairobi',
      to: 'Kisumu',
      departureTime: '07:00',
      arrivalTime: '13:00',
      price: 1500,
      bus: 'KBS 456B',
      active: true
    },
    {
      id: 3,
      from: 'Mombasa',
      to: 'Malindi',
      departureTime: '09:30',
      arrivalTime: '11:30',
      price: 800,
      bus: 'KBS 789C',
      active: false
    }
  ]);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newRoute, setNewRoute] = useState({
    from: '',
    to: '',
    departureTime: '',
    arrivalTime: '',
    price: '',
    bus: '',
    active: true
  });

  const toggleRouteStatus = (id) => {
    setRoutes(routes.map(route => 
      route.id === id ? {...route, active: !route.active} : route
    ));
  };

  const handleAddRoute = (e) => {
    e.preventDefault();
    setRoutes([...routes, {
      ...newRoute,
      id: Math.max(...routes.map(r => r.id)) + 1,
      price: parseInt(newRoute.price)
    }]);
    setNewRoute({
      from: '',
      to: '',
      departureTime: '',
      arrivalTime: '',
      price: '',
      bus: '',
      active: true
    });
    setIsAddModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Manage Routes</h2>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md"
        >
          Add New Route
        </button>
      </div>

      {/* Add Route Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">Add New Route</h3>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <form onSubmit={handleAddRoute} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">From</label>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded-md"
                  value={newRoute.from}
                  onChange={(e) => setNewRoute({...newRoute, from: e.target.value})}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">To</label>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded-md"
                  value={newRoute.to}
                  onChange={(e) => setNewRoute({...newRoute, to: e.target.value})}
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Departure Time</label>
                  <input
                    type="time"
                    className="w-full p-2 border border-gray-300 rounded-md"
                    value={newRoute.departureTime}
                    onChange={(e) => setNewRoute({...newRoute, departureTime: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Arrival Time</label>
                  <input
                    type="time"
                    className="w-full p-2 border border-gray-300 rounded-md"
                    value={newRoute.arrivalTime}
                    onChange={(e) => setNewRoute({...newRoute, arrivalTime: e.target.value})}
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Price (KSh)</label>
                  <input
                    type="number"
                    className="w-full p-2 border border-gray-300 rounded-md"
                    value={newRoute.price}
                    onChange={(e) => setNewRoute({...newRoute, price: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Bus Number</label>
                  <input
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded-md"
                    value={newRoute.bus}
                    onChange={(e) => setNewRoute({...newRoute, bus: e.target.value})}
                    required
                  />
                </div>
              </div>
              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md text-sm font-medium text-white"
                >
                  Save Route
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Routes Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Route
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Schedule
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Bus
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {routes.map((route) => (
                <tr key={route.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium">{route.from} to {route.to}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {route.departureTime} - {route.arrivalTime}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {route.bus}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    KSh {route.price.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      onClick={() => toggleRouteStatus(route.id)}
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full cursor-pointer ${
                        route.active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {route.active ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <Link
                      to={`/admin/routes/edit/${route.id}`}
                      className="text-blue-600 hover:text-blue-900 mr-3"
                    >
                      Edit
                    </Link>
                    <button className="text-red-600 hover:text-red-900">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}