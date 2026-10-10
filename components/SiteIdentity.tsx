import React from 'react';
import { Helmet } from 'react-helmet-async';
import { SITE_ENTITIES } from '../data/siteIdentity';

export default function SiteIdentity() {
  return <Helmet>
    <script type="application/ld+json">{JSON.stringify({ '@context': 'https://schema.org', '@graph': SITE_ENTITIES })}</script>
  </Helmet>;
}
