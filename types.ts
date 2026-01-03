export type Card = {
  id: number;
  slug: string;
  title: string;
  subtitle: string;
  affirmation: string;
  body: string;           // Změněno z description na body
  shadow: string;
  question: string;
  accent: string;
  imagePath: string;
  isSupplementary?: boolean; // Přidáno pro rozlišení doplňkových karet
};

export interface DailyState {
  slug: string;
  date: string;
}