import React from 'react';
import { CheckCircle, Calendar, Clock, MapPin, Users, Car } from 'lucide-react';

interface BookingConfirmationProps {
  booking: {
    id: string;
    bookingReference: string;
    pickup: string;
    dropoff: string;
    date: string;
    time: string;
    passengers: number;
    vehicleType: string;
    price: number;
    status: string;
  };
}

export default function BookingConfirmation({ booking }: BookingConfirmationProps) {
  const formatLocation = (location: string) => {
    return location.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  const formatVehicleType = (type: string) => {
    switch (type) {
      case 'berline':
        return 'Berline';
      case 'van':
        return 'Van';
      default:
        return type;
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="bg-green-50 p-6 text-center border-b">
        <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900">Booking Confirmed!</h2>
        <p className="text-gray-600 mt-2">
          Your transfer has been successfully booked. You will receive a confirmation email shortly.
        </p>
      </div>

      <div className="p-6">
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Booking Details</h3>
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Booking Reference:</span>
              <span className="font-mono text-lg font-bold text-blue-600">
                {booking.bookingReference}
              </span>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-start space-x-3">
            <MapPin className="h-5 w-5 text-blue-500 mt-0.5" />
            <div>
              <p className="font-medium text-gray-900">Route</p>
              <p className="text-gray-600">
                From: {formatLocation(booking.pickup)}
              </p>
              <p className="text-gray-600">
                To: {formatLocation(booking.dropoff)}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <Calendar className="h-5 w-5 text-blue-500" />
            <div>
              <p className="font-medium text-gray-900">Date</p>
              <p className="text-gray-600">
                {new Date(booking.date).toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <Clock className="h-5 w-5 text-blue-500" />
            <div>
              <p className="font-medium text-gray-900">Time</p>
              <p className="text-gray-600">{booking.time}</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <Users className="h-5 w-5 text-blue-500" />
            <div>
              <p className="font-medium text-gray-900">Passengers</p>
              <p className="text-gray-600">{booking.passengers} passenger{booking.passengers > 1 ? 's' : ''}</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <Car className="h-5 w-5 text-blue-500" />
            <div>
              <p className="font-medium text-gray-900">Vehicle</p>
              <p className="text-gray-600">{formatVehicleType(booking.vehicleType)}</p>
            </div>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-gray-200">
          <div className="flex justify-between items-center">
            <span className="text-lg font-semibold text-gray-900">Total Price:</span>
            <span className="text-2xl font-bold text-blue-600">{booking.price}€</span>
          </div>
        </div>

        <div className="mt-6 bg-blue-50 rounded-lg p-4">
          <h4 className="font-semibold text-gray-900 mb-2">What's Next?</h4>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• You will receive a confirmation email with all details</li>
            <li>• Our driver will contact you 30 minutes before pickup</li>
            <li>• Payment can be made directly to the driver (cash or card)</li>
            <li>• For any changes, please contact us at least 24 hours in advance</li>
          </ul>
        </div>

        <div className="mt-6 text-center">
          <button
            onClick={() => window.location.href = '/'}
            className="bg-royal-gold-500 text-royal-brown-950 px-6 py-2 rounded-md hover:bg-royal-gold-600 focus:outline-none focus:ring-2 focus:ring-royal-gold-500 focus:ring-offset-2 font-medium"
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}