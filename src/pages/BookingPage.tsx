import React from 'react';
import { Helmet } from 'react-helmet';
import BookingForm from '../components/booking/BookingForm';
import { useTranslation } from 'react-i18next'
import PageSEO from '../components/seo/PageSEO';

export default function BookingPage() {
  
  <Helmet>
  <PageSEO pageKey="booking" />  
  <link rel="canonical" href="https://transfertroyalparis.com/" />
  </Helmet>

  const { t } = useTranslation();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
        {t('nav.book')}
      </h1>
      <BookingForm />
    </div>
  );
}