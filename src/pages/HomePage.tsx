import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { Clock, Shield, Star, ThumbsUp, Car, Users } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import PageSEO from '../components/seo/PageSEO';
import TopRoutes from "../components/TopRoutes";



const features = [
  {
    icon: Clock,
    title: '24/7 Service',
    description: 'Available day and night for your comfort',
  },
  {
    icon: Shield,
    title: 'Safe Travel',
    description: 'Professional drivers and well-maintained vehicles',
  },
  {
    icon: Star,
    title: 'Premium Service',
    description: 'Luxury vehicles and exceptional customer service',
  },
  {
    icon: ThumbsUp,
    title: 'Fixed Prices',
    description: 'No hidden fees or surprises',
  },
];

const vehicles = [
  {
    icon: Car,
    name: 'Berline',
    description:
      'Perfect for 1-3 passengers with standard luggage. Elegant and comfortable berlines for a smooth journey.',
    capacity: '1-3 passengers',
    features: ['professionalDriver', 'airConditioning', 'leatherSeats', 'flightTracking'],
  },
  {
    icon: Users,
    name: 'Van',
    description:
      'Ideal for groups of 4-8 passengers or those with extra luggage. Spacious and comfortable for family trips.',
    capacity: '4-8 passengers',
    features: ['largeLuggageSpace', 'airConditioning', 'comfortableSeating', 'perfectForFamilies'],
  },
];

export default function HomePage() {
  const { t } = useTranslation();

  // Images du hero
  const images = [
    { src: '/Img-hero.jpg', alt: 'Mercedes van in front of Eiffel Tower at night' },
    { src: '/Img-hero2.jpg', alt: 'Luxury van interior' },
    { src: '/Img-hero3.jpg', alt: 'Airport transfer with van' },
  ];

  // Réglages du slider
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 1000,
    autoplay: true,
    autoplaySpeed: 4000,
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true,
    arrows: false,
    pauseOnHover: false,
    adaptiveHeight: false,
  } as const;
const slidesCount = 3;              // nombre d’images
const [current, setCurrent] = useState(0);

