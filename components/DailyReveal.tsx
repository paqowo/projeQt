import React, { useState, useEffect } from 'react';
import CardDetailView from './CardDetailView';
import { Card } from '../types';
import { getDailyCardSlug } from '../lib/daily';
import { getCardBySlug } from '../lib/cards';

const logoSymbolSrc = `${import.meta.env.BASE_URL}logo_1.webp`;

const DailyReveal: React.FC = () => {
  const [revealed, setRevealed] = useState(false);
  const [isAnimatingOut, setIsAnimatingOut] = useState(false);
  const [card, setCard] = useState<Card | null>(null);

  useEffect(() => {
    const slug = getDailyCardSlug();
    const foundCard = getCardBySlug(slug);
    if (foundCard) setCard(foundCard);
  }, []);

  const handleReveal = () => {
    if (isAnimatingOut || revealed) return;
    setIsAnimatingOut(true);
    setTimeout(() => {
      setRevealed(true);
    }, 700); 
  };

  if (!card) return null;

  return (
    <div className="min-h-screen w-full flex flex-col items-center px-6 pt-28 pb-20 overflow-x-hidden transition-colors duration-700">
      
      {/* 1. Ritual Portal Card View (Before Reveal) */}
      {!revealed && (
        <div
          onClick={handleReveal}
          className={`group relative w-full max-w-[340px] aspect-[9/16] rounded-[42px] lux-shimmer overflow-hidden animate-breathe
                      transition-all duration-1000 ease-in-out shadow-2xl
                      /* Ethereal Border: Velmi jemná linka, která v rozích přirozeně mizí */
                      border border-white/[0.08]
                      ${isAnimatingOut ? 'animate-out fade-out scale-95 opacity-0' : 'animate-in fade-in slide-in-from-bottom-8 duration-1000'}`}
        >
          {/* Glass-Stone Background */}
          <div className="absolute inset-0 w-full h-full surface-card opacity-90" />

          {/* Ambient Glow behind the logo */}
          <div className="absolute inset-0 top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-1/2 bg-[color:var(--gold)]/10 blur-[100px] rounded-full" />
          
          {/* CONTENT AREA */}
          <div className="relative w-full h-full flex flex-col items-center justify-between p-10 py-16 text-center">
            
            {/* Logo */}
            <div className="w-full flex justify-center pt-4">
              <img
                src={logoSymbolSrc}
                alt="TerraGram symbol"
                className="w-[85%] h-auto object-contain drop-shadow-[0_0_15px_rgba(201,162,77,0.15)] transition-transform duration-1000 group-hover:scale-105"
              />
            </div>

            {/* Instruction Text */}
            <div className="space-y-4 px-2">
              <p className="font-serif text-[15px] md:text-base leading-relaxed text-[color:var(--text)] opacity-70 italic text-balance">
                „Ztište svou mysl a nechte svou pozornost spočinout v nitru. V tomto tichu se symbol stává klíčem k Vašemu Poznání.“
              </p>
              <div className="divider-gold w-8 mx-auto opacity-10 transition-all duration-1000 group-hover:w-12"></div>
            </div>

            {/* The Action Button */}
            <button
              onClick={(e) => { e.stopPropagation(); handleReveal(); }}
              className="w-full font-serif text-[color:var(--text)] text-[11px] tracking-[0.5em] uppercase
                         border border-white/10 rounded-full py-4 px-2
                         bg-white/5 backdrop-blur-md transition-all duration-700
                         hover:bg-[color:var(--gold-soft)] hover:text-white hover:border-white/30 
                         hover:shadow-[0_0_25px_rgba(255,255,255,0.05)]
                         active:scale-95 relative overflow-hidden"
            >
              Aktivovat
            </button>
          </div>
        </div>
      )}

      {/* 2. Card Detail View (After Reveal) */}
      {revealed && (
        <div className="w-full max-w-2xl animate-in fade-in zoom-in-95 duration-1000">
          <CardDetailView card={card} />
        </div>
      )}
      
    </div>
  );
};

export default DailyReveal;
