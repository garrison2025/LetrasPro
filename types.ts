
export interface FontStyle {
  id: string;
  name: string;
  category: 'sans' | 'serif' | 'script' | 'gothic' | 'other' | 'decorative' | 'aesthetic' | 'gaming' | 'vaporwave' | 'block' | 'mirror' | 'chicano' | 'heavy' | 'graffiti' | 'facebook' | 'amino' | 'belico' | 'nature' | 'coquette' | 'number' | 'tool';
  map: Record<string, string>;
  isPremium?: boolean; 
  pages: string[]; 
  compatibility: 'high' | 'medium' | 'low';
  tags?: string[]; 
}

export interface BioTemplate {
  id: string;
  name: string;
  layout: string; // El layout usa placeholders como {text}
  category: 'instagram' | 'tiktok' | 'gaming';
}

export interface FeatureItem {
  title: string;
  description: string;
  icon: 'star' | 'zap' | 'check' | 'heart' | 'shield' | 'smartphone' | 'palette' | 'eye' | 'pen-tool' | 'moon' | 'gamepad' | 'list' | 'trending-up' | 'bold' | 'layers';
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
  isCombined?: boolean; 
}

export type TextCase = 'original' | 'upper' | 'lower' | 'title';

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
