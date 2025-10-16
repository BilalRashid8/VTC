import React from 'react';
import { Helmet } from 'react-helmet';
import { useState } from 'react';
import { Mail, Phone, Instagram, MapPin, Clock, MessageCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import PageSEO from '../components/seo/PageSEO';


export default function ContactPage() {

  <Helmet>
	<PageSEO pageKey="contact" />
  <link rel="canonical" href="https://transfertroyalparis.com/" />
  </Helmet>

  const { t } = useTranslation();
  
  const API_BASE_URL = import.meta.env.VITE_API_URL ? `${import.meta.env.VITE_API_URL}/api` : 'https://vtc-backend-ccuj.onrender.com/api';

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch(`${API_BASE_URL}/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      console.error('Error sending contact form:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">{t('contact.title')}</h1>
        <p className="text-xl text-gray-600">
          {t('contact.subtitle')}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Contact Information */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">{t('contact.getInTouch')}</h2>
          
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0">
                <Phone className="h-6 w-6 text-royal-gold-500" />
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900">{t('contact.phone')}</h3>
                <a 
                  href="tel:+33763725036" 
                  className="text-royal-gold-600 hover:text-royal-gold-700 transition-colors"
                >
                  07 63 72 50 36
                </a>
                <p className="text-sm text-gray-500">{t('contact.phoneAvailable')}</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0">
                <Mail className="h-6 w-6 text-royal-gold-500" />
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900">{t('contact.email')}</h3>
                <a 
                  href="mailto:transfertroyal.contact@gmail.com" 
                  className="text-royal-gold-600 hover:text-royal-gold-700 transition-colors"
                >
                  transfertroyal.contact@gmail.com
                </a>
                <p className="text-sm text-gray-500">{t('contact.emailResponse')}</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0">
                <Instagram className="h-6 w-6 text-royal-gold-500" />
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900">{t('contact.instagram')}</h3>
                <a 
                  href="https://www.instagram.com/transfertroyalparis/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-royal-gold-600 hover:text-royal-gold-700 transition-colors"
                >
                  @transfertroyalparis
                </a>
                <p className="text-sm text-gray-500">{t('contact.instagramFollow')}</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0">
                <MessageCircle className="h-6 w-6 text-royal-gold-500" />
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900">{t('contact.whatsapp')}</h3>
                <a 
                  href="https://wa.me/33763725036" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-royal-gold-600 hover:text-royal-gold-700 transition-colors"
                >
                  {t('contact.whatsappChat')}
                </a>
                <p className="text-sm text-gray-500">{t('contact.whatsappQuick')}</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0">
                <MapPin className="h-6 w-6 text-royal-gold-500" />
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900">{t('contact.serviceArea')}</h3>
                <p className="text-gray-600">{t('contact.serviceAreaDesc')}</p>
                <p className="text-sm text-gray-500">{t('contact.serviceAreaDetails')}</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0">
                <Clock className="h-6 w-6 text-royal-gold-500" />
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900">{t('contact.availability')}</h3>
                <p className="text-gray-600">{t('contact.availabilityTime')}</p>
                <p className="text-sm text-gray-500">{t('contact.availabilityDesc')}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">{t('contact.sendMessage')}</h2>
          
          {submitStatus === 'success' && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-md">
              <p className="text-green-800">✅ {t('contact.messageSent')}</p>
            </div>
          )}

          {submitStatus === 'error' && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md">
              <p className="text-red-800">❌ {t('contact.messageError')}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                {t('contact.form.name')}
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-royal-gold-500 focus:border-royal-gold-500"
                placeholder="Your full name"
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                {t('contact.form.email')}
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-royal-gold-500 focus:border-royal-gold-500"
                placeholder="your.email@example.com"
                required
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                {t('contact.form.phone')}
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-royal-gold-500 focus:border-royal-gold-500"
                placeholder="+33 6 12 34 56 78"
              />
            </div>

            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                {t('contact.form.subject')}
              </label>
              <select
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-royal-gold-500 focus:border-royal-gold-500"
                required
              >
                <option value="">{t('contact.form.selectSubject')}</option>
                <option value="booking">{t('contact.form.newBooking')}</option>
                <option value="modification">{t('contact.form.modifyBooking')}</option>
                <option value="cancellation">{t('contact.form.cancellation')}</option>
                <option value="pricing">{t('contact.form.pricing')}</option>
                <option value="general">{t('contact.form.general')}</option>
                <option value="complaint">{t('contact.form.complaint')}</option>
              </select>
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                {t('contact.form.message')}
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                rows={5}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-royal-gold-500 focus:border-royal-gold-500"
                placeholder={t('contact.form.messagePlaceholder')}
                required
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-royal-gold-500 text-royal-brown-950 py-3 px-4 rounded-md hover:bg-royal-gold-600 transition-colors duration-300 font-medium"
            >
              {isSubmitting ? t('contact.form.sending') : t('contact.form.send')}
            </button>
          </form>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="mt-16 bg-gray-50 rounded-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">{t('contact.faq.title')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{t('contact.faq.howFarAdvance.question')}</h3>
            <p className="text-gray-600">{t('contact.faq.howFarAdvance.answer')}</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{t('contact.faq.childSeats.question')}</h3>
            <p className="text-gray-600">{t('contact.faq.childSeats.answer')}</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{t('contact.faq.flightDelay.question')}</h3>
            <p className="text-gray-600">{t('contact.faq.flightDelay.answer')}</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{t('contact.faq.cancellation.question')}</h3>
            <p className="text-gray-600">{t('contact.faq.cancellation.answer')}</p>
          </div>
        </div>
      </div>
    </div>
  );
}