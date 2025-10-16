import { useTranslation } from 'react-i18next';

export default function SEOContent() {
  const { t } = useTranslation();

  return (
    <section className="py-16 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <article className="prose prose-lg max-w-none">
          <h2 className="text-3xl font-bold text-royal-brown-900 mb-6">
            {t('home.seo.title')}
          </h2>
          <p className="text-gray-700 mb-4">
            {t('home.seo.intro')}
          </p>

          <h3 className="text-2xl font-semibold text-royal-brown-900 mt-8 mb-4">
            {t('home.seo.services.title')}
          </h3>
          <p className="text-gray-700 mb-4">
            {t('home.seo.services.intro')}
          </p>
          <ul className="list-disc pl-6 text-gray-700 mb-6 space-y-2">
            <li dangerouslySetInnerHTML={{ __html: t('home.seo.services.list.airport') }} />
            <li dangerouslySetInnerHTML={{ __html: t('home.seo.services.list.station') }} />
            <li dangerouslySetInnerHTML={{ __html: t('home.seo.services.list.disneyland') }} />
            <li dangerouslySetInnerHTML={{ __html: t('home.seo.services.list.hotel') }} />
            <li dangerouslySetInnerHTML={{ __html: t('home.seo.services.list.chauffeur') }} />
          </ul>

          <h3 className="text-2xl font-semibold text-royal-brown-900 mt-8 mb-4">
            {t('home.seo.whyChoose.title')}
          </h3>
          <p className="text-gray-700 mb-4">
            {t('home.seo.whyChoose.intro')}
          </p>
          <ul className="list-disc pl-6 text-gray-700 mb-6 space-y-2">
            <li dangerouslySetInnerHTML={{ __html: t('home.seo.whyChoose.list.fixedPrices') }} />
            <li dangerouslySetInnerHTML={{ __html: t('home.seo.whyChoose.list.professionalDrivers') }} />
            <li dangerouslySetInnerHTML={{ __html: t('home.seo.whyChoose.list.premiumVehicles') }} />
            <li dangerouslySetInnerHTML={{ __html: t('home.seo.whyChoose.list.flightTracking') }} />
            <li dangerouslySetInnerHTML={{ __html: t('home.seo.whyChoose.list.service247') }} />
            <li dangerouslySetInnerHTML={{ __html: t('home.seo.whyChoose.list.easyBooking') }} />
          </ul>

          <h3 className="text-2xl font-semibold text-royal-brown-900 mt-8 mb-4">
            {t('home.seo.airportTransfer.title')}
          </h3>
          <p className="text-gray-700 mb-4">
            {t('home.seo.airportTransfer.paragraph1')}
          </p>
          <p className="text-gray-700 mb-6">
            {t('home.seo.airportTransfer.paragraph2')}
          </p>

          <h3 className="text-2xl font-semibold text-royal-brown-900 mt-8 mb-4">
            {t('home.seo.booking.title')}
          </h3>
          <p className="text-gray-700 mb-4">
            {t('home.seo.booking.intro')}
          </p>
          <ol className="list-decimal pl-6 text-gray-700 mb-6 space-y-2">
            <li>{t('home.seo.booking.steps.step1')}</li>
            <li>{t('home.seo.booking.steps.step2')}</li>
            <li>{t('home.seo.booking.steps.step3')}</li>
            <li>{t('home.seo.booking.steps.step4')}</li>
            <li>{t('home.seo.booking.steps.step5')}</li>
          </ol>
          <p className="text-gray-700">
            {t('home.seo.booking.conclusion')}
          </p>
        </article>
      </div>
    </section>
  );
}
