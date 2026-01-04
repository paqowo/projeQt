import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom'; // 1. PŘIDÁNO: Import pro odkazy
import { Card } from '../types';
import { SymbolSVG } from './SymbolSVG';
import { CARDS } from '../lib/cards'; // 2. PŘIDÁNO: Import seznamu všech karet

interface CardDetailViewProps {
  card: Card;
}

const hexToRgb = (hex: string): string => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`
    : '0, 0, 0';
};

const CardDetailView: React.FC<CardDetailViewProps> = ({ card }) => {
  const detailViewRef = useRef<HTMLDivElement>(null);

  // Bezpečná extrakce stínu
  const shadowText = card.shadow ? card.shadow.replace(/^Stín:\s*/i, '') : '';

  // 3. PŘIDÁNO: Logika pro nalezení předchozí a další karty
  // Najdeme index aktuální karty podle slugu (nebo ID)
  const currentIndex = CARDS.findIndex((c) => c.slug === card.slug);
  
  // Výpočet indexů s ošetřením "zacyklení" (z poslední jde na první a naopak)
  const prevIndex = (currentIndex - 1 + CARDS.length) % CARDS.length;
  const nextIndex = (currentIndex + 1) % CARDS.length;

  const prevCard = CARDS[prevIndex];
  const nextCard = CARDS[nextIndex];

  useEffect(() => {
    document.body.style.setProperty('--ambient-accent', card.accent);
    document.body.style.setProperty('--ambient-accent-rgb', hexToRgb(card.accent));
    return () => {
      document.body.style.removeProperty('--ambient-accent');
      document.body.style.removeProperty('--ambient-accent-rgb');
    };
  }, [card.accent]);

  useEffect(() => {
    if (detailViewRef.current) {
      detailViewRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  }, [card.id]);

  return (
    <div
      ref={detailViewRef}
      className="w-full max-w-lg mx-auto pb-24 px-6 pt-24 animate-in fade-in slide-in-from-bottom-4 duration-1000"
    >
      <div className="flex flex-col items-center text-center space-y-8">
        <p className="text-[10px] tracking-[0.4em] uppercase opacity-60">
          {card.subtitle}
        </p>

        <div className="relative group w-full flex justify-center items-center h-56 symbol-glow-effect">
          <div
            className="absolute inset-0 animate-pulse-aura"
            style={{ backgroundColor: card.accent, filter: 'blur(40px)' }}
          />
          <div className="relative w-48 h-48 sm:w-32 sm:h-32 animate-float z-10">
            <SymbolSVG slug={card.slug} color={card.accent} />
          </div>
        </div>

        <div className="space-y-2">
          <h1 className="text-4xl font-serif tracking-widest text-shadow-paper uppercase">
            {card.title}
          </h1>
          {card.affirmation && (
            <p className="font-serif italic opacity-80 text-lg">
              &bdquo;{card.affirmation}&ldquo;
            </p>
          )}
        </div>

        <div className="text-left space-y-12 pt-6 w-full">
          <section className="px-2 prose">
            <p className="text-[color:var(--text)] leading-relaxed font-normal text-lg animate-in fade-in slide-in-from-bottom-2 delay-300">
              {card.body}
            </p>
          </section>

          <div className="space-y-6">
            {card.shadow && card.shadow.trim() !== "" && (
              <section className="bg-[color:var(--surface)]/5 backdrop-filter backdrop-blur-md rounded-2xl p-6 mt-8">
                <h4 className="text-[10px] font-black tracking-[0.3em] text-[color:var(--muted)] uppercase mb-4">
                  Stínový aspekt
                </h4>
                <p className="text-[color:var(--muted)] text-base italic leading-relaxed">
                  {shadowText}
                </p>
              </section>
            )}

            {card.question && card.question.trim() !== "" && (
              <section className="bg-[color:var(--surface)] border border-[color:var(--gold-soft)] rounded-2xl p-4 text-center mt-8">
                <h4 className="text-[10px] font-bold tracking-[0.4em] text-[color:var(--muted)] uppercase mb-4">
                  Otázka k zamyšlení
                </h4>
                <p className="text-[color:var(--text)] font-serif italic font-medium leading-relaxed text-balance text-lg md:text-xl">
                  {card.question}
                </p>
              </section>
            )}
          </div>
          
          {/* 4. PŘIDÁNO: Navigační tlačítka */}
          <div className="flex justify-between items-center w-full mt-16 pt-8 border-t border-[color:var(--gold-soft)]/20">
            {prevCard && (
              <Link
                to={`/card/${prevCard.slug}`}
                className="group flex items-center space-x-2 text-left transition-colors duration-300 hover:text-[color:var(--ambient-accent)]"
              >
                <span className="text-xl transform group-hover:-translate-x-1 transition-transform">←</span>
                <div className="flex flex-col">
                  <span className="text-[9px] uppercase tracking-widest opacity-50">Předchozí</span>
                  <span className="font-serif uppercase tracking-wider text-sm">{prevCard.title}</span>
                </div>
              </Link>
            )}

            {nextCard && (
              <Link
                to={`/card/${nextCard.slug}`}
                className="group flex items-center space-x-2 text-right transition-colors duration-300 hover:text-[color:var(--ambient-accent)]"
              >
                <div className="flex flex-col">
                  <span className="text-[9px] uppercase tracking-widest opacity-50">Další</span>
                  <span className="font-serif uppercase tracking-wider text-sm">{nextCard.title}</span>
                </div>
                <span className="text-xl transform group-hover:translate-x-1 transition-transform">→</span>
              </Link>
            )}
          </div>
          {/* Konec navigačních tlačítek */}

        </div>
      </div>
    </div>
  );
};

export default CardDetailView;