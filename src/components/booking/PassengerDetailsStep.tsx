import React from 'react';
import { ChevronDown } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface PassengerDetails {
  babySeats: number;
  childSeats: number;
  strollers: number;
  handLuggages: number;
  backpacks: number;
  suitcases: number;
}

interface PassengerDetailsStepProps {
  passengerDetails: PassengerDetails;
  setPassengerDetails: React.Dispatch<React.SetStateAction<PassengerDetails>>;
  price: number;
  onBack: () => void;
  onNext: () => void;
}

export default function PassengerDetailsStep({
  passengerDetails,
  setPassengerDetails,
  price,
  onBack,
  onNext
}: PassengerDetailsStepProps) {
  const { t } = useTranslation();
  
  // Scroll to top when component mounts
  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);
  
  const handleDetailChange = (field: keyof PassengerDetails, value: number) => {
    setPassengerDetails(prev => ({ ...prev, [field]: value }));
  };

  const renderSelector = (
    label: string,
    field: keyof PassengerDetails,
    maxValue: number = 10
  ) => {
    const options = Array.from({ length: maxValue + 1 }, (_, i) => i);
    
    return (
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
        </label>
        <div className="relative">
          <select
            value={passengerDetails[field]}
            onChange={(e) => handleDetailChange(field, parseInt(e.target.value))}
            className="block w-full pl-3 pr-10 py-3 text-base border border-royal-gold-300 focus:outline-none focus:ring-royal-gold-500 focus:border-royal-gold-500 rounded-md bg-royal-gold-50 appearance-none"
          >
            {options.map(num => (
              <option key={num} value={num}>{num}</option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-3.5 h-5 w-5 text-gray-400 pointer-events-none" />
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden border border-royal-gold-200">
      <div className="bg-royal-gold-50 p-6 text-center">
        <h2 className="text-xl font-semibold text-royal-brown-800">
          {t('booking.step2.title')}
        </h2>
      </div>

      <div className="p-6 space-y-4">
        {renderSelector(t('booking.step2.babySeats'), 'babySeats', 5)}
        {renderSelector(t('booking.step2.childSeats'), 'childSeats', 5)}
        {renderSelector(t('booking.step2.strollers'), 'strollers', 5)}
        {renderSelector(t('booking.step2.handLuggage'), 'handLuggages', 15)}
        {renderSelector(t('booking.step2.backpacks'), 'backpacks', 15)}
        {renderSelector(t('booking.step2.suitcases'), 'suitcases', 15)}

        <div className="pt-6 border-t border-gray-200">
          <div className="text-center mb-6">
            <span className="text-lg font-semibold text-royal-brown-900">
              {t('booking.step1.price')} €{price}
            </span>
          </div>

          <div className="flex justify-center space-x-4">
            <button
              onClick={onBack}
              className="bg-royal-brown-200 text-royal-brown-800 px-6 py-2 rounded-md hover:bg-royal-brown-300 transition-colors font-medium"
            >
              {t('booking.step2.back')}
            </button>
            <button
              onClick={onNext}
              className="bg-royal-gold-500 text-royal-brown-950 px-6 py-2 rounded-md hover:bg-royal-gold-600 transition-colors font-medium"
            >
              {t('booking.step2.next')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}