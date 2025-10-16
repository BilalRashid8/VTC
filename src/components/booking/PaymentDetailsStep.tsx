import React from 'react';
import { ChevronDown } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface PaymentDetails {
  paymentMethod: string;
  name: string;
  email: string;
  phone: string;
  notes: string;
}

interface BookingFormData {
  pickupLocation: string;
  pickupSubLocation: string;
  pickupAddress: string;
  pickupFlightNumber: string;
  pickupTrainNumber: string;
  dropoffLocation: string;
  dropoffSubLocation: string;
  dropoffAddress: string;
  dropoffFlightNumber: string;
  dropoffTrainNumber: string;
  passengers: string;
  vehicleType: string;
  date: string;
  time: string;
  returnDate: string;
  returnTime: string;
  tripType: 'one-way' | 'round-trip';
}

interface PassengerDetails {
  babySeats: number;
  childSeats: number;
  strollers: number;
  handLuggages: number;
  backpacks: number;
  suitcases: number;
}

interface PaymentDetailsStepProps {
  paymentDetails: PaymentDetails;
  setPaymentDetails: React.Dispatch<React.SetStateAction<PaymentDetails>>;
  price: number;
  onBack: () => void;
  onSubmit: () => void;
  formData: BookingFormData;
  passengerDetails: PassengerDetails;
}

