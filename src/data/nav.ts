export type Lang = 'en' | 'es';

export const navLinks = {
  en: {
    home:    '/',
    loans:   '/loan-options',
    about:   '/about-us',
    team:    '/our-team',
    contact: '/contact-us',
  },
  es: {
    home:    '/es',
    loans:   '/es/opciones-de-prestamo',
    about:   '/es/sobre-nosotros',
    team:    '/es/nuestro-equipo',
    contact: '/es/contactenos',
  },
} as const;

export const megaLinks = {
  en: [
    { key: 'fixed',   href: '/fixed-rate-mortgage-miami',      i18n: 'loan.fixed',   icon: '<path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>' },
    { key: 'va',      href: '/va-home-loan-miami',              i18n: 'loan.va',      icon: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>' },
    { key: 'fha',     href: '/fha-home-loan-miami',             i18n: 'loan.fha',     icon: '<path d="M3 10.5L12 3l9 7.5V21H15v-6H9v6H3V10.5z"/>' },
    { key: 'ftb',     href: '/first-time-homebuyer-miami',      i18n: 'loan.ftb',     icon: '<path d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/>' },
    { key: 'lowdown', href: '/low-down-payment-mortgage',       i18n: 'loan.lowdown', icon: '<line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/>' },
    { key: 'invest',  href: '/investment-property-loans-miami', i18n: 'loan.invest',  icon: '<rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><path d="M8 21h8M12 17v4"/>' },
    { key: 'rehab',   href: '/rehab-loan-203k',                 i18n: 'loan.rehab',   icon: '<path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z"/>' },
    { key: 'refi',    href: '/mortgage-refinance-miami',        i18n: 'loan.refi',    icon: '<polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 .49-3.61"/>' },
    { key: 'usda',    href: '/usda-loan-florida',               i18n: 'loan.usda',    icon: '<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>' },
    { key: 'jumbo',   href: '/jumbo-loans-miami',               i18n: 'loan.jumbo',   icon: '<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>' },
  ],
  es: [
    { key: 'fixed',   href: '/es/hipoteca-tasa-fija-miami',          i18n: 'loan.fixed',   icon: '<path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>' },
    { key: 'va',      href: '/es/prestamo-va-miami',                  i18n: 'loan.va',      icon: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>' },
    { key: 'fha',     href: '/es/prestamo-fha-miami',                 i18n: 'loan.fha',     icon: '<path d="M3 10.5L12 3l9 7.5V21H15v-6H9v6H3V10.5z"/>' },
    { key: 'ftb',     href: '/es/primer-comprador-miami',             i18n: 'loan.ftb',     icon: '<path d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/>' },
    { key: 'lowdown', href: '/es/hipoteca-bajo-enganche',             i18n: 'loan.lowdown', icon: '<line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/>' },
    { key: 'invest',  href: '/es/prestamos-propiedad-inversion',      i18n: 'loan.invest',  icon: '<rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><path d="M8 21h8M12 17v4"/>' },
    { key: 'rehab',   href: '/es/prestamo-rehabilitacion-203k',       i18n: 'loan.rehab',   icon: '<path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z"/>' },
    { key: 'refi',    href: '/es/refinanciar-hipoteca-miami',         i18n: 'loan.refi',    icon: '<polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 .49-3.61"/>' },
    { key: 'usda',    href: '/es/prestamo-usda-florida',              i18n: 'loan.usda',    icon: '<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>' },
    { key: 'jumbo',   href: '/es/prestamos-jumbo-miami',              i18n: 'loan.jumbo',   icon: '<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>' },
  ],
} as const;

export const altLangPath = {
  '/':                              '/es',
  '/loan-options':                  '/es/opciones-de-prestamo',
  '/about-us':                      '/es/sobre-nosotros',
  '/our-team':                      '/es/nuestro-equipo',
  '/contact-us':                    '/es/contactenos',
  '/fixed-rate-mortgage-miami':     '/es/hipoteca-tasa-fija-miami',
  '/fha-home-loan-miami':           '/es/prestamo-fha-miami',
  '/va-home-loan-miami':            '/es/prestamo-va-miami',
  '/usda-loan-florida':             '/es/prestamo-usda-florida',
  '/jumbo-loans-miami':             '/es/prestamos-jumbo-miami',
  '/first-time-homebuyer-miami':    '/es/primer-comprador-miami',
  '/low-down-payment-mortgage':     '/es/hipoteca-bajo-enganche',
  '/rehab-loan-203k':               '/es/prestamo-rehabilitacion-203k',
  '/investment-property-loans-miami': '/es/prestamos-propiedad-inversion',
  '/mortgage-refinance-miami':      '/es/refinanciar-hipoteca-miami',
  '/privacy-policy':                '/es/politica-de-privacidad',
  '/cookie-policy':                 '/es/politica-de-cookies',
} as const;
