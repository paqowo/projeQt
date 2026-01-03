
import { LOCAL_STORAGE_KEY } from '../constants';
import { DailyState } from '../types';
import { getRandomCard } from './cards';

export const getDailyCardSlug = (): string => {
  const today = new Date().toISOString().split('T')[0];
  const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
  
  if (stored) {
    try {
      const data: DailyState = JSON.parse(stored);
      if (data.date === today) {
        return data.slug;
      }
    } catch (e) {
      console.error("Failed to parse daily card storage", e);
    }
  }
  
  const newCard = getRandomCard();
  const newState: DailyState = {
    slug: newCard.slug,
    date: today
  };
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newState));
  return newCard.slug;
};
