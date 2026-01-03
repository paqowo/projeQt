import React, { useEffect, useState } from 'react';

const symbolAsset = (resourceSlug: string) => `${import.meta.env.BASE_URL}symbols/${resourceSlug}.webp`;

interface SymbolSVGProps {
  slug: string;
  color?: string;
  className?: string;
}

export const SymbolSVG: React.FC<SymbolSVGProps> = ({
  slug,
  color,
  className = "w-full h-full"
}) => {
  const [hasError, setHasError] = useState(false);
  const [src, setSrc] = useState(() => symbolAsset(slug));
  const [triedFallback, setTriedFallback] = useState(false);
  const slugWithUnderscore = slug.replace(/-/g, '_');

  useEffect(() => {
    setHasError(false);
    setSrc(symbolAsset(slug));
    setTriedFallback(false);
  }, [slug]);

  if (hasError) {
    return <div className={className} />;
  }

  // Ensure color is available to set CSS variable
  const symbolAccentColor = color || 'transparent'; 

  return (
    <div
      className={`relative group symbol-glow-effect ${className}`}
      style={{ '--symbol-accent-color': symbolAccentColor } as React.CSSProperties}
    >
      <img
        src={src}
        alt=""
        className="relative z-10 w-full h-full"
        onError={() => {
          if (!triedFallback && slugWithUnderscore !== slug) {
            setSrc(symbolAsset(slugWithUnderscore));
            setTriedFallback(true);
          } else {
            setHasError(true);
          }
        }}
      />
    </div>
  );
};
