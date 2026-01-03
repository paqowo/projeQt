import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="w-full py-16 px-6 text-center mt-auto">
      {/* Top Row (Manifesto) */}
      <p className="text-[10px] md:text-[11px] tracking-[0.2em] uppercase font-serif opacity-70 md:whitespace-nowrap text-balance mx-auto max-w-lg">
        TERRAGRAM JE VĚDOMÝ PRINCIP • SYMBOL SVĚTLA JE JEHO OBRAZ • AKTIVAČNÍ KLÍČ VZNIKÁ VE CHVÍLI, KDY SE TENTO PRINCIP V ČLOVĚKU PROBUDÍ.
      </p>
      {/* Bottom Row (Copyright) */}
      <a 
        href="https://www.freecooperation.cz" 
        target="_blank" 
        rel="noopener noreferrer" 
        className="text-[9px] tracking-[0.5em] uppercase opacity-30 mt-4 block hover:opacity-100 transition-opacity"
      >
        © SVOBODNÁ SPOLUPRÁCE 2026
      </a>
    </footer>
  );
};

export default Footer;
