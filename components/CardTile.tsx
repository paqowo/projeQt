
import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from '../types';
import { SymbolSVG } from './SymbolSVG';

interface CardTileProps {
  card: Card;
  onClick?: () => void;
  className?: string;
  style?: React.CSSProperties;
}

// Helper to convert hex color to a comma-separated RGB string
const hexToRgb = (hex: string): string => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`
    : '0, 0, 0'; // Fallback to black
};


const CardTile: React.FC<CardTileProps> = ({ card, onClick, className, style }) => {
  const accentRgb = hexToRgb(card.accent);

  return (
    <Link
      to={`/card/${card.slug}`}
      onClick={onClick}
      className={`relative group cursor-pointer aspect-square overflow-hidden rounded-[28px] lux-shimmer hover:-translate-y-2 transition-all duration-500 block hover:shadow-[0_25px_60px_-15px_rgba(var(--accent-rgb),0.2)]
                 border-[1px] border-[color:rgba(var(--accent-rgb),0.1)] group-hover:border-[color:rgba(var(--accent-rgb),0.7)]
                 surface-card p-6 flex flex-col items-center justify-between text-center space-y-4 ${className}`}
      style={{ '--accent-rgb': accentRgb, ...style } as React.CSSProperties}
    >
      {/* Top (The Spirit): Subtitle */}
      <p className="text-[10px] tracking-[0.4em] uppercase opacity-60">
        {card.subtitle || card.intro}
      </p>

      {/* Center (The Soul): SymbolSVG with glow */}
      <div className="relative flex items-center justify-center my-auto symbol-glow-effect">
        {/* Ambient Glow */}
        <div
          className="absolute w-24 h-24 rounded-full blur-3xl opacity-40 transition-opacity duration-500 group-hover:opacity-50"
          style={{ backgroundColor: card.accent }}
        />
        {/* Symbol */}
        <div className="relative w-24 h-24 flex items-center justify-center transform group-hover:scale-110 transition-transform duration-500">
          <SymbolSVG slug={card.slug} color={card.accent} />
        </div>
      </div>

      {/* Bottom (The Body) */}
      <div className="space-y-2">
        {/* Title */}
        <h3 className="font-serif tracking-widest text-shadow-paper text-lg">
          {card.title}
        </h3>
        {/* Affirmation */}
        {card.affirmation && (
          <p className="font-serif italic opacity-80 text-sm">
            &bdquo;{card.affirmation}&ldquo;
          </p>
        )}
      </div>
    </Link>
  );
};

export default CardTile;
