import React from 'react';
import { useLocation } from 'react-router-dom';

const GlobalFooter: React.FC = () => {
  const location = useLocation();

  // Determine if Manifesto should be visible based on current path
    const showManifesto = location.pathname.startsWith('/card/') ||
                          location.pathname === '/daily';
  return (
    <div className="w-full flex flex-col items-center">
      {showManifesto && (
        <p className="font-serif text-[10px] md:text-[11px] tracking-[0.2em] uppercase opacity-70 md:whitespace-nowrap text-balance mb-6 px-6 text-center">
          TERRAGRAM JE VĚDOMÝ PRINCIP • SYMBOL SVĚTLA JE JEHO OBRAZ • AKTIVAČNÍ KLÍČ VZNIKÁ VE CHVÍLI, KDY SE TENTO PRINCIP V ČLOVĚKU PROBUDÍ.
        </p>
      )}
      <a 
        href="https://www.freecooperation.cz" 
        target="_blank" 
        rel="noopener noreferrer" 
        className="uppercase text-[9px] tracking-[0.5em] opacity-30 pb-8 hover:opacity-100 transition-opacity"
      >
        © SVOBODNÁ SPOLUPRÁCE 2026
      </a>
    </div>
  );
};

export default GlobalFooter;
