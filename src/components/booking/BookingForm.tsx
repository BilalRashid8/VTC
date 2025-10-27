import React, { useState, useEffect } from 'react';
import { ChevronDown, Clock, Loader2, MapPin, Plane, Train } from 'lucide-react';
import PassengerDetailsStep from './PassengerDetailsStep';
import PaymentDetailsStep from './PaymentDetailsStep';
import AddressAutocomplete from '../AddressAutocomplete';
import { useTranslation } from 'react-i18next';

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

interface PaymentDetails {
  paymentMethod: string;
  name: string;
  email: string;
  phone: string;
  notes: string;
}

interface PriceEstimate {
  price: number;
}

const API_BASE_URL = import.meta.env.VITE_API_URL ? `${import.meta.env.VITE_API_URL}/api` : 'https://vtc-backend-ccuj.onrender.com/api';

export default function BookingForm() {
  const { t } = useTranslation();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<BookingFormData>({
    pickupLocation: '',
    pickupSubLocation: '',
    pickupAddress: '',
    pickupFlightNumber: '',
    pickupTrainNumber: '',
    dropoffLocation: '',
    dropoffSubLocation: '',
    dropoffAddress: '',
    dropoffFlightNumber: '',
    dropoffTrainNumber: '',
    passengers: '',
    vehicleType: '',
    date: '',
    time: '',
    returnDate: '',
    returnTime: '',
    tripType: 'one-way'
  });

  const [passengerDetails, setPassengerDetails] = useState<PassengerDetails>({
    babySeats: 0,
    childSeats: 0,
    strollers: 0,
    handLuggages: 0,
    backpacks: 0,
    suitcases: 0
  });

  const [paymentDetails, setPaymentDetails] = useState<PaymentDetails>({
    paymentMethod: '',
    name: '',
    email: '',
    phone: '',
    notes: ''
  });

  const [priceEstimate, setPriceEstimate] = useState<PriceEstimate | null>(null);
  const [isLoadingPrice, setIsLoadingPrice] = useState(false);
  const [priceError, setPriceError] = useState<string | null>(null);

  // Scroll to top when step changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentStep]);

  const locations = [
    { value: 'Charles de Gaulle', label: t('booking.locations.charlesDeGaulle') },
    { value: 'Paris', label: t('booking.locations.parisCenter') },
    { value: 'Orly', label: t('booking.locations.orly') },
    { value: 'Beauvais', label: t('booking.locations.beauvais') },
    { value: 'Disneyland', label: t('booking.locations.disneyland') },
    { value: 'Train Station', label: t('booking.locations.trainStation') }
  ];

  const trainStations = [
    { value: 'Gare du Nord', label: t('booking.locations.gareNord') },
    { value: 'Gare de Lyon', label: t('booking.locations.gareLyon') },
    { value: 'Montparnasse', label: t('booking.locations.montparnasse') },
    { value: 'Saint Lazare', label: t('booking.locations.saintLazare') },
    { value: 'Austerlitz', label: t('booking.locations.austerlitz') },
    { value: 'Gare de l\'Est', label: t('booking.locations.gareEst') },
    { value: 'Bercy', label: t('booking.locations.bercy') }
  ];

  const disneylandOptions = [
    { value: 'Disneyland Park', label: t('booking.locations.disneylandPark') },
    { value: 'Disney Hotels', label: t('booking.locations.disneyHotels') }
  ];

  const allVehicleTypes = [
    { value: 'berline', label: t('booking.vehicles.berline'), maxPassengers: 3 },
    { value: 'van', label: t('booking.vehicles.van'), maxPassengers: 18 }
  ];

  // Helper function to check if location is an airport
  const isAirport = (location: string) => {
    return ['Charles de Gaulle', 'Orly', 'Beauvais'].includes(location);
  };

  // Helper function to check if location is a train station
  const isTrainStation = (location: string) => {
    return location === 'Train Station';
  };

  // Helper function to get the time label based on pickup location
  const getTimeLabel = () => {
    if (isAirport(formData.pickupLocation)) {
      return t('booking.step1.landingTime');
    }
    if (formData.tripType === 'round-trip') {
      return t('booking.step1.outboundTime');
    }
    return t('booking.step1.time');
  };

  // Clear sub-location and address when main location changes
  useEffect(() => {
    setFormData(prev => ({ 
      ...prev, 
      pickupSubLocation: '', 
      pickupAddress: '',
      pickupFlightNumber: '',
      pickupTrainNumber: '',
    }));
  }, [formData.pickupLocation]);

  useEffect(() => {
    setFormData(prev => ({ 
      ...prev, 
      dropoffSubLocation: '', 
      dropoffAddress: '',
      dropoffFlightNumber: '',
      dropoffTrainNumber: '',
    }));
  }, [formData.dropoffLocation]);

  // Filter vehicle types based on passenger count
  const getAvailableVehicleTypes = () => {
    const passengerCount = parseInt(formData.passengers);
    
    if (isNaN(passengerCount)) {
      return allVehicleTypes;
    }
    
    if (passengerCount >= 5) {
      return allVehicleTypes.filter(vehicle => vehicle.value === 'van');
    }
    
    return allVehicleTypes.filter(vehicle => vehicle.maxPassengers >= passengerCount);
  };

  useEffect(() => {
    const passengerCount = parseInt(formData.passengers);
    
    if (!isNaN(passengerCount)) {
      const availableVehicles = getAvailableVehicleTypes();
      const currentVehicleStillValid = availableVehicles.some(v => v.value === formData.vehicleType);
      
      if (!currentVehicleStillValid) {
        setFormData(prev => ({ ...prev, vehicleType: '' }));
      }
      
      if (passengerCount >= 5 && !formData.vehicleType) {
        setFormData(prev => ({ ...prev, vehicleType: 'van' }));
      }
    }
  }, [formData.passengers]);

  useEffect(() => {
    if (formData.tripType === 'one-way') {
      setFormData(prev => ({ 
        ...prev, 
        returnDate: '', 
        returnTime: '' 
      }));
    }
  }, [formData.tripType]);

  useEffect(() => {
    const fetchPriceEstimate = async () => {
      if (!formData.pickupLocation || !formData.dropoffLocation || !formData.vehicleType) {
        setPriceEstimate(null);
        return;
      }

      setIsLoadingPrice(true);
      setPriceError(null);

      try {
        const response = await fetch(`${API_BASE_URL}/estimate`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            pickup: formData.pickupLocation,
            dropoff: formData.dropoffLocation,
            vehicleType: formData.vehicleType,
            tripType: formData.tripType,
            passengers: formData.passengers
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to fetch price estimate');
        }

        const data = await response.json();
        setPriceEstimate(data);
      } catch (error) {
        console.error('Error fetching price estimate:', error);
        setPriceError('Unable to calculate price. Please try again.');
        setPriceEstimate(null);
      } finally {
        setIsLoadingPrice(false);
      }
    };

    const timeoutId = setTimeout(fetchPriceEstimate, 500);
    return () => clearTimeout(timeoutId);
  }, [formData.pickupLocation, formData.dropoffLocation, formData.vehicleType, formData.tripType, formData.passengers]);

  const handleStep1Submit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!priceEstimate) {
      alert('Please wait for price calculation to complete');
      return;
    }

    if (formData.tripType === 'round-trip' && (!formData.returnDate || !formData.returnTime)) {
      alert('Please fill in return date and time for round trip');
      return;
    }

    // Move to step 2
    setCurrentStep(2);
  };

  const handleStep2Next = () => {
    setCurrentStep(3);
  };

  const handleFinalSubmit = async () => {
    console.log('🚀 Starting handleFinalSubmit');
    console.log('💳 Payment method:', paymentDetails.paymentMethod);
    console.log('💰 Price:', priceEstimate?.price);
    
    const bookingPayload = {
      pickup_location: formData.pickupLocation,
      pickup_sub_location: formData.pickupSubLocation,
      pickup_address: formData.pickupAddress,
      pickup_flight_number: formData.pickupFlightNumber,
      pickup_train_number: formData.pickupTrainNumber,
      dropoff_location: formData.dropoffLocation,
      dropoff_sub_location: formData.dropoffSubLocation,
      dropoff_address: formData.dropoffAddress,
      dropoff_flight_number: formData.dropoffFlightNumber,
      dropoff_train_number: formData.dropoffTrainNumber,
      passengers: parseInt(formData.passengers) || 1,
      vehicle_type: formData.vehicleType,
      arrival_date: formData.date,
      arrival_time: formData.time,
      return_date: formData.tripType === 'round-trip' ? (formData.returnDate || null) : null,
      return_time: formData.tripType === 'round-trip' ? (formData.returnTime || null) : null,
      trip_type: formData.tripType,
      baby_seat: passengerDetails.babySeats,
      child_seat: passengerDetails.childSeats,
      strollers: passengerDetails.strollers,
      hand_luggages: passengerDetails.handLuggages,
      backpacks: passengerDetails.backpacks,
      suitcases: passengerDetails.suitcases,
      payment_method: paymentDetails.paymentMethod,
      name: paymentDetails.name,
      email: paymentDetails.email,
      phone: paymentDetails.phone,
      notes: paymentDetails.notes,
      price: priceEstimate?.price || 0,
      language: 'en' // Set to English
    };

    try {
      const res = await fetch(`${API_BASE_URL}/booking-and-pay`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookingPayload),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({ error: 'Server communication error' }));
        alert(data.error || 'Booking error');
        return;
      }

      const data = await res.json();

      // If there's a Stripe URL (card OR cash with deposit), redirect to Stripe
      if (data.url) {
        window.location.href = data.url;
        return;
      } else if ((paymentDetails.paymentMethod === "card" || paymentDetails.paymentMethod === "cash") && !data.url) {
        alert('Error: Payment URL missing');
        return;
      }

      // If no Stripe URL, direct confirmation
      setCurrentStep(4);
    } catch (err) {
      console.error('Error:', err);
      alert('Booking error, please try again');
    }
  };

  const handleInputChange = (field: keyof BookingFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const availableVehicleTypes = getAvailableVehicleTypes();
  const passengerCount = parseInt(formData.passengers);

  const getMinReturnDate = () => {
    return formData.date || new Date().toISOString().split('T')[0];
  };

  const passengerOptions = Array.from({ length: 18 }, (_, i) => i + 1);

  const renderLocationSelector = (
    type: 'pickup' | 'dropoff',
    location: string,
    subLocation: string,
    address: string,
    trainNumber: string,
    flightNumber: string
  ) => {
    const isPickup = type === 'pickup';
    const locationField = isPickup ? 'pickupLocation' : 'dropoffLocation';
    const subLocationField = isPickup ? 'pickupSubLocation' : 'dropoffSubLocation';
    const addressField = isPickup ? 'pickupAddress' : 'dropoffAddress';
    const flightField = isPickup ? 'pickupFlightNumber' : 'dropoffFlightNumber';
    const trainField = isPickup ? 'pickupTrainNumber' : 'dropoffTrainNumber';

    return (
      <div className="space-y-3">
        {/* Main Location Selector */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            {isPickup ? t('booking.step1.pickup') : t('booking.step1.dropoff')}
          </label>
          <div className="mt-1 relative">
            <select
              value={location}
              onChange={(e) => handleInputChange(locationField, e.target.value)}
              className="block w-full pl-3 pr-10 py-2 text-base border border-royal-gold-300 focus:outline-none focus:ring-royal-gold-500 focus:border-royal-gold-500 rounded-md bg-royal-gold-50"
              required
            >
              <option value="">{isPickup ? t('booking.step1.selectPickup') : t('booking.step1.selectDestination')}</option>
              {locations.map((loc) => (
                <option key={loc.value} value={loc.value}>{loc.label}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
        </div>

        {/* Flight Number for Airports */}
        {isAirport(location) && (
          <div>
            <label className="block text-sm font-medium text-gray-700">
              <Plane className="inline h-4 w-4 mr-1" />
              {t('booking.step1.flightNumber')}
            </label>
            <input
              type="text"
              value={flightNumber}
              onChange={(e) => handleInputChange(flightField, e.target.value)}
              placeholder={t('booking.step1.flightPlaceholder')}
              className="mt-1 block w-full pl-3 pr-3 py-2 text-base border border-royal-gold-300 focus:outline-none focus:ring-royal-gold-500 focus:border-royal-gold-500 rounded-md bg-royal-gold-50"
            />
            <p className="mt-1 text-xs text-gray-500">
              {t('booking.step1.flightHelp')}
            </p>
          </div>
        )}

        {/* Train Station Sub-selector */}
        {isTrainStation(location) && (
          <div>
            <label className="block text-sm font-medium text-gray-700">
              {t('booking.step1.selectStation')}
            </label>
            <div className="mt-1 relative">
              <select
                value={subLocation}
                onChange={(e) => handleInputChange(subLocationField, e.target.value)}
                className="block w-full pl-3 pr-10 py-2 text-base border border-royal-gold-300 focus:outline-none focus:ring-royal-gold-500 focus:border-royal-gold-500 rounded-md bg-royal-gold-50"
                required
              >
                <option value="">{t('booking.step1.chooseStation')}</option>
                {trainStations.map((station) => (
                  <option key={station.value} value={station.value}>{station.label}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
          </div>
        )}

        {/* Train Number for Train Stations */}
        {isTrainStation(location) && subLocation && (
          <div>
            <label className="block text-sm font-medium text-gray-700">
              <Train className="inline h-4 w-4 mr-1" />
              {t('booking.step1.trainNumber')}
            </label>
            <input
              type="text"
              value={trainNumber}
              onChange={(e) => handleInputChange(trainField, e.target.value)}
              placeholder={t('booking.step1.trainPlaceholder')}
              className="mt-1 block w-full pl-3 pr-3 py-2 text-base border border-royal-gold-300 focus:outline-none focus:ring-royal-gold-500 focus:border-royal-gold-500 rounded-md bg-royal-gold-50"
            />
            <p className="mt-1 text-xs text-gray-500">
              {t('booking.step1.trainHelp')}
            </p>
          </div>
        )}

        {/* Disneyland Sub-selector */}
        {location === 'Disneyland' && (
          <div>
            <label className="block text-sm font-medium text-gray-700">
              {t('booking.step1.selectDestination2')}
            </label>
            <div className="mt-1 relative">
              <select
                value={subLocation}
                onChange={(e) => handleInputChange(subLocationField, e.target.value)}
                className="block w-full pl-3 pr-10 py-2 text-base border border-royal-gold-300 focus:outline-none focus:ring-royal-gold-500 focus:border-royal-gold-500 rounded-md bg-royal-gold-50"
                required
              >
                <option value="">{t('booking.step1.chooseDestination')}</option>
                {disneylandOptions.map((option) => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
          </div>
        )}

        {/* Disney Hotel Address */}
        {location === 'Disneyland' && subLocation === 'Disney Hotels' && (
          <div>
            <label className="block text-sm font-medium text-gray-700">
              <MapPin className="inline h-4 w-4 mr-1" />
              {t('booking.step1.hotelAddress')}
            </label>
            <AddressAutocomplete
              value={address}
              onChange={(val) => handleInputChange(addressField,val)}
              placeholder={t('booking.step1.hotelAddress')}
            />
          </div>
        )}

        {/* Paris Address input field */}
        {location === 'Paris' && (
          <div>
            <label className="block text-sm font-medium text-gray-700">
              <MapPin className="inline h-4 w-4 mr-1" />
              {t('booking.step1.addressInParis')}
            </label>
            <AddressAutocomplete
              value={address}
              onChange={(val) => handleInputChange(addressField,val)}
              placeholder={t('booking.step1.addressPlaceholder')}
            />
          </div>
        )}
      </div>
    );
  };

  // Show Step 3 if currentStep is 3
  if (currentStep === 3) {
    return (
      <PaymentDetailsStep
        paymentDetails={paymentDetails}
        setPaymentDetails={setPaymentDetails}
        price={priceEstimate?.price || 0}
        onBack={() => setCurrentStep(2)}
        onSubmit={handleFinalSubmit}
        formData={formData}
        passengerDetails={passengerDetails}
      />
    );
  }

  // Show Step 2 if currentStep is 2
  if (currentStep === 2) {
    return (
      <PassengerDetailsStep
        passengerDetails={passengerDetails}
        setPassengerDetails={setPassengerDetails}
        price={priceEstimate?.price || 0}
        onBack={() => setCurrentStep(1)}
        onNext={handleStep2Next}
      />
    );
  }

  // Step 1 - Original form
  return (
    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden border border-royal-gold-200">
      <div className="bg-royal-gold-50 p-6 text-center">
        <h2 className="text-xl font-semibold text-royal-brown-800">
          {t('booking.quickQuote')}
        </h2>
        <p className="text-royal-brown-600 mt-2">
          {t('booking.subtitle')}
        </p>
      </div>

      <form onSubmit={handleStep1Submit} className="p-6 space-y-6">
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-royal-brown-900">
            {t('booking.step1.title')}
          </h3>

          <div className="space-y-6">
            {/* Pickup Location */}
            {renderLocationSelector('pickup', formData.pickupLocation, formData.pickupSubLocation, formData.pickupAddress, formData.pickupTrainNumber, formData.pickupFlightNumber)}

            {/* Dropoff Location */}
            {renderLocationSelector('dropoff', formData.dropoffLocation, formData.dropoffSubLocation, formData.dropoffAddress, formData.dropoffTrainNumber, formData.dropoffFlightNumber)}

            {/* Passengers */}
            <div>
              <label className="block text-sm font-medium text-royal-brown-700">
                {t('booking.step1.passengers')}
              </label>
              <div className="mt-1 relative">
                <select
                  value={formData.passengers}
                  onChange={(e) => handleInputChange('passengers', e.target.value)}
                  className="block w-full pl-3 pr-10 py-2 text-base border border-royal-gold-300 focus:outline-none focus:ring-royal-gold-500 focus:border-royal-gold-500 rounded-md bg-royal-gold-50"
                  required
                >
                  <option value="">{t('booking.step1.notSelected')}</option>
                  {passengerOptions.map(num => (
                    <option key={num} value={num}>{num}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
            </div>

            {/* Vehicle */}
            <div>
              <label className="block text-sm font-medium text-royal-brown-700">
                {t('booking.step1.vehicleType')}
              </label>
              <div className="mt-1 relative">
                <select
                  value={formData.vehicleType}
                  onChange={(e) => handleInputChange('vehicleType', e.target.value)}
                  className="block w-full pl-3 pr-10 py-2 text-base border border-royal-gold-300 focus:outline-none focus:ring-royal-gold-500 focus:border-royal-gold-500 rounded-md bg-royal-gold-50"
                  required
                >
                  <option value="">{t('booking.step1.chooseVehicle')}</option>
                  {availableVehicleTypes.map(v => (
                    <option key={v.value} value={v.value}>{v.label}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
              {passengerCount >= 5 && passengerCount <= 8 && (
                <p className="mt-2 text-sm text-royal-gold-600 font-medium">
                  ℹ️ {t('booking.step1.vanInfo')}
                </p>
              )}
              {passengerCount > 8 && (
                <p className="mt-2 text-sm text-royal-gold-600 font-medium">
                  🚐 {t('booking.step1.multipleVans')}
                </p>
              )}
            </div>

            {/* Trip Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                {t('booking.step1.tripType')}
              </label>
              <div className="mt-1 relative">
                <select
                  value={formData.tripType}
                  onChange={(e) => handleInputChange('tripType', e.target.value as 'one-way' | 'round-trip')}
                  className="block w-full pl-3 pr-10 py-2 text-base border border-royal-gold-300 focus:outline-none focus:ring-royal-gold-500 focus:border-royal-gold-500 rounded-md bg-royal-gold-50"
                >
                  <option value="one-way">{t('booking.step1.oneWay')}</option>
                  <option value="round-trip">{t('booking.step1.roundTrip')}</option>
                </select>
                <ChevronDown className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
            </div>

            {/* Outbound Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                {formData.tripType === 'round-trip' ? t('booking.step1.outboundDate') : t('booking.step1.date')}
              </label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) => handleInputChange('date', e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                className="mt-1 block w-full pl-3 pr-3 py-2 text-base border border-royal-gold-300 focus:outline-none focus:ring-royal-gold-500 focus:border-royal-gold-500 rounded-md bg-royal-gold-50"
                required
              />
            </div>

            {/* Outbound Time */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                {getTimeLabel()}
              </label>
              <div className="mt-1 relative">
                <input
                  type="time"
                  value={formData.time}
                  onChange={(e) => handleInputChange('time', e.target.value)}
                  className="block w-full pl-3 pr-10 py-2 text-base border border-royal-gold-300 focus:outline-none focus:ring-royal-gold-500 focus:border-royal-gold-500 rounded-md bg-royal-gold-50"
                  required
                />
                <Clock className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
            </div>

            {/* Return Date - Only show for round trip */}
            {formData.tripType === 'round-trip' && (
              <div className="bg-royal-gold-50 p-4 rounded-lg border border-royal-gold-200">
                <h4 className="text-md font-medium text-royal-brown-900 mb-3">
                  {t('booking.step1.returnJourney')}
                </h4>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      {t('booking.step1.returnDate')}
                    </label>
                    <input
                      type="date"
                      value={formData.returnDate}
                      onChange={(e) => handleInputChange('returnDate', e.target.value)}
                      min={getMinReturnDate()}
                      className="mt-1 block w-full pl-3 pr-3 py-2 text-base border border-royal-gold-300 focus:outline-none focus:ring-royal-gold-500 focus:border-royal-gold-500 rounded-md bg-white"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      {t('booking.step1.returnTime')}
                    </label>
                    <div className="mt-1 relative">
                      <input
                        type="time"
                        value={formData.returnTime}
                        onChange={(e) => handleInputChange('returnTime', e.target.value)}
                        className="block w-full pl-3 pr-10 py-2 text-base border border-royal-gold-300 focus:outline-none focus:ring-royal-gold-500 focus:border-royal-gold-500 rounded-md bg-white"
                        required
                      />
                      <Clock className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-gray-200">
          <div className="text-lg font-semibold">
            {t('booking.step1.price')}
            {isLoadingPrice ? (
              <span className="text-royal-gold-600 ml-2">
                <Loader2 className="inline h-4 w-4 animate-spin mr-1" />
                {t('booking.step1.calculating')}
              </span>
            ) : priceError ? (
              <span className="text-red-600 ml-2">{priceError}</span>
            ) : priceEstimate ? (
              <span className="text-royal-gold-700 ml-2">
                €{priceEstimate.price}
                {formData.tripType === 'round-trip' && (
                  <span className="text-sm text-royal-brown-600 ml-1">({t('booking.step1.roundTrip')})</span>
                )}
              </span>
            ) : (
              <span className="text-royal-brown-600 ml-2">€0</span>
            )}
          </div>
          <button
            type="submit"
            disabled={!priceEstimate || isLoadingPrice}
            className="bg-royal-gold-500 text-royal-brown-950 px-6 py-2 rounded-md hover:bg-royal-gold-600 disabled:bg-royal-brown-300 disabled:cursor-not-allowed transition-colors font-medium"
          >
            {t('booking.step1.next')}
          </button>
        </div>
      </form>
    </div>
  );
}