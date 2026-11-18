import React from 'react';
import { Helmet } from 'react-helmet-async';
import { SITE_ENTITIES, SITE_NAME } from '../data/siteIdentity';

export default function SiteIdentity() {
  return <Helmet>
    <meta property="og:site_name" content={SITE_NAME} />
    <script type="application/ld+json">{JSON.stringify({ '@context': 'https://schema.org', '@graph': SITE_ENTITIES })}</script>
  </Helmet>;
}
