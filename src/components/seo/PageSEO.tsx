import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";

const BASE = "https://transfertroyalparis.com";

export default function PageSEO({ pageKey }: { pageKey: string }) {
  const { i18n, t } = useTranslation();
  const lang = i18n.language || 'fr';
  const url = `${BASE}/${pageKey === 'home' ? '' : pageKey}`;

  const ldOrganization = {
    "@context": "https://schema.org",
    "@type": "TaxiService",
    "@id": `${BASE}/#organization`,
    "name": "Transfert Royal Paris",
    "alternateName": "Royal Transfer Paris",
    "description": "Service de VTC premium à Paris - Transferts aéroports, gares et Disneyland",
    "url": BASE,
    "logo": `${BASE}/logo/transfert-royal-logo.png`,
    "image": `${BASE}/logo/transfert-royal-logo.png`,
    "telephone": "+33 6 01 02 03 04",
    "email": "contact@transfertroyalparis.com",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Paris",
      "addressRegion": "Île-de-France",
      "addressCountry": "FR"
    },
    "areaServed": [
      {
        "@type": "City",
        "name": "Paris"
      },
      {
        "@type": "City",
        "name": "Île-de-France"
      }
    ],
    "priceRange": "€€",
    "serviceType": ["VTC", "Transfert Aéroport", "Transfert Gare", "Transfert Disneyland"],
    "availableLanguage": ["fr", "en", "es"],
    "sameAs": [
      "https://www.instagram.com/transfertroyalparis",
      "https://www.facebook.com/transfertroyalparis"
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Services de transfert",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Transfert Aéroport CDG",
            "description": "Service de transfert privé depuis/vers l'aéroport Charles de Gaulle"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Transfert Disneyland Paris",
            "description": "Service de transfert privé vers Disneyland Paris"
          }
        }
      ]
    }
  };

  const ldWebsite = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${BASE}/#website`,
    "url": BASE,
    "name": "Transfert Royal Paris",
    "description": "Réservation de VTC et chauffeur privé à Paris",
    "publisher": {
      "@id": `${BASE}/#organization`
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${BASE}/book?q={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    },
    "inLanguage": ["fr-FR", "en-US", "es-ES"]
  };

  const ldBreadcrumb = pageKey !== 'home' ? {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Accueil",
        "item": BASE
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": t(`meta.${pageKey}.title`),
        "item": url
      }
    ]
  } : null;

  const ldFAQ = pageKey === 'faq' ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Comment puis-je réserver un transfert privé à Paris ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "La réservation se fait très facilement sur notre site en quelques clics. Indiquez votre lieu de prise en charge et votre destination, choisissez votre véhicule adapté, et validez votre réservation en ligne."
        }
      },
      {
        "@type": "Question",
        "name": "Proposez-vous des sièges bébé ou enfant ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Oui, pour garantir la sécurité de vos enfants, nous mettons gratuitement à disposition des sièges auto adaptés à chaque âge. Pensez à en faire la demande lors de votre réservation."
        }
      },
      {
        "@type": "Question",
        "name": "Que se passe-t-il si mon vol a du retard ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Nous suivons en temps réel l'arrivée de votre vol. En cas de retard, l'heure de prise en charge est automatiquement ajustée sans frais supplémentaires."
        }
      }
    ]
  } : null;

  return (
    <Helmet htmlAttributes={{ lang }}>
      <title>{t(`meta.${pageKey}.title`)}</title>
      <meta name="description" content={t(`meta.${pageKey}.description`)} />
      <meta name="keywords" content="VTC Paris, transfert aéroport Paris, chauffeur privé Paris, transfert CDG, transfert Orly, transfert Disneyland, navette aéroport, VTC Disneyland, transfert gare Paris" />
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <link rel="canonical" href={url} />

      <link rel="alternate" hrefLang="fr" href={`${BASE}${pageKey === 'home' ? '' : `/${pageKey}`}`} />
      <link rel="alternate" hrefLang="en" href={`${BASE}/en${pageKey === 'home' ? '' : `/${pageKey}`}`} />
      <link rel="alternate" hrefLang="es" href={`${BASE}/es${pageKey === 'home' ? '' : `/${pageKey}`}`} />
      <link rel="alternate" hrefLang="x-default" href={`${BASE}${pageKey === 'home' ? '' : `/${pageKey}`}`} />

      <meta property="og:locale" content={lang === 'fr' ? 'fr_FR' : lang === 'es' ? 'es_ES' : 'en_US'} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Transfert Royal Paris" />
      <meta property="og:title" content={t(`meta.${pageKey}.title`)} />
      <meta property="og:description" content={t(`meta.${pageKey}.description`)} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={`${BASE}/hero/Img-hero.jpg`} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content="Transfert Royal Paris - VTC Premium" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={t(`meta.${pageKey}.title`)} />
      <meta name="twitter:description" content={t(`meta.${pageKey}.description`)} />
      <meta name="twitter:image" content={`${BASE}/hero/Img-hero.jpg`} />

      <meta name="format-detection" content="telephone=yes" />
      <meta name="geo.region" content="FR-IDF" />
      <meta name="geo.placename" content="Paris" />

      <script type="application/ld+json">{JSON.stringify(ldOrganization)}</script>
      <script type="application/ld+json">{JSON.stringify(ldWebsite)}</script>
      {ldBreadcrumb && <script type="application/ld+json">{JSON.stringify(ldBreadcrumb)}</script>}
      {ldFAQ && <script type="application/ld+json">{JSON.stringify(ldFAQ)}</script>}
    </Helmet>
  );
}
