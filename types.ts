export interface FontStyle {
  id: string;
  name: string;
  category: 'sans' | 'serif' | 'script' | 'gothic' | 'other' | 'decorative';
  map: Record<string, string>;
  isPremium?: boolean; // For highlighting specific styles
}

export interface PageConfig {
  path: string;
  title: string;
  description: string;
  heading: string;
  content: string;
  filter: (font: FontStyle) => boolean;
}

export interface NavLink {
  label: string;
  path: string;
}