export default function PaymentDetailsStep({
  paymentDetails,
  setPaymentDetails,
  price,
  onBack,
  onSubmit,
  formData,
  passengerDetails,
}: PaymentDetailsStepProps) {
  const { t } = useTranslation();
  
  // Scroll to top when component mounts
  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleDetailChange = (field: keyof PaymentDetails, value: string) => {
    setPaymentDetails(prev => ({ ...prev, [field]: value }));
  };

  const paymentMethods = [
    { value: 'cash', label: t('booking.step3.cash') },
    { value: 'card', label: t('booking.step3.card') },
  ];

  // Calculate deposit amount (20% for cash, full amount for card)
  const getPaymentAmount = () => {
    return paymentDetails.paymentMethod === 'cash' ? Math.round(price * 0.2) : price;
  };

  const getRemainingAmount = () => {
    return paymentDetails.paymentMethod === 'cash' ? price - getPaymentAmount() : 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!paymentDetails.paymentMethod || !paymentDetails.name || !paymentDetails.email || !paymentDetails.phone) {
      alert('Please fill in all required fields');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(paymentDetails.email)) {
      alert('Please enter a valid email address');
      return;
    }

    // Call the onSubmit function passed as prop from BookingForm
    onSubmit();
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden border border-royal-gold-200">
      <div className="bg-royal-gold-50 p-6 text-center">
        <h2 className="text-xl font-semibold text-royal-brown-800">
          {t('booking.step3.title')}
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="p-6 space-y-6">
        <div>
          <label className="block text-sm font-medium text-royal-brown-700 mb-2">
            {t('booking.step3.paymentMethod')}
          </label>
          <div className="relative">
            <select
              value={paymentDetails.paymentMethod}
              onChange={(e) => handleDetailChange('paymentMethod', e.target.value)}
              className="block w-full pl-3 pr-10 py-3 border border-royal-gold-300 focus:outline-none focus:ring-royal-gold-500 focus:border-royal-gold-500 rounded-md bg-royal-gold-50"
              required
            >
            <option value="">{t('booking.step3.selectMethod')}</option>
              {paymentMethods.map(method => (
                <option key={method.value} value={method.value}>{method.label}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-3.5 h-5 w-5 text-gray-400 pointer-events-none" />
          </div>
        </div>

        {/* Payment Amount Information */}
        <div className="bg-royal-gold-50 rounded-lg p-4 mb-6">
          {paymentDetails.paymentMethod === 'cash' ? (
            <div>
              <h3 className="font-semibold text-royal-brown-900 mb-2">
                💰 {t('booking.step3.cashPayment')}
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>{t('booking.step3.totalPrice')}</span>
                  <span className="font-medium text-royal-brown-900">€{price}</span>
                </div>
                <div className="flex justify-between text-royal-gold-600 font-semibold">
                  <span>{t('booking.step3.depositToPay')}</span>
                  <span>€{getPaymentAmount()}</span>
                </div>
                <div className="flex justify-between text-royal-brown-600">
                  <span>{t('booking.step3.remainingToPay')}</span>
                  <span>€{getRemainingAmount()}</span>
                </div>
              </div>
              <p className="text-xs text-royal-brown-500 mt-2">
                ℹ️ {t('booking.step3.depositInfo')}
              </p>
            </div>
          ) : (
            <div>
              <h3 className="font-semibold text-royal-brown-900 mb-2">
                💳 {t('booking.step3.cardPayment')}
              </h3>
              <div className="flex justify-between text-royal-gold-600 font-semibold">
                <span>{t('booking.step3.totalToPay')}</span>
                <span>€{price}</span>
              </div>
              <p className="text-xs text-royal-brown-500 mt-2">
                ℹ️ {t('booking.step3.cardInfo')}
              </p>
            </div>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-royal-brown-700 mb-2">
            {t('booking.step3.name')}
          </label>
          <input
            type="text"
            value={paymentDetails.name}
            onChange={(e) => handleDetailChange('name', e.target.value)}
            className="w-full py-3 px-3 border border-royal-gold-300 focus:outline-none focus:ring-royal-gold-500 focus:border-royal-gold-500 rounded-md bg-royal-gold-50"
            placeholder={t('booking.step3.namePlaceholder')}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-royal-brown-700 mb-2">
            {t('booking.step3.email')}
          </label>
          <input
            type="email"
            value={paymentDetails.email}
            onChange={(e) => handleDetailChange('email', e.target.value)}
            className="w-full py-3 px-3 border border-royal-gold-300 focus:outline-none focus:ring-royal-gold-500 focus:border-royal-gold-500 rounded-md bg-royal-gold-50"
            placeholder={t('booking.step3.emailPlaceholder')}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-royal-brown-700 mb-2">
            {t('booking.step3.phone')}
          </label>
          <input
            type="tel"
            value={paymentDetails.phone}
            onChange={(e) => handleDetailChange('phone', e.target.value)}
            className="w-full py-3 px-3 border border-royal-gold-300 focus:outline-none focus:ring-royal-gold-500 focus:border-royal-gold-500 rounded-md bg-royal-gold-50"
            placeholder={t('booking.step3.phonePlaceholder')}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-royal-brown-700 mb-2">
            {t('booking.step3.notes')}
          </label>
          <textarea
            value={paymentDetails.notes}
            onChange={(e) => handleDetailChange('notes', e.target.value)}
            rows={3}
            className="w-full py-3 px-3 border border-royal-gold-300 focus:outline-none focus:ring-royal-gold-500 focus:border-royal-gold-500 rounded-md bg-royal-gold-50"
            placeholder={t('booking.step3.notesPlaceholder')}
          />
        </div>

        <div className="pt-6 border-t border-royal-gold-200 text-center">
          <div className="mt-4 flex justify-center space-x-4">
            <button
              type="button"
              onClick={onBack}
              className="bg-royal-brown-200 text-royal-brown-800 px-6 py-2 rounded-md hover:bg-royal-brown-300 transition-colors font-medium"
            >
              {t('booking.step2.back')}
            </button>
            <button
              type="submit"
              className="bg-royal-gold-500 text-royal-brown-950 px-6 py-3 rounded-md hover:bg-royal-gold-600 transition-colors font-medium flex items-center justify-center min-w-[140px]"
            >
              {paymentDetails.paymentMethod === 'cash' ? (
                <div className="flex items-center space-x-2">
                  <span className="text-sm">{t('booking.step3.payDeposit')}</span>
                  <span className="text-xs bg-royal-brown-800 text-royal-gold-100 px-2 py-1 rounded">{t('booking.step3.stripe')}</span>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <span className="text-sm">{t('booking.step3.payWith')}</span>
                  <span className="text-xs bg-royal-brown-800 text-royal-gold-100 px-2 py-1 rounded">{t('booking.step3.stripe')}</span>
                </div>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}