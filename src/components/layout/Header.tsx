import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown, Plane, Train, Castle, Menu, X, Phone, MessageCircle } from 'lucide-react';
import LanguageSwitcher from './LanguageSwitcher';
import { useTranslation } from 'react-i18next';




const navigation = [
  { name: 'Home', path: '/' },
  { name: 'BooK Now', path: '/book' },
  {
    name: 'Transfers',
    path: '/transfers',
    dropdownItems: [
      { name: 'Airport Transfers', path: '/transfers/airports', icon: Plane },
      { name: 'Train Station Transfers', path: '/transfers/train-stations', icon: Train },
      { name: 'Disneyland Transfers', path: '/transfers/disneyland', icon: Castle },
    ],
  },
  { name: 'FAQ', path: '/faq' },
  { name: 'Contact', path: '/contact' },
];

export default function Header() {
  const location = useLocation();
  const { t } = useTranslation();
  // === Coordonnées (à personnaliser) ===
const WHATSAPP_NUM = '33612345678';           // sans + ni espaces pour wa.me
const WHATSAPP_MSG = encodeURIComponent('Bonjour, je souhaite réserver un transfert VTC.');

  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    setOpenDropdown(null);
    setMobileDropdownOpen(null);
  }, [location.pathname]);

  const handleDropdownToggle = (path: string) => {
    setOpenDropdown(openDropdown === path ? null : path);
  };

  const handleMobileDropdownToggle = (path: string) => {
    setMobileDropdownOpen(mobileDropdownOpen === path ? null : path);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
    setOpenDropdown(null);
    setMobileDropdownOpen(null);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
    setMobileDropdownOpen(null);
  };

  const translatedNavigation = [
    { name: t('nav.home'), path: '/' },
    {
      name: t('nav.transfers'),
      path: '/transfers',
      dropdownItems: [
        { name: 'Airport Transfers', path: '/transfers/airports', icon: Plane },
        { name: 'Train Station Transfers', path: '/transfers/train-stations', icon: Train },
        { name: 'Disneyland Transfers', path: '/transfers/disneyland', icon: Castle },
      ],
    },
    { name: t('nav.faq'), path: '/faq' },
    { name: t('nav.contact'), path: '/contact' },
  ];

  return (
    <header className="bg-[#FEB21A] shadow-lg fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center">
            <Link to="/" className="flex items-center" onClick={closeMobileMenu}>
              <img src="/logo/transfert-royal-logo.png" alt="Transfert Royal Paris" loading="lazy" decoding="async" width={240} height={800} />
            </Link>
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            <LanguageSwitcher />
            {translatedNavigation.map((item, index) => (
              <div key={index} className="relative" ref={item.dropdownItems ? dropdownRef : undefined}>
                {item.dropdownItems ? (
                  <div>
                    <button
                      onClick={() => handleDropdownToggle(item.path)}
                      className={`${
                        location.pathname === item.path || location.pathname.startsWith(item.path + '/')
                          ? 'text-yellow-300'
                          : 'text-white hover:text-yellow-300'
                      } px-3 py-2 text-sm font-medium inline-flex items-center transition-colors duration-200`}
                    >
                      {item.name}
                      <ChevronDown className={`ml-1 h-4 w-4 transform transition-transform ${openDropdown === item.path ? 'rotate-180' : ''}`} />
                    </button>
                    {openDropdown === item.path && (
                      <div className="absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-[#FEB21A] ring-1 ring-yellow-500 ring-opacity-50 z-50">
                        <div className="py-1" role="menu">
                          {item.dropdownItems.map((dropdownItem, dropdownIndex) => (
                            <Link
                              key={dropdownIndex}
                              to={dropdownItem.path}
                              className={`block px-4 py-2 text-sm ${
                                location.pathname === dropdownItem.path
                                  ? 'bg-yellow-100 text-brown-900'
                                  : 'text-white hover:bg-brown-700'
                              } flex items-center space-x-2 transition-colors duration-200`}
                              role="menuitem"
                              onClick={() => setOpenDropdown(null)}
                            >
                              {dropdownItem.icon && <dropdownItem.icon className="h-4 w-4" />}
                              <span>{dropdownItem.name}</span>
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    to={item.path}
                    className={`${
                      location.pathname === item.path
                        ? 'text-yellow-300'
                        : 'text-white hover:text-yellow-300'
                    } px-3 py-2 text-sm font-medium transition-colors duration-200`}
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
            {/* CTA Book Now à droite */}
              <Link
                to="/book"
                className="
                  ml-4 px-5 py-2 
                  bg-white text-[#FEB21A] font-semibold 
                  rounded-full shadow-md
                  hover:bg-yellow-100 hover:scale-105 
                  transition-all duration-200
                "
              >
                {t('nav.book')}
              </Link>
                            {/* === CTA téléphone & WhatsApp (desktop) === */}
                <div className="flex items-center gap-3 ml-4">


                  <a
                    href={`https://wa.me/${WHATSAPP_NUM}?text=${WHATSAPP_MSG}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-600 text-white hover:bg-green-700 transition"
                  >
                    <MessageCircle className="h-4 w-4" />
                    <span className="hidden lg:inline">WhatsApp</span>
                    <span className="lg:hidden">WA</span>
                  </a>
</div>


          </nav>

          <div className="md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="text-white hover:text-yellow-300 p-2 rounded-md transition-colors duration-200"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden border-t border-brown-800">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-brown-900">
              <div className="px-3 py-2 border-b border-brown-800">
                <LanguageSwitcher />
              </div>
              {translatedNavigation.map((item, index) => (
                <div key={index}>
                  {item.dropdownItems ? (
                    <div>
                      <button
                        onClick={() => handleMobileDropdownToggle(item.path)}
                        className={`${
                          location.pathname === item.path || location.pathname.startsWith(item.path + '/')
                            ? 'text-yellow-300 bg-brown-800'
                            : 'text-white hover:text-yellow-300 hover:bg-brown-800'
                        } w-full text-left px-3 py-2 rounded-md text-base font-medium flex items-center justify-between transition-colors duration-200`}
                      >
                        <span>{item.name}</span>
                        <ChevronDown className={`h-4 w-4 transform transition-transform ${mobileDropdownOpen === item.path ? 'rotate-180' : ''}`} />
                      </button>
                      {mobileDropdownOpen === item.path && (
                        <div className="pl-4 space-y-1 mt-1">
                          {item.dropdownItems.map((dropdownItem, dropdownIndex) => (
                            <Link
                              key={dropdownIndex}
                              to={dropdownItem.path}
                              className={`block px-3 py-2 rounded-md text-sm ${
                                location.pathname === dropdownItem.path
                                  ? 'text-yellow-300 bg-brown-800'
                                  : 'text-white hover:text-yellow-300 hover:bg-brown-800'
                              } flex items-center space-x-2 transition-colors duration-200`}
                              onClick={closeMobileMenu}
                            >
                              {dropdownItem.icon && <dropdownItem.icon className="h-4 w-4" />}
                              <span>{dropdownItem.name}</span>
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <Link
                      to={item.path}
                      className={`${
                        location.pathname === item.path
                          ? 'text-yellow-300 bg-brown-800'
                          : 'text-white hover:text-yellow-300 hover:bg-brown-800'
                      } block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200`}
                      onClick={closeMobileMenu}
                    >
                      {item.name}
                    </Link>
                  )}
                </div>
              ))}
              {/* CTA mobile Book Now */}
                <Link
                  to="/book"
                  className="
                    block mt-3 mx-3 text-center 
                    px-5 py-3 rounded-full font-semibold
                    bg-white text-[#FEB21A] shadow-md
                    hover:bg-yellow-100 hover:scale-105 
                    transition-all duration-200
                  "
                  onClick={closeMobileMenu}
                >
                  {t('nav.book')}
                </Link>


                
                

            </div>
          </div>
        )}
      </div>
    </header>
  );
}