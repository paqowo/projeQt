import React from 'react';
import { PROJECT_URL } from '../constants';

const logoSrc = `${import.meta.env.BASE_URL}logo.webp`;

interface LogoLinkProps {
  sizeClass?: string;
}

const LogoLink: React.FC<LogoLinkProps> = ({ sizeClass = 'h-16 w-auto object-contain' }) => { // Ponecháno původní h-16
  return (
    <a
      href={PROJECT_URL}
      target="_blank"
      rel="noopener noreferrer"
      // Původní třídy a přechody
      className="inline-block transition-transform hover:scale-105 active:scale-95 duration-300 group" // Přidán 'group' pro hover efekt na divider
    >
      {/* 
        Toto je struktura z CardDetailView pro magický efekt:
        - symbol-glow-effect: Není to explicitně definováno v CardDetailView, ale je tam jako wrapper.
          Třída symbol-glow-effect na divu pod ním je ta, která dělá skutečnou práci s ::after, ale tady se chová spíš jako container.
          Nejlepší je ji ignorovat a použít jen Tailwind třídy pro strukturu a pak explicitní div pro auru.
      */}
      <div className="relative flex flex-col items-center p-8 lux-shimmer rounded-full overflow-hidden"> 
        
        {/*
          Toto je PULZUJÍCÍ AURA - přesně jako v CardDetailView, ale s pevnou barvou '--gold'
          Místo card.accent použijeme vaši CSS proměnnou --gold, aby byla aura vždy zlatá.
        */}
        <div className="absolute inset-0 flex justify-center items-center">
          <div 
            className="absolute w-32 h-32 rounded-full animate-pulse-aura opacity-30" // Třídy animate-pulse-aura
            style={{ 
              backgroundColor: 'var(--gold)', // Používáme vaši CSS proměnnou --gold pro barvu
              filter: 'blur(50px)', // Silnější blur pro mlhavý efekt
              animationDuration: '4s' // Doba trvání animace
            }} 
          />
        </div>

        {/* 
          Toto je SAMOTNÉ LOGO - obaleno v divu s animate-float a z-10 pro nadřazenost nad aurou
        */}
        <div className="relative z-10 animate-float"> {/* Třídy animate-float a z-10 */}
          <img
            src={logoSrc}
            alt="Terragramy logo"
            // Ponecháváme původní sizeClass, přidáváme drop-shadow a hover efekt
            className={`${sizeClass} drop-shadow-[0_0_15px_rgba(201,162,77,0.3)] transition-transform duration-700 group-hover:scale-105`}
            width={128} // Ponecháno původní width
            height={128} // Ponecháno původní height
          />
        </div>

        {/* Skrytý text pro SEO a tichý divider */}
        <span className="sr-only font-black tracking-[-0.05em] text-[color:var(--text)]">
          TERRAGRAMY
        </span>
        {/* Původní divider-gold, ale s group-hover efekty pro prodloužení */}
        <div className="divider-gold mt-1 w-12 opacity-30 group-hover:w-24 group-hover:opacity-60 transition-all duration-1000" aria-hidden="true"></div>
      </div>
    </a>
  );
};

export default LogoLink;
