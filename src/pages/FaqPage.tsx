import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { ChevronDown } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import PageSEO from '../components/seo/PageSEO';

interface FaqItem {
  question: string;
  answer: string;
}

export default function FaqPage() {
  <Helmet>
  <PageSEO pageKey="faq" />
  <link rel="canonical" href="https://transfertroyalparis.com/" />
  </Helmet>
  
  const { t } = useTranslation();
  const [openItem, setOpenItem] = useState<number | null>(null);

  const faqItems: FaqItem[] = [
    {
      question: t('faq.questions.booking.question'),
      answer: t('faq.questions.booking.answer')
    },
    {
      question: t('faq.questions.childSeats.question'),
      answer: t('faq.questions.childSeats.answer')
    },
    {
      question: t('faq.questions.flightDelay.question'),
      answer: t('faq.questions.flightDelay.answer')
    },
    {
      question: t('faq.questions.cancellation.question'),
      answer: t('faq.questions.cancellation.answer')
    },
    {
      question: t('faq.questions.payment.question'),
      answer: t('faq.questions.payment.answer')
    },
    {
      question: t('faq.questions.luggage.question'),
      answer: t('faq.questions.luggage.answer')
    }
  ];

  const toggleItem = (index: number) => {
    setOpenItem(openItem === index ? null : index);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-900">
          {t('faq.title')}
        </h1>
        <p className="mt-4 text-lg text-gray-600">
          {t('faq.subtitle')}
        </p>
      </div>

      <div className="space-y-4">
        {faqItems.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
          >
            <button
              className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 focus:outline-none"
              onClick={() => toggleItem(index)}
            >
              <span className="text-lg font-medium text-gray-900">
                {item.question}
              </span>
              <ChevronDown
                className={`h-5 w-5 text-gray-500 transform transition-transform duration-200 ${
                  openItem === index ? 'rotate-180' : ''
                }`}
              />
            </button>
            {openItem === index && (
              <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                <p className="text-gray-600">
                  {item.answer}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}