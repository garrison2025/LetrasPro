import React, { Children, isValidElement, ReactElement, ReactNode } from 'react';
import { Helmet } from 'react-helmet-async';

// Reuse the page's own metadata for both prerendered HTML and client navigation.
export function PageMetadata({ children }: { children: ReactNode }) {
  const elements = Children.toArray(children).filter(isValidElement) as ReactElement[];
  const title = elements.find(element => element.type === 'title')?.props.children;
  const description = elements.find(element => element.type === 'meta' && element.props.name === 'description')?.props.content;
  const canonical = elements.find(element => element.type === 'link' && element.props.rel === 'canonical')?.props.href;
  return <Helmet>
    {children}
    <meta property="og:type" content="website" />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:url" content={canonical} />
    <meta property="og:image" content="https://conversordeletrasbonitas.org/og-image.png" />
    <meta property="og:locale" content="es_ES" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content={title} />
    <meta name="twitter:description" content={description} />
    <meta name="twitter:image" content="https://conversordeletrasbonitas.org/og-image.png" />
  </Helmet>;
}
