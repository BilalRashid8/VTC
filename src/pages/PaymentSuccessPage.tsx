import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useSearchParams, Link } from 'react-router-dom';
import { CheckCircle, Mail, Calendar, Clock, MapPin, Users, Car, Download, Loader2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import PageSEO from '../components/seo/PageSEO';

const API_BASE_URL = import.meta.env.VITE_API_URL ? `${import.meta.env.VITE_API_URL}/api` : 'https://vtc-backend-ccuj.onrender.com/api';


interface BookingDetails {
  id: string;
  bookingReference: string;
  name: string;
  email: string;
  phone: string;
  pickup_location: string;
  pickup_sub_location: string;
  pickup_address: string;
  pickup_flight_number: string;
  pickup_train_number: string;
  dropoff_location: string;
  dropoff_sub_location: string;
  dropoff_address: string;
  dropoff_flight_number: string;
  dropoff_train_number: string;
  passengers: number;
  vehicle_type: string;
  arrival_date: string;
  arrival_time: string;
  trip_type: string;
  return_date?: string;
  return_time?: string;
  price: number;
  amount_paid: number;
  amount_remaining: number;
  payment_method: string;
  payment_status: string;
  created_at: string;
}

export default function PaymentSuccessPage() {
  
  <Helmet>
  <PageSEO pageKey="paymentSuccess" />
  <link rel="canonical" href="https://transfertroyalparis.com/" />
</Helmet>

  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const [booking, setBooking] = useState<BookingDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [emailSent, setEmailSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sessionId = searchParams.get('session_id');

  useEffect(() => {
    const fetchBookingDetails = async () => {
      if (!sessionId) {
        setError(`Session ID missing. Current URL: ${window.location.href}`);
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`${API_BASE_URL}/booking-success/${sessionId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Error retrieving booking details');
        }

        const bookingData = await response.json();
        setBooking(bookingData);
        setEmailSent(true);

      } catch (err) {
        console.error('Error:', err);
        setError('Error retrieving booking details');
      } finally {
        setLoading(false);
      }
    };

    fetchBookingDetails();
  }, [sessionId]);

  const formatLocation = (location: string, subLocation?: string, address?: string) => {
    let formatted = location.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    if (subLocation) {
      formatted += ` - ${subLocation}`;
    }
    if (address) {
      formatted += ` (${address})`;
    }
    return formatted;
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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 text-royal-gold-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">{t('success.processing')}</p>
        </div>
      </div>
    );
  }

  if (error || !booking) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-8 text-center">
          <div className="text-red-500 mb-4">
            <svg className="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 18.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">{t('success.error.title')}</h2>
          <p className="text-gray-600 mb-6">{error || t('success.error.message')}</p>
          <Link
            to="/"
            className="bg-royal-gold-500 text-royal-brown-950 px-6 py-2 rounded-md hover:bg-royal-gold-600 font-medium"
          >
            {t('success.error.backToHome')}
          </Link>
        </div>
      </div>
    );
  }
  // === CALCULS AFFICHAGE PRIX ===
const price = Number(booking.price ?? 0);
const isDeposit = booking.payment_method === 'cash';

const amountPaid = Number(
  booking.amount_paid !== undefined && booking.amount_paid !== null
    ? booking.amount_paid
    : isDeposit
      ? Math.round(price * 0.2) // 20% d'acompte
      : price                   // paiement carte = 100%
);

const amountRemaining = Number(
  booking.amount_remaining !== undefined && booking.amount_remaining !== null
    ? booking.amount_remaining
    : isDeposit
      ? price - amountPaid      // 80% à régler au chauffeur
      : 0                       // paiement carte = rien à payer
);


  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Success Header */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
          <div className="bg-green-50 p-8 text-center border-b">
            <CheckCircle className="h-20 w-20 text-green-500 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{t('success.title')}</h1>
            <p className="text-lg text-gray-600">
              {t('success.subtitle')}
            </p>
            <div className="mt-4 inline-flex items-center px-4 py-2 bg-green-100 rounded-full">
              <span className="text-green-800 font-medium">
                {t('success.bookingReference')} {booking.bookingReference}
              </span>
            </div>
          </div>

          {/* Email Confirmation Status */}
          <div className="p-6 bg-royal-gold-50 border-b">
            <div className="flex items-center justify-center space-x-3">
              <Mail className="h-6 w-6 text-royal-gold-600" />
              <span className="text-royal-brown-800 font-medium">
                {emailSent 
                  ? `${t('success.emailSent')} ${booking.email}` 
                  : t('success.sendingEmail')
                }
              </span>
            </div>
          </div>
        </div>

        {/* Booking Details */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">{t('success.bookingDetails')}</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Trip Information */}
            <div className="space-y-6">
              <div className="flex items-start space-x-3">
                <MapPin className="h-6 w-6 text-royal-gold-500 mt-1" />
                <div>
                  <p className="font-semibold text-gray-900">{t('success.route')}</p>
                  <p className="text-gray-600">
                    <strong>{t('success.from')}</strong> {formatLocation(booking.pickup_location, booking.pickup_sub_location, booking.pickup_address)}
                  </p>
                  <p className="text-gray-600">
                    <strong>{t('success.to')}</strong> {formatLocation(booking.dropoff_location, booking.dropoff_sub_location, booking.dropoff_address)}
                  </p>
                  {booking.pickup_flight_number && (
                    <p className="text-gray-600">
                      <strong>{t('success.flight')}</strong> {booking.pickup_flight_number}
                    </p>
                  )}
                  {booking.pickup_train_number && (
                    <p className="text-gray-600">
                      <strong>{t('success.train')}</strong> {booking.pickup_train_number}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Calendar className="h-6 w-6 text-royal-gold-500" />
                <div>
                  <p className="font-semibold text-gray-900">{t('success.date')}</p>
                  <p className="text-gray-600">{formatDate(booking.arrival_date)}</p>
                  {booking.trip_type === 'round-trip' && booking.return_date && (
                    <p className="text-gray-600">
                      <strong>{t('success.returnDate')}</strong> {formatDate(booking.return_date)}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Clock className="h-6 w-6 text-royal-gold-500" />
                <div>
                  <p className="font-semibold text-gray-900">{t('success.time')}</p>
                  <p className="text-gray-600">{booking.arrival_time}</p>
                  {booking.trip_type === 'round-trip' && booking.return_time && (
                    <p className="text-gray-600">
                      <strong>{t('success.returnTime')}</strong> {booking.return_time}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Service Information */}
            <div className="space-y-6">
              <div className="flex items-center space-x-3">
                <Users className="h-6 w-6 text-royal-gold-500" />
                <div>
                  <p className="font-semibold text-gray-900">{t('success.passengers')}</p>
                  <p className="text-gray-600">{booking.passengers} {booking.passengers > 1 ? t('success.passengers') : t('success.passenger')}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Car className="h-6 w-6 text-royal-gold-500" />
                <div>
                  <p className="font-semibold text-gray-900">{t('success.vehicle')}</p>
                  <p className="text-gray-600">{formatVehicleType(booking.vehicle_type)}</p>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2">{t('success.customerInfo')}</h3>
                <p className="text-gray-600"><strong>{t('success.name')}</strong> {booking.name}</p>
                <p className="text-gray-600"><strong>{t('success.email')}</strong> {booking.email}</p>
                <p className="text-gray-600"><strong>{t('success.phone')}</strong> {booking.phone}</p>
              </div>
            </div>
          </div>

          {/* Price Summary */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="space-y-4">
              {booking.payment_method === 'cash' ? (
                <>
<div className="bg-royal-gold-50 rounded-lg p-4">
  <h4 className="font-semibold text-gray-900 mb-3">
    💰 {t('success.paymentSummary.cashDeposit')}
  </h4>
  <div className="space-y-2">
    <div className="flex justify-between items-center">
      <span className="text-gray-700">{t('success.paymentSummary.totalPrice')}</span>
      <span className="font-medium text-gray-900">€{booking.price}</span>
    </div>

    {(() => {
      // Sécurise les montants
      const price = booking.price || 0;
      let amountPaid = booking.amount_paid;
      let amountRemaining = booking.amount_remaining;

      // Si pas défini par le backend, on recalcule
      if (amountPaid == null || amountRemaining == null) {
        if (booking.payment_method === 'cash') {
          amountPaid = Math.round(price * 0.2);
          amountRemaining = price - amountPaid;
        } else {
          amountPaid = price;
          amountRemaining = 0;
        }
      }

      return (
        <>
          <div className="flex justify-between items-center border-t pt-2">
            <span className="text-lg font-semibold text-green-700">
              ✅ {t('success.paymentSummary.depositPaid')}
            </span>
            <span className="text-2xl font-bold text-green-600">€{amountPaid}</span>
          </div>

          <div className="flex justify-between items-center bg-royal-gold-100 p-3 rounded border-l-4 border-royal-gold-400">
            <span className="text-lg font-semibold text-royal-brown-700">
              💵 {t('success.paymentSummary.remainingToPay')}
            </span>
            <span className="text-2xl font-bold text-royal-brown-600">€{amountRemaining}</span>
          </div>
        </>
      );
    })()}
  </div>
</div>

                </>
              ) : (
                <>
                  <div className="bg-green-50 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-3">💳 {t('success.paymentSummary.fullCard')}</h4>
                    <div className="flex justify-between items-center">
                      <span className="text-xl font-semibold text-gray-900">✅ {t('success.paymentSummary.totalPaid')}</span>
                      <span className="text-3xl font-bold text-green-600">€{booking.price}</span>
                    </div>
                    <p className="text-sm text-green-700 mt-2">
                      ✅ {t('success.paymentSummary.fullyPaid')}
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Next Steps */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">{t('success.nextSteps.title')}</h2>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-6 h-6 bg-royal-gold-100 rounded-full flex items-center justify-center">
                <span className="text-royal-brown-600 text-sm font-bold">1</span>
              </div>
              <p className="text-gray-600">{t('success.nextSteps.emailConfirmation')}</p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-6 h-6 bg-royal-gold-100 rounded-full flex items-center justify-center">
                <span className="text-royal-brown-600 text-sm font-bold">2</span>
              </div>
              <p className="text-gray-600">{t('success.nextSteps.driverContact')}</p>
            </div>
            {booking.payment_method === 'cash' && (
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-6 h-6 bg-royal-gold-100 rounded-full flex items-center justify-center">
                  <span className="text-royal-brown-600 text-sm font-bold">💵</span>
                </div>
                <p className="text-gray-600">
                  <strong>{t('success.paymentSummary.prepareCash')} €{booking.amount_remaining} {t('success.nextSteps.cashForDriver')}</strong>
                </p>
              </div>
            )}
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-6 h-6 bg-royal-gold-100 rounded-full flex items-center justify-center">
                <span className="text-royal-brown-600 text-sm font-bold">{booking.payment_method === 'cash' ? '3' : '3'}</span>
              </div>
              <p className="text-gray-600">{t('success.nextSteps.modifications')}</p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => window.print()}
            className="inline-flex items-center px-6 py-3 border border-royal-gold-300 rounded-md shadow-sm text-base font-medium text-royal-brown-700 bg-white hover:bg-royal-gold-50"
          >
            <Download className="h-5 w-5 mr-2" />
            {t('success.actions.printConfirmation')}
          </button>
          <Link
            to="/"
            className="inline-flex items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-royal-brown-950 bg-royal-gold-500 hover:bg-royal-gold-600"
          >
            {t('success.actions.backToHome')}
          </Link>
        </div>
      </div>
    </div>
  );
}