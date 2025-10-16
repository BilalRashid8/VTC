// src/components/seo/PageSEO.tsx
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";

const BASE = "https://transfertroyalparis.com";

export default function PageSEO({ pageKey }: { pageKey: string }) {
  const { i18n, t } = useTranslation();
  const lang = i18n.language || 'en';
  const url = `${BASE}/${pageKey === 'home' ? '' : pageKey}`;

  const ldLocalBusiness = {
    "@context": "https://schema.org",
    "@type": "TaxiService",
    "name": "Transfert Royal Paris",
    "areaServed": "Paris",
    "url": url,
    "telephone": "+33XXXXXXXXX"
  };

  return (
    <Helmet htmlAttributes={{ lang }}>
      <title>{t(`meta.${pageKey}.title`)}</title>
      <meta name="description" content={t(`meta.${pageKey}.description`)} />
      <link rel="canonical" href={url} />
      <link rel="alternate" hrefLang="fr" href={`${BASE}/fr/${pageKey}`} />
      <link rel="alternate" hrefLang="en" href={`${BASE}/en/${pageKey}`} />
      <link rel="alternate" hrefLang="es" href={`${BASE}/es/${pageKey}`} />
      <meta property="og:title" content={t(`meta.${pageKey}.title`)} />
      <meta property="og:description" content={t(`meta.${pageKey}.description`)} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />
      <meta property="og:image" content={`${BASE}/og.jpg`} />
      <script type="application/ld+json">{JSON.stringify(ldLocalBusiness)}</script>
      <link rel="icon" href="/transfert-royal-logo.ico" />
    </Helmet>
  );
}
