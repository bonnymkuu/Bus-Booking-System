import React from "react";

// Receive navigateTo as a prop
export default function Bookings({ navigateTo }) {
  // Mock data - in a real app you'd fetch user's bookings
  const bookings = [
    {
      id: 'BK123456',
      route: {
        company: 'Modern Coast',
        from: 'Nairobi',
        to: 'Mombasa',
        departure: '2023-12-15T08:00:00',
        arrival: '2023-12-15T14:00:00',
        busType: 'Executive'
      },
      passengers: [
        { name: 'John Doe', seat: 'A12' }
      ],
      totalAmount: 1200,
      status: 'confirmed',
      bookingDate: '2023-12-10T14:30:00'
    },
    {
      id: 'BK789012',
      route: {
        company: 'Easy Coach',
        from: 'Nairobi',
        to: 'Kisumu',
        departure: '2023-12-20T07:00:00',
        arrival: '2023-12-20T13:00:00',
        busType: 'Luxury'
      },
      passengers: [
        { name: 'John Doe', seat: 'B05' },
        { name: 'Jane Smith', seat: 'B06' }
      ],
      totalAmount: 3000,
      status: 'confirmed',
      bookingDate: '2023-12-05T09:15:00'
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">My Bookings</h2>
          {/* Use navigateTo instead of Link */}
          <a
            href="#"
            onClick={() => navigateTo('routes')}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md transition duration-300"
          >
            Book New Trip
          </a>
        </div>

        {bookings.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="text-xl font-bold mb-2">No Bookings Yet</h3>
            <p className="text-gray-600 mb-4">You haven't made any bookings yet. Start by searching for routes.</p>
            {/* Use navigateTo instead of Link */}
            <a
              href="#"
              onClick={() => navigateTo('routes')}
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-md transition duration-300"
            >
              Find Buses
            </a>
          </div>
        ) : (
          <div className="space-y-6">
            {bookings.map(booking => (
              <div key={booking.id} className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
                <div className="p-6">
                  <div className="flex flex-col md:flex-row justify-between md:items-center mb-4">
                    <div>
                      <h3 className="text-lg font-bold">
                        {booking.route.from} to {booking.route.to}
                        <span className="ml-2 text-sm font-normal bg-blue-100 text-blue-800 py-1 px-2 rounded-full">
                          {booking.id}
                        </span>
                      </h3>
                      <div className="text-gray-600 text-sm mt-1">
                        Booked on {new Date(booking.bookingDate).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </div>
                    </div>
                    <div className="mt-2 md:mt-0">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        booking.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                        booking.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div>
                      <div className="text-gray-500 text-sm">Operator</div>
                      <div className="font-medium">{booking.route.company}</div>
                    </div>
                    <div>
                      <div className="text-gray-500 text-sm">Departure</div>
                      <div className="font-medium">
                        {new Date(booking.route.departure).toLocaleDateString('en-US', {
                          weekday: 'short',
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </div>
                    </div>
                    <div>
                      <div className="text-gray-500 text-sm">Bus Type</div>
                      <div className="font-medium">{booking.route.busType}</div>
                    </div>
                  </div>

                  <div className="border-t border-gray-200 pt-4">
                    <h4 className="font-bold mb-3">Passengers</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {booking.passengers.map((passenger, index) => (
                        <div key={index} className="bg-gray-50 p-3 rounded-lg">
                          <div className="flex justify-between">
                            <span className="font-medium">{passenger.name}</span>
                            <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-1 rounded">
                              Seat {passenger.seat}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="border-t border-gray-200 mt-4 pt-4 flex justify-between items-center">
                    <div className="font-bold text-lg">
                      Total: KSh {booking.totalAmount.toLocaleString()}
                    </div>
                    <div className="space-x-2">
                      <button className="text-blue-600 hover:text-blue-800 font-medium text-sm">
                        View Ticket
                      </button>
                      {booking.status === 'confirmed' && (
                        <button className="text-red-600 hover:text-red-800 font-medium text-sm ml-2">
                          Cancel Booking
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}