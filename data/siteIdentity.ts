export const SITE_NAME = 'LetrasPro';
export const EDITORIAL_NAME = 'Equipo LetrasPro';
export const PROJECT_REPOSITORY = 'https://github.com/garrison2025/LetrasPro';
export const UNICODE_FONT_FAQ = 'https://www.unicode.org/faq/font_keyboard.html';
export const SITE_URL = 'https://conversordeletrasbonitas.org';
export const ORGANIZATION_ID = `${SITE_URL}/#organization`;
export const WEBSITE_ID = `${SITE_URL}/#website`;
export const EDITORIAL_ID = `${SITE_URL}/sobre-nosotros#equipo-editorial`;

// Public brand identities only; no invented company registration or profiles.
export const SITE_ENTITIES = [
  {
    '@type': 'Organization',
    '@id': ORGANIZATION_ID,
    name: SITE_NAME,
    alternateName: 'Conversor de Letras Bonitas',
    url: `${SITE_URL}/`,
    sameAs: [PROJECT_REPOSITORY],
    logo: { '@type': 'ImageObject', url: `${SITE_URL}/icon-512.png`, width: 512, height: 512 },
  },
  {
    '@type': 'Organization',
    '@id': EDITORIAL_ID,
    name: EDITORIAL_NAME,
    url: EDITORIAL_ID,
    parentOrganization: { '@id': ORGANIZATION_ID },
  },
  {
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    name: SITE_NAME,
    alternateName: 'Conversor de Letras Bonitas',
    url: `${SITE_URL}/`,
    inLanguage: 'es',
    publisher: { '@id': ORGANIZATION_ID },
    potentialAction: {
      '@type': 'SearchAction',
      target: { '@type': 'EntryPoint', urlTemplate: `${SITE_URL}/?q={search_term_string}` },
      'query-input': 'required name=search_term_string',
    },
  },
];