useEffect(() => {
  const id = setInterval(() => {
    setCurrent((c) => (c + 1) % slidesCount);
  }, 4000); // 4s entre chaque slide
  return () => clearInterval(id);
}, []);

  return (
    <>
      <Helmet>
        <PageSEO pageKey="home" />
        <link rel="canonical" href="https://transfertroyalparis.com/" />
      </Helmet>

{/* Hero Section – Carousel sans lib */}
<section className="bg-white py-12">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="relative w-full h-[500px] border border-white rounded-xl shadow-lg overflow-hidden">

      {/* Slides */}

        <div className="absolute inset-0" aria-live="polite" aria-roledescription="carousel">
          {[
            { src: '/hero/Img-hero.jpg',  alt: 'Chauffeur VTC premium à Paris' },
            { src: '/hero/Img-hero2.jpg', alt: 'Transfert aéroport CDG en berline' },
            { src: '/hero/Img-hero3.jpg', alt: 'Service VTC vers Disneyland' },
          ].map((img, i) => (
            <picture
              key={i}
              className={`absolute inset-0 transition-opacity duration-1000
                ${i === current ? 'opacity-100' : 'opacity-0'}`}
            >
              {/* si tu as des versions AVIF/WEBP, sinon garde juste <img> */}
              {/* <source srcSet={img.src.replace('.jpg','.avif')} type="image/avif" /> */}
              {/* <source srcSet={img.src.replace('.jpg','.webp')} type="image/webp" /> */}
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-full object-cover object-center"
                loading={i === 0 ? 'eager' : 'lazy'}
                fetchPriority={i === 0 ? 'high' : undefined}
                decoding="async"
                sizes="(max-width: 1024px) 100vw, 1200px"
              />
            </picture>
          ))}
        </div>


      {/* Overlay sombre */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Contenu centré */}

        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
            {t('home.hero.title')}
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-white/90 max-w-3xl">
            {t('home.hero.subtitle')}
          </p>

          {/* CTA primary + secondary */}
          <div className="mt-8 flex flex-col sm:flex-row items-center gap-3">
            <Link
              to="/book"
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold rounded-full
                        bg-white text-royal-brown-950 shadow-md hover:shadow-lg hover:bg-yellow-100
                        transition-transform duration-200 hover:scale-[1.02]"
            >
              {t('nav.book')}
            </Link>

            <a
              href="#prices"
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold rounded-full
                        border border-white/80 text-white backdrop-blur
                        hover:bg-white/10 transition"
            >
              {t('home.hero.ctaPrices') /* ajoute cette clé i18n, ex: "Voir les tarifs" */}
            </a>
          </div>

          {/* 3 preuves de réassurance */}
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-3xl text-yellow-300">
            <div className="flex items-center justify-center gap-2">
              <span className="text-yellow-300"></span>
              <span className="text-sm sm:text-base">{t('home.hero.proofReviews') /* "Avis Google vérifiés" */}</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <span></span>
              <span className="text-sm sm:text-base">{t('home.hero.proofClients') /* "500+ clients entreprises" */}</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <span></span>
              <span className="text-sm sm:text-base">{t('home.hero.proofPunctual') /* "Ponctualité garantie" */}</span>
            </div>
          </div>
        </div>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {[0,1,2].map((i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-2 w-2 rounded-full transition
              ${i === current ? 'bg-white w-6' : 'bg-white/60 hover:bg-white/80'}`}
            aria-label={`Go to slide ${i + 1}`}
            aria-pressed={i === current}
          />
        ))}
      </div>
    </div>
  </div>
</section>
<TopRoutes />


      {/* Vehicle Types Section */}
      <div className="py-24 bg-royal-gold-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-royal-brown-900 sm:text-4xl">
              {t('home.vehicles.title')}
            </h2>
            <p className="mt-4 text-xl text-royal-brown-600">{t('home.vehicles.subtitle')}</p>
          </div>

          <div className="mt-20">
            <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 justify-center items-center max-w-6xl mx-auto">
              {vehicles.map((vehicle) => (
                <div
                  key={vehicle.name}
                  className="bg-white rounded-xl shadow-lg overflow-hidden border border-royal-gold-200 w-full max-w-md"
                >
                  <div className="p-8">
                    <div className="flex items-center justify-center h-16 w-16 rounded-full bg-royal-gold-100 text-royal-gold-600 mx-auto">
                      <vehicle.icon className="h-8 w-8" />
                    </div>
                    <h3 className="mt-6 text-2xl font-bold text-center text-royal-brown-900">
                      {t(`home.vehicles.${vehicle.name.toLowerCase()}.name`)}
                    </h3>
                    <p className="mt-2 text-royal-brown-600 text-center">
                      {t(`home.vehicles.${vehicle.name.toLowerCase()}.description`)}
                    </p>
                    <div className="mt-8">
                      <div className="flex items-center justify-center">
                        <vehicle.icon className="h-5 w-5 text-royal-gold-500" />
                        <span className="ml-2 text-royal-brown-600">
                          {t(`home.vehicles.${vehicle.name.toLowerCase()}.capacity`)}
                        </span>
                      </div>
                      <ul className="mt-6 space-y-3">
                        {vehicle.features.map((feature, index) => (
                          <li key={index} className="flex items-center text-royal-brown-600">
                            <div className="flex-shrink-0">
                              <Star className="h-5 w-5 text-royal-gold-500" />
                            </div>
                            <span className="ml-3">
                              {t(`home.vehicles.features.${feature}`)}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className="p-4 bg-royal-gold-50 border-t border-royal-gold-100">
                    <Link
                      to="/book"
                      className="block w-full text-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-royal-brown-950 bg-royal-gold-400 hover:bg-royal-gold-500 transition-colors duration-300"
                    >
                      {t('nav.book')}
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24 bg-royal-brown-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-royal-brown-900 sm:text-4xl">
              {t('home.features.title')}
            </h2>
            <p className="mt-4 text-xl text-royal-brown-600">
              {t('home.features.subtitle')}
            </p>
          </div>

          <div className="mt-20">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {features.map((feature, index) => (
                <div key={index} className="text-center">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-royal-gold-500 text-royal-brown-950 mx-auto">
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-6 text-lg font-medium text-royal-brown-900">
                    {t(
                      `home.features.${feature.title
                        .toLowerCase()
                        .replace(/[^a-z0-9]/g, '')}.title`,
                    )}
                  </h3>
                  <p className="mt-2 text-base text-royal-brown-600">
                    {t(
                      `home.features.${feature.title
                        .toLowerCase()
                        .replace(/[^a-z0-9]/g, '')}.description`,
                    )}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
