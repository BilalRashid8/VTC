import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import PageSEO from '../components/seo/PageSEO';

export default function TrainStationTransfersPage() {
  <Helmet>
   <PageSEO pageKey="trainStationTransfers" />
   <link rel="canonical" href="https://transfertroyalparis.com/" />
</Helmet>

  const { t } = useTranslation();

  const stations = [
    {
      id: 'gare-du-nord',
      name: 'Gare du Nord',
      image: '/destination/gare/Gare_Nord.webp',
      description: t('transfers.trains.gareNord.description'),
      connections: t('transfers.trains.gareNord.connections'),
      features: t('transfers.trains.gareNord.features')
    },
    {
      id: 'gare-de-lyon',
      name: 'Gare de Lyon',
      image: '/destination/gare/Gare_de_Lyon.webp',
      description: t('transfers.trains.gareLyon.description'),
      connections: t('transfers.trains.gareLyon.connections'),
      features: t('transfers.trains.gareLyon.features')
    },
    {
      id: 'montparnasse',
      name: 'Montparnasse',
      image: '/destination/gare/Gare_Nord.webp',
      description: t('transfers.trains.montparnasse.description'),
      connections: t('transfers.trains.montparnasse.connections'),
      features: t('transfers.trains.montparnasse.features')
    },
    {
      id: 'austerlitz',
      name: 'Austerlitz',
      image: '/destination/gare/Gare_dAusterlitz.webp',
      description: t('transfers.trains.austerlitz.description'),
      connections: t('transfers.trains.austerlitz.connections'),
      features: t('transfers.trains.austerlitz.features')
    },
    {
      id: 'saint-lazare',
      name: 'Saint Lazare',
      image: '/destination/gare/Gare_de_Paris-Saint-Lazare.webp',
      description: t('transfers.trains.saintLazare.description'),
      connections: t('transfers.trains.saintLazare.connections'),
      features: t('transfers.trains.saintLazare.features')
    },
    {
      id: 'bercy',
      name: 'Bercy',
      image: '/destination/gare//Gare_de_Paris bercy.webp',
      description: t('transfers.trains.bercy.description'),
      connections: t('transfers.trains.bercy.connections'),
      features: t('transfers.trains.bercy.features')
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-4 text-center">{t('transfers.trains.title')}</h1>
      <p className="text-xl text-gray-600 mb-12 text-center">{t('transfers.trains.subtitle')}</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {stations.map((station) => (
          <div key={station.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="h-48 overflow-hidden">
              <img
                src={station.image}
                loading="lazy"
                alt={station.name}
                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-2">{station.name}</h2>
              <p className="text-gray-600 mb-4">{station.description}</p>
              <div className="space-y-2 mb-6">
                <div className="flex items-center text-gray-700">
                  <span className="font-medium">{t('transfers.trains.connections')}</span>
                  <span className="ml-2">{station.connections}</span>
                </div>
                <div className="flex items-center text-gray-700">
                  <span className="font-medium">{t('transfers.trains.features')}</span>
                  <span className="ml-2">{station.features}</span>
                </div>
              </div>
              <Link
                to="/book"
                className="block w-full bg-royal-gold-500 text-royal-brown-950 text-center py-2 px-4 rounded-md hover:bg-royal-gold-600 transition-colors duration-300 font-medium"
              >
                {t('transfers.trains.bookTransfer')}
              </Link>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 bg-gray-50 rounded-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">{t('transfers.trains.whyChoose.title')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-4">
            <h3 className="font-semibold text-lg mb-2">{t('transfers.trains.whyChoose.punctual.title')}</h3>
            <p className="text-gray-600">{t('transfers.trains.whyChoose.punctual.description')}</p>
          </div>
          <div className="p-4">
            <h3 className="font-semibold text-lg mb-2">{t('transfers.trains.whyChoose.luggage.title')}</h3>
            <p className="text-gray-600">{t('transfers.trains.whyChoose.luggage.description')}</p>
          </div>
          <div className="p-4">
            <h3 className="font-semibold text-lg mb-2">{t('transfers.trains.whyChoose.meetingPoint.title')}</h3>
            <p className="text-gray-600">{t('transfers.trains.whyChoose.meetingPoint.description')}</p>
          </div>
          <div className="p-4">
            <h3 className="font-semibold text-lg mb-2">{t('transfers.trains.whyChoose.comfortable.title')}</h3>
            <p className="text-gray-600">{t('transfers.trains.whyChoose.comfortable.description')}</p>
          </div>
        </div>
      </div>
    </div>
  );
}