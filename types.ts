export interface FontStyle {
  id: string;
  name: string;
  category: 'sans' | 'serif' | 'script' | 'gothic' | 'other' | 'decorative' | 'aesthetic' | 'gaming' | 'vaporwave';
  map: Record<string, string>;
  isPremium?: boolean; 
  pages: string[]; 
  compatibility: 'high' | 'medium' | 'low';
  tags?: string[]; // Para filtros de "tono"
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
  content: string; 
  filter: (font: FontStyle) => boolean;
  
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
  isCombined?: boolean; // Indica si se usó un combinador para tildes/ñ
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string; 
  date: string;
  author: string;
  tags: string[];
  imageUrl?: string; 
}