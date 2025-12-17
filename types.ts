export interface FontStyle {
  id: string;
  name: string;
  category: 'sans' | 'serif' | 'script' | 'gothic' | 'other' | 'decorative';
  map: Record<string, string>;
  isPremium?: boolean; 
  pages: string[]; // Strict allowlist of page IDs where this font should appear
}

export interface FeatureItem {
  title: string;
  description: string;
  icon: 'star' | 'zap' | 'check' | 'heart' | 'shield' | 'smartphone' | 'palette';
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface PageConfig {
  path: string;
  title: string;
  description: string;
  heading: string;
  content: string; // The existing general description
  filter: (font: FontStyle) => boolean;
  
  // New SEO Content Sections
  whyFeatures: FeatureItem[];
  howToSteps: string[];
  faqs: FaqItem[];
}

export interface NavLink {
  label: string;
  path: string;
  group?: 'generators' | 'tools';
}

export interface TextSegment {
  content: string;
  isFallback: boolean;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string; // HTML string for rich text content
  date: string;
  author: string;
  tags: string[];
  imageUrl?: string; // Optional cover image URL
}