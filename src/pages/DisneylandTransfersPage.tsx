import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { Clock, Car, Users, CreditCard, Ticket, Calendar, Star, Sparkles } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import PageSEO from '../components/seo/PageSEO';

export default function DisneylandTransfersPage() {

      <Helmet>
        <PageSEO pageKey="disneylandTransfers" />
        <link rel="canonical" href="https://transfertroyalparis.com/" />
      </Helmet>

  const { t } = useTranslation();

  const transferOption = {
    title: t('transfers.disneyland.transferService.privateTransfer.title'),
    image: '/destination/disneyland/Disneyland.webp',
    description: t('transfers.disneyland.transferService.privateTransfer.description'),
    features: t('transfers.disneyland.transferService.privateTransfer.features', { returnObjects: true }),
    price: t('transfers.disneyland.transferService.privateTransfer.price')
  };

  const ticketOptions = [
    {
      icon: Ticket,
      title: t('transfers.disneyland.tickets.oneDayTickets.title'),
      description: t('transfers.disneyland.tickets.oneDayTickets.description'),
      price: t('transfers.disneyland.tickets.oneDayTickets.price')
    },
    {
      icon: Star,
      title: t('transfers.disneyland.tickets.parkHopper.title'),
      description: t('transfers.disneyland.tickets.parkHopper.description'),
      price: t('transfers.disneyland.tickets.parkHopper.price')
    },
    {
      icon: Calendar,
      title: t('transfers.disneyland.tickets.multiDay.title'),
      description: t('transfers.disneyland.tickets.multiDay.description'),
      price: t('transfers.disneyland.tickets.multiDay.price')
    },
    {
      icon: Sparkles,
      title: t('transfers.disneyland.tickets.vip.title'),
      description: t('transfers.disneyland.tickets.vip.description'),
      price: t('transfers.disneyland.tickets.vip.price')
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">{t('transfers.disneyland.title')}</h1>
        <p className="text-xl text-gray-600">{t('transfers.disneyland.subtitle')}</p>
      </div>

      {/* Main Info Section */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-12">
        <div className="h-[400px] relative">
          <img
            src="/destination/disneyland/Disneyland.webp"
            alt="Transfert VTC Disneyland Paris - Service premium depuis Paris et aéroports"
            className="w-full h-full object-cover"
            width="1200"
            height="400"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
            <h2 className="text-3xl font-bold mb-4">{t('transfers.disneyland.mainInfo.title')}</h2>
            <p className="text-lg">
              {t('transfers.disneyland.mainInfo.description')}
            </p>
          </div>
        </div>
        
        <div className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">{t('transfers.disneyland.fromParis.title')}</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• {t('transfers.disneyland.fromParis.distance')}</li>
                <li>• {t('transfers.disneyland.fromParis.duration')}</li>
                <li>• {t('transfers.disneyland.fromParis.available')}</li>
                <li>• {t('transfers.disneyland.fromParis.service')}</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">{t('transfers.disneyland.fromAirports.title')}</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• {t('transfers.disneyland.fromAirports.cdg')}</li>
                <li>• {t('transfers.disneyland.fromAirports.orly')}</li>
                <li>• {t('transfers.disneyland.fromAirports.beauvais')}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Transfer Option */}
      <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">{t('transfers.disneyland.transferService.title')}</h2>
      <div className="max-w-2xl mx-auto mb-12">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="h-48 overflow-hidden">
            <img
              src="/destination/disneyland/Disneyland.webp"
              loading="lazy"
              alt="Transfert privé Disneyland Paris en VTC - Véhicule premium"
              className="w-full h-full object-cover"
              width="600"
              height="300"
            />
          </div>
          <div className="p-6">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-bold">{transferOption.title}</h3>
              <span className="text-blue-600 font-semibold">{transferOption.price}</span>
            </div>
            <p className="text-gray-600 mb-4">{transferOption.description}</p>
            <ul className="space-y-2 mb-6">
              {transferOption.features.map((feature) => (
                <li key={feature} className="text-gray-600">• {feature}</li>
              ))}
            </ul>
            <Link
              to="/book"
              className="block w-full bg-royal-gold-500 text-royal-brown-950 text-center py-2 px-4 rounded-md hover:bg-royal-gold-600 transition-colors duration-300 font-medium"
            >
              {t('nav.book')}
            </Link>
          </div>
        </div>
      </div>

      {/* Disneyland Paris Tickets Section */}
      <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">{t('transfers.disneyland.tickets.title')}</h2>
        <p className="text-gray-600 text-center mb-8 max-w-3xl mx-auto">
          {t('transfers.disneyland.tickets.subtitle')}
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {ticketOptions.map((option) => (
            <div key={option.title} className="bg-gray-50 rounded-lg p-6 text-center">
              <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 text-blue-600 mb-4">
                <option.icon className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{option.title}</h3>
              <p className="text-gray-600 mb-4">{option.description}</p>
              <p className="text-blue-600 font-semibold">{option.price}</p>
            </div>
          ))}
        </div>

        <div className="bg-blue-50 rounded-lg p-6 max-w-3xl mx-auto">
          <h3 className="text-xl font-semibold mb-4">{t('transfers.disneyland.tickets.howToBook.title')}</h3>
          <ol className="space-y-4 text-gray-600">
            <li className="flex gap-4">
              <span className="font-bold">1.</span>
              <span>{t('transfers.disneyland.tickets.howToBook.step1')}</span>
            </li>
            <li className="flex gap-4">
              <span className="font-bold">2.</span>
              <span>{t('transfers.disneyland.tickets.howToBook.step2')}</span>
            </li>
            <li className="flex gap-4">
              <span className="font-bold">3.</span>
              <span>{t('transfers.disneyland.tickets.howToBook.step3')}</span>
            </li>
            <li className="flex gap-4">
              <span className="font-bold">4.</span>
              <span>{t('transfers.disneyland.tickets.howToBook.step4')}</span>
            </li>
            <li className="flex gap-4">
              <span className="font-bold">5.</span>
              <span>{t('transfers.disneyland.tickets.howToBook.step5')}</span>
            </li>
          </ol>
          
          <div className="mt-6 text-center">
            <a
              href="https://www.disneylandparis.com/en-gb/tickets/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-royal-gold-500 text-royal-brown-950 px-6 py-2 rounded-md hover:bg-royal-gold-600 transition-colors duration-300 font-medium"
            >
              {t('transfers.disneyland.tickets.bookTickets')}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}