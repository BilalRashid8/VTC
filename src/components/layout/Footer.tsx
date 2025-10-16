import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Phone, Mail } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="text-white">
      {/* léger dégradé pour donner du relief */}
      <div className="bg-[#FEB21A] bg-gradient-to-b from-[#FEB21A] to-[#e0a114]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* TOP: grille principale */}
          <div className="py-12 grid grid-cols-1 md:grid-cols-4 gap-10">
            {/* Col 1: Logo + tagline */}
            <div>
              <Link to="/" aria-label="Accueil Transfert Royal Paris" className="inline-block">
                <img
                  src="/logo/transfert-royal-logo.png"
                  alt="Transfert Royal Paris"
                  className="h-14 w-auto mb-3"
                  loading="lazy"
                  decoding="async"
                />
              </Link>
              <p className="text-sm/6 text-white/90">
                VTC premium à Paris et en Île-de-France
              </p>
            </div>

            {/* Col 2: Contact */}
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wide text-white/90 mb-4">
                {t('footer.contact')}
              </h3>
              <ul className="space-y-3 text-white">
                <li className="flex items-center gap-2">
                  <Phone className="h-4 w-4" aria-hidden="true" />
                  <a href="tel:+33763725036" className="hover:underline">07 63 72 50 36</a>
                </li>
                <li className="flex items-center gap-2">
                  <Mail className="h-4 w-4" aria-hidden="true" />
                  <a href="mailto:transfertroyal.contact@gmail.com" className="hover:underline">
                    transfertroyal.contact@gmail.com
                  </a>
                </li>
              </ul>
            </div>

            {/* Col 3: Liens rapides */}
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wide text-white/90 mb-4">
                {t('footer.quickLinks')}
              </h3>
              <ul className="space-y-3">
                <li><Link to="/book" className="hover:underline">{t('nav.book')}</Link></li>
                <li><Link to="/faq" className="hover:underline">FAQ</Link></li>
                <li><Link to="/contact" className="hover:underline">{t('nav.contact')}</Link></li>
              </ul>
            </div>

            {/* Col 4: Réseaux sociaux */}
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wide text-white/90 mb-4">
                {t('footer.followUs')}
              </h3>
              <a
                href="https://www.instagram.com/transfertroyalparis/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 hover:underline"
              >
                <Instagram className="h-6 w-6" aria-hidden="true" />
                <span>@transfertroyalparis</span>
              </a>
            </div>
          </div>

          {/* MIDDLE: bande moyens de paiement */}
          <div className="border-t border-white/20 py-6">
            <p className="text-center text-sm font-medium text-white/90 mb-4">
              {t('footer.payments')}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-6">
              {/* Place ces fichiers dans /public/payments/ (même hauteur pour tous) */}
              <img src="/payments/Visa_Logo.png"       alt="Visa"             className="h-7 w-auto grayscale opacity-90 hover:opacity-100 hover:grayscale-0 transition" loading="lazy" />
              <img src="/payments/Mastercard_Logo.png" alt="Mastercard"       className="h-7 w-auto grayscale opacity-90 hover:opacity-100 hover:grayscale-0 transition" loading="lazy" />
              <img src="/payments/Amex_Logo.png"       alt="American Express" className="h-7 w-auto grayscale opacity-90 hover:opacity-100 hover:grayscale-0 transition" loading="lazy" />
              <img src="/payments/Paypal_Logo.png"     alt="PayPal"           className="h-7 w-auto grayscale opacity-90 hover:opacity-100 hover:grayscale-0 transition" loading="lazy" />
              <img src="/payments/Apple_Pay_Logo.png"  alt="Apple Pay"        className="h-7 w-auto grayscale opacity-90 hover:opacity-100 hover:grayscale-0 transition" loading="lazy" />
              <img src="/payments/Stripe_Logo.png"     alt="Stripe"           className="h-7 w-auto grayscale opacity-90 hover:opacity-100 hover:grayscale-0 transition" loading="lazy" />
            </div>
          </div>

          {/* BOTTOM: barre légale */}
          <div className="py-5 border-t border-white/20 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-xs text-white/90 text-center">
              &copy; {new Date().getFullYear()} Transfert Royal Paris. {t('footer.rights')}
            </p>
          </div>

        </div>
      </div>
    </footer>
  );
}
