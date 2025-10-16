import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Calendar, Clock, MapPin, Users, Car } from 'lucide-react';

interface Booking {
  id: string;
  booking_reference: string;
  name: string;
  email: string;
  phone: string;
  pickup_location: string;
  pickup_sub_location?: string;
  dropoff_location: string;
  dropoff_sub_location?: string;
  passengers: number;
  vehicle_type: string;
  arrival_date: string;
  arrival_time: string;
  trip_type: string;
  return_date?: string;
  return_time?: string;
  price: number;
  payment_method: string;
  status: string;
  created_at: string;
}

interface BookingCalendarProps {
  bookings: Booking[];
}

export default function BookingCalendar({ bookings }: BookingCalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedBookings, setSelectedBookings] = useState<Booking[]>([]);

  // Debug: Log received bookings
  console.log('📅 [CALENDAR] Received bookings:', bookings.length);
  if (bookings.length > 0) {
    console.log('📅 [CALENDAR] Sample booking dates:', bookings.slice(0, 3).map(b => ({
      id: b.id,
      arrival_date: b.arrival_date,
      return_date: b.return_date
    })));
  }

  const months = [
    'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
    'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
  ];

  const daysOfWeek = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];

  // Obtenir les réservations par date
  const getBookingsByDate = (date: string) => {
    console.log('🗓️ [CALENDAR] Looking for bookings on date:', date);
    const foundBookings = bookings.filter(booking => {
      const bookingDate = booking.arrival_date;
      const returnDate = booking.return_date;
      console.log('🗓️ [CALENDAR] Checking booking:', {
        id: booking.id,
        bookingDate,
        returnDate,
        matches: bookingDate === date || returnDate === date
      });
      return bookingDate === date || returnDate === date;
    });
    console.log('🗓️ [CALENDAR] Found bookings for', date, ':', foundBookings);
    return bookings.filter(booking => {
      const bookingDate = booking.arrival_date;
      const returnDate = booking.return_date;
      return bookingDate === date || returnDate === date;
    });
  };

  // Obtenir le nombre de réservations pour une date
  const getBookingCountForDate = (date: string) => {
    return getBookingsByDate(date).length;
  };

  // Générer les jours du calendrier
  const generateCalendarDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());
    
    const days = [];
    const currentDateObj = new Date(startDate);
    
    for (let i = 0; i < 42; i++) {
      const dateString = currentDateObj.toISOString().split('T')[0];
      const isCurrentMonth = currentDateObj.getMonth() === month;
      const isToday = dateString === new Date().toISOString().split('T')[0];
      const bookingCount = getBookingCountForDate(dateString);
      
      // Debug pour quelques dates
      if (i < 5) {
        console.log('🗓️ [CALENDAR] Day', i, ':', {
          dateString,
          bookingCount,
          isCurrentMonth
        });
      }
      
      days.push({
        date: new Date(currentDateObj),
        dateString,
        isCurrentMonth,
        isToday,
        bookingCount,
        day: currentDateObj.getDate()
      });
      
      currentDateObj.setDate(currentDateObj.getDate() + 1);
    }
    
    return days;
  };

  const handleDateClick = (dateString: string) => {
    setSelectedDate(dateString);
    setSelectedBookings(getBookingsByDate(dateString));
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    if (direction === 'prev') {
      newDate.setMonth(newDate.getMonth() - 1);
    } else {
      newDate.setMonth(newDate.getMonth() + 1);
    }
    setCurrentDate(newDate);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'paid': return 'bg-green-100 text-green-800 border-green-200';
      case 'confirmed': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'cancelled': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const formatTime = (time: string) => {
    return time.substring(0, 5); // HH:MM
  };

  const calendarDays = generateCalendarDays();

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900 flex items-center">
          <Calendar className="h-6 w-6 mr-2 text-royal-gold-500" />
          Calendrier des Réservations
        </h2>
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigateMonth('prev')}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ChevronLeft className="h-5 w-5 text-gray-600" />
          </button>
          <h3 className="text-lg font-semibold text-gray-900 min-w-[200px] text-center">
            {months[currentDate.getMonth()]} {currentDate.getFullYear()}
          </h3>
          <button
            onClick={() => navigateMonth('next')}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ChevronRight className="h-5 w-5 text-gray-600" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendrier */}
        <div className="lg:col-span-2">
          {/* En-têtes des jours */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {daysOfWeek.map(day => (
              <div key={day} className="p-2 text-center text-sm font-medium text-gray-500">
                {day}
              </div>
            ))}
          </div>

          {/* Grille du calendrier */}
          <div className="grid grid-cols-7 gap-1">
            {calendarDays.map((day, index) => (
              <button
                key={index}
                onClick={() => handleDateClick(day.dateString)}
                className={`
                  relative p-2 h-16 text-sm border rounded-lg transition-all duration-200 hover:bg-gray-50
                  ${day.isCurrentMonth ? 'text-gray-900' : 'text-gray-400'}
                  ${day.isToday ? 'bg-royal-gold-100 border-royal-gold-300 font-bold' : 'border-gray-200'}
                  ${selectedDate === day.dateString ? 'ring-2 ring-royal-gold-500 bg-royal-gold-50' : ''}
                `}
              >
                <div className="flex flex-col h-full">
                  <span className={day.isToday ? 'text-royal-gold-700' : ''}>{day.day}</span>
                  {day.bookingCount > 0 && (
                    <div className="flex-1 flex items-end justify-center">
                      <span className={`
                        inline-flex items-center justify-center w-5 h-5 text-xs font-bold rounded-full
                        ${day.bookingCount > 3 ? 'bg-red-500 text-white' : 
                          day.bookingCount > 1 ? 'bg-orange-500 text-white' : 
                          'bg-green-500 text-white'}
                      `}>
                        {day.bookingCount}
                      </span>
                    </div>
                  )}
                </div>
              </button>
            ))}
          </div>

          {/* Légende */}
          <div className="mt-4 flex items-center justify-center space-x-6 text-sm text-gray-600">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-green-500 rounded-full"></div>
              <span>1 réservation</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-orange-500 rounded-full"></div>
              <span>2-3 réservations</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-red-500 rounded-full"></div>
              <span>4+ réservations</span>
            </div>
          </div>
        </div>

        {/* Détails des réservations pour la date sélectionnée */}
        <div className="lg:col-span-1">
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="font-semibold text-gray-900 mb-4">
              {selectedDate ? (
                <>Réservations du {new Date(selectedDate + 'T00:00:00').toLocaleDateString('fr-FR')}</>
              ) : (
                'Sélectionnez une date'
              )}
            </h4>

            {selectedDate && selectedBookings.length === 0 && (
              <p className="text-gray-500 text-center py-8">
                Aucune réservation pour cette date
              </p>
            )}

            {selectedBookings.length > 0 && (
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {selectedBookings.map((booking) => {
                  const isReturnDate = booking.return_date === selectedDate;
                  return (
                    <div key={`${booking.id}-${isReturnDate ? 'return' : 'outbound'}`} className="bg-white rounded-lg p-3 border border-gray-200">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-mono text-gray-500">
                          {booking.booking_reference}
                        </span>
                        <span className={`px-2 py-1 text-xs rounded-full border ${getStatusColor(booking.status)}`}>
                          {booking.status}
                        </span>
                      </div>
                      
                      <div className="space-y-1 text-sm">
                        <div className="flex items-center text-gray-700">
                          <Clock className="h-3 w-3 mr-1 text-royal-gold-500" />
                          <span className="font-medium">
                            {isReturnDate ? formatTime(booking.return_time || '00:00') : formatTime(booking.arrival_time)}
                          </span>
                          {isReturnDate && (
                            <span className="ml-2 text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded">
                              RETOUR
                            </span>
                          )}
                        </div>
                        
                        <div className="flex items-center text-gray-700">
                          <MapPin className="h-3 w-3 mr-1 text-royal-gold-500" />
                          <span className="text-xs">
                            {isReturnDate ? 
                              `${booking.dropoff_location} → ${booking.pickup_location}` :
                              `${booking.pickup_location} → ${booking.dropoff_location}`
                            }
                          </span>
                        </div>
                        
                        <div className="flex items-center justify-between text-gray-700">
                          <div className="flex items-center">
                            <Users className="h-3 w-3 mr-1 text-royal-gold-500" />
                            <span className="text-xs">{booking.passengers}p</span>
                          </div>
                          <div className="flex items-center">
                            <Car className="h-3 w-3 mr-1 text-royal-gold-500" />
                            <span className="text-xs">{booking.vehicle_type}</span>
                          </div>
                        </div>
                        
                        <div className="text-xs text-gray-600 font-medium">
                          {booking.name} • €{booking.price}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}