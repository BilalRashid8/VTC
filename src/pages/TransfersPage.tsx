import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { Clock, MapPin, Users, Star, Plane, Shield, CreditCard } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import PageSEO from '../components/seo/PageSEO';

export default function TransfersPage() {

<Helmet>
<PageSEO pageKey="airport" />
<link rel="canonical" href="https://transfertroyalparis.com/" />
      </Helmet>

  const { t } = useTranslation();
  


  const airports = [
    {
      id: 'cdg',
      name: 'Charles de Gaulle Airport (CDG)',
      image: '/destination/aeroport/cdg.webp',
      description: t('transfers.airports.cdg.description'),
      distance: t('transfers.airports.cdg.distance'),
      duration: t('transfers.airports.cdg.duration'),
      terminals: t('transfers.airports.cdg.terminals'),
      airlines: t('transfers.airports.cdg.airlines'),
      price: 'from €65'
    },
    {
      id: 'orly',
      name: 'Orly Airport (ORY)',
      image: '/destination/aeroport/orly.webp',
      description: t('transfers.airports.orly.description'),
      distance: t('transfers.airports.orly.distance'),
      duration: t('transfers.airports.orly.duration'),
      terminals: t('transfers.airports.orly.terminals'),
      airlines: t('transfers.airports.orly.airlines'),
      price: 'from €55'
    },
    {
      id: 'beauvais',
      name: 'Beauvais Airport (BVA)',
      image: '/destination/aeroport/aeroport-beauvais.webp',
      description: t('transfers.airports.beauvais.description'),
      distance: t('transfers.airports.beauvais.distance'),
      duration: t('transfers.airports.beauvais.duration'),
      terminals: t('transfers.airports.beauvais.terminals'),
      airlines: t('transfers.airports.beauvais.airlines'),
      price: 'from €95'
    }
  ];

  const features = [
    {
      icon: Clock,
      title: '24/7 Service',
      description: 'Available day and night for your comfort'
    },
    {
      icon: Shield,
      title: 'Flight Tracking',
      description: 'We monitor your flight and adjust pickup time accordingly'
    },
    {
      icon: Users,
      title: 'Meet & Greet',
      description: 'Personal assistance at the airport terminal'
    },
    {
      icon: CreditCard,
      title: 'Fixed Prices',
      description: 'No hidden fees or dynamic pricing'
    }
  ];

  const services = [
    {
      title: 'Airport to Paris Center',
      description: 'Direct transfer from any Paris airport to your hotel or address in central Paris',
      features: ['Door-to-door service', 'Luggage assistance', 'Flight monitoring', 'Professional drivers']
    },
    {
      title: 'Paris Center to Airport',
      description: 'Reliable transfer from your location in Paris to any airport with time guarantee',
      features: ['Punctual pickup', 'Traffic monitoring', 'Alternative routes', 'SMS confirmations']
    },
    {
      title: 'Airport to Airport',
      description: 'Transfer between different Paris airports for connecting flights',
      features: ['Fast connections', 'Tight schedule management', 'Real-time updates', 'Express service']
    }
  ];

  return (
    
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          {t('transfers.airports.title')}
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          {t('transfers.airports.subtitle')}
        </p>
        <div className="bg-royal-gold-50 rounded-lg p-6 max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div>
              <Plane className="h-8 w-8 text-royal-gold-600 mx-auto mb-2" />
              <h3 className="font-semibold text-royal-brown-900">3 Airports</h3>
              <p className="text-royal-brown-600">CDG, Orly, Beauvais</p>
            </div>
            <div>
              <Clock className="h-8 w-8 text-royal-gold-600 mx-auto mb-2" />
              <h3 className="font-semibold text-royal-brown-900">24/7 Service</h3>
              <p className="text-royal-brown-600">Available anytime</p>
            </div>
            <div>
              <Users className="h-8 w-8 text-royal-gold-600 mx-auto mb-2" />
              <h3 className="font-semibold text-royal-brown-900">All Group Sizes</h3>
              <p className="text-royal-brown-600">1-18 passengers</p>
            </div>
          </div>
        </div>
      </div>

      {/* Airport Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        {airports.map((airport) => (
          <div key={airport.id} className="bg-white rounded-lg shadow-lg overflow-hidden border border-royal-gold-200">
            <div className="h-48 overflow-hidden">
              <img
                src={airport.image}
                loading="lazy"
                alt={`Transfert VTC ${airport.name} - Service premium Transfert Royal Paris`}
                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                width="400"
                height="300"
              />
            </div>
            <div className="p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-2">
                {airport.name}
              </h2>
              <p className="text-gray-600 mb-4">
                {airport.description}
              </p>
              
              <div className="space-y-2 mb-4">
                <div className="flex items-center text-gray-700">
                  <MapPin className="h-4 w-4 mr-2 text-royal-gold-500" />
                  <span className="text-sm">
                    <strong>{t('transfers.airports.distance')}:</strong> {airport.distance}
                  </span>
                </div>
                <div className="flex items-center text-gray-700">
                  <Clock className="h-4 w-4 mr-2 text-royal-gold-500" />
                  <span className="text-sm">
                    <strong>{t('transfers.airports.duration')}:</strong> {airport.duration}
                  </span>
                </div>
                <div className="flex items-center text-gray-700">
                  <Plane className="h-4 w-4 mr-2 text-royal-gold-500" />
                  <span className="text-sm">
                    <strong>{t('transfers.airports.terminals')}:</strong> {airport.terminals}
                  </span>
                </div>
              </div>

              <div className="bg-royal-gold-50 rounded-lg p-3 mb-4">
                <p className="text-sm text-royal-brown-700">
                  <strong>{t('transfers.airports.airlines')}:</strong> {airport.airlines}
                </p>
              </div>

              <div className="flex items-center justify-between mb-4">
                <span className="text-lg font-bold text-royal-gold-600">
                  {airport.price}
                </span>
                <span className="text-sm text-gray-500">{t('transfers.airports.perTransfer')}</span>
              </div>

              <Link
                to="/book"
                className="block w-full bg-royal-gold-500 text-royal-brown-950 text-center py-2 px-4 rounded-md hover:bg-royal-gold-600 transition-colors duration-300 font-medium"
              >
                {t('transfers.airports.bookTransfer')}
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Services Section */}
      <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Our Airport Transfer Services
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div key={index} className="text-center">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                {service.title}
              </h3>
              <p className="text-gray-600 mb-6">
                {service.description}
              </p>
              <ul className="space-y-2">
                {service.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center text-gray-700">
                    <Star className="h-4 w-4 text-royal-gold-500 mr-2" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-gray-50 rounded-lg p-8 mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
          Why Choose Our Airport Transfer Service?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div key={index} className="text-center p-4">
              <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-royal-gold-100 text-royal-gold-600 mb-4">
                <feature.icon className="h-6 w-6" />
              </div>
              <h3 className="font-semibold text-lg mb-2 text-gray-900">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-sm">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Booking CTA */}
      <div className="bg-royal-gold-500 rounded-lg p-8 text-center">
        <h2 className="text-2xl font-bold text-royal-brown-950 mb-4">
          Ready to Book Your Airport Transfer?
        </h2>
        <p className="text-royal-brown-800 mb-6">
          Get instant pricing and book your reliable transfer in just a few clicks
        </p>
        <Link
          to="/book"
          className="inline-block bg-royal-brown-950 text-royal-gold-100 px-8 py-3 rounded-md hover:bg-royal-brown-800 transition-colors duration-300 font-medium text-lg"
        >
          Book Now
        </Link>
      </div>

      {/* Additional Info */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Flight Delays & Cancellations
          </h3>
          <p className="text-gray-600 mb-4">
            Don't worry about flight delays! We monitor all flights in real-time and adjust pickup times automatically.
          </p>
          <ul className="space-y-2 text-sm text-gray-600">
            <li>• Free waiting time: 60 minutes for international flights</li>
            <li>• Free waiting time: 30 minutes for domestic flights</li>
            <li>• No extra charges for flight delays</li>
            <li>• SMS notifications for any changes</li>
          </ul>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Meeting Point Instructions
          </h3>
          <p className="text-gray-600 mb-4">
            Our professional drivers will meet you at the designated meeting point with a name sign.
          </p>
          <ul className="space-y-2 text-sm text-gray-600">
            <li>• <strong>CDG:</strong> Arrivals hall, near exit doors</li>
            <li>• <strong>Orly:</strong> Arrivals level, meeting point area</li>
            <li>• <strong>Beauvais:</strong> Main terminal exit</li>
            <li>• Driver contact details sent 24h before</li>
          </ul>
        </div>
      </div>
    </div>
  );
}