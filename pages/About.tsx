import React, { useMemo, useState } from 'react';

const TILES = [
  {
    title: 'Původ Terragramů',
    intro: 'Vibrační dar z hlubin hory Blaník.',
    body: `Terragramy nejsou plodem lidské mysli, ale vibračním darem z nitra hory Blaník. Vynořily se jako světelné pilíře, které pomáhají duši v nastávajícím přechodu a transformaci. 

Jsou to planetární ochránci – nástroje, které hlídají moudrost k objevení pravého Poznání. Jejich úkolem je obnovit pokřivené planetární úrovně a očistit je plamenem uvědomění. Přicházejí, aby podpořily vzestup Země i každého z nás do stavu celistvosti.`
  },
  {
    title: 'Symbol Světla',
    intro: 'Jazyk vnímání, který obchází mysl.',
    body: `Symbol světla není popis reality, je to rezonance. Tvary a linie promlouvají přímo k vibračnímu potenciálu vaší posvátné Duše. 

Zatímco slova se snaží vysvětlovat, symbol umožňuje cítit. Jako tichý jazyk obchází naučené vzorce ega a dotýká se míst, kde sídlí vaše opravdové „Já“. Je to most mezi vnějším projevem a vnitřní esencí.`
  },
  {
    title: 'Kvality Bytí',
    intro: 'Dvanáct bran k vaší vnitřní svatyni.',
    body: `Každý Terragram nese unikátní kvalitu bytí: změnu, vášeň, důvěru či tvořivost. Těchto dvanáct kvalit tvoří ucelenou svatyni pro osobní růst a posílení těla i ducha.

Symboly tyto kvality nevytvářejí, ony je zrcadlí. Ukazují vám, co je ve vás již přítomné, ale dosud možná skryté za oponou iluzí. Jsou to semínka, která čekají na vaši pozornost, aby mohla vzklíčit do plné síly.`
  },
  {
    title: 'Aktivační klíče',
    intro: 'Dotek, který probouzí vibrační potenciál.',
    body: `Karty Terragramů jsou aktivačními klíči. Jejich síla se neprobouzí mechanickým použitím, ale vědomým setkáním. 

V okamžiku vnitřního ztišení a přijetí se symbol aktivuje. Poukazuje na pokřivení osobnosti, ale zároveň pozvedá kvality Duše k jejich čistému vyjádření. Aktivace je milostným aktem alchymie, kdy se vaše pozornost spojuje se zdrojem.`
  },
  {
    title: 'Svobodná spolupráce',
    intro: 'Energie, kterou nelze zneužít.',
    body: `Základním zákonem Terragramů je svobodná spolupráce. Jsou nástrojem vývoje a proto jejich energii nelze zneužít k negativním účelům. 

Působí pouze tam, kde je přítomna láska a pokora k vývoji. Symboly nenutí, nevedou ani nezasahují proti vůli. Jsou tu, aby vyrovnávaly vesmírnou dualitu a umožnily Božímu JÁ přijmout celistvé poznání.`
  },
  {
    title: 'Cesty setkání',
    intro: 'Od rituálu k energetickému zářiči.',
    body: `S Terragramy lze pracovat mnoha způsoby, podle toho, co vaše cesta právě vyžaduje. Mohou být denním rituálem, průvodcem při výkladu nebo nástrojem pro kolektivní konstelace.

Slouží také jako energetické zářiče – pročišťují prostor od pokřivených energií, harmonizují krajinu a pomáhají regenerovat zraněná místa Země. Terragram vám neříká, co máte dělat; ukazuje vám, kým v danou chvíli jste.`
  },
  {
    title: 'Sjednocení',
    intro: 'Návrat z oddělenosti ke zdroji.',
    body: `Soubor Terragramů tvoří celek, chrám portálu sjednocení. Je to nástroj pro mystickou svatbu Duše a Ducha.

Sjednocení znamená konec hledání cesty. Je to stav, kdy si uvědomíte, že nejste odděleni od vědění, ale jste jeho součástí. V tomto bodě se rozpouští dualita a vy se navracíte na své právoplatné místo v evolučním plánu vzestupu.`
  },
  {
    title: 'Tichý Průvodce',
    intro: 'Stát se cestou, nikoliv poutníkem.',
    body: `Terragramy nejsou cílem. Jsou ukazateli na cestě k celistvému poznání, které vás postupně učí opouštět lpění na identitě a egu. 

V určitém bodě ticho převáží nad otázkami. Člověk přestává hledat cestu, protože pochopí, že on sám je cestou. Terragramy v tomto okamžiku splnily svůj účel – dovedly vás k rozpoznání vaší vlastní božské podstaty.`
  }
];

const About: React.FC = () => {
  const [activeTile, setActiveTile] = useState<number | null>(null);
  const activeContent = useMemo(() => (activeTile !== null ? TILES[activeTile] : null), [activeTile]);

  return (
    <div className="min-h-screen px-6 pt-20 pb-24 flex flex-col items-center">
      <div className="about-section w-full max-w-5xl space-y-12">
        
        {/* Header Section */}
        <header className="space-y-6 text-center">
          <p className="font-light text-[13px] tracking-[0.5em] text-[color:var(--muted)] lowercase animate-in fade-in slide-in-from-bottom-2 delay-100">
            o terragramech
          </p>
          <div className="space-y-4">
            <h1 className="text-3xl md:text-4xl font-serif tracking-[0.2em] text-[color:var(--text)] text-shadow-paper animate-in fade-in slide-in-from-bottom-2 delay-200 uppercase">
              Cesta k vnitřnímu světlu
            </h1>
            <h2 className="text-2xl md:text-3xl font-serif tracking-[0.15em] text-[color:var(--text)] text-shadow-paper animate-in fade-in slide-in-from-bottom-2 delay-300 uppercase opacity-80">
              Tichý iniciační prostor
            </h2>
          </div>
          <div className="divider-gold w-full max-w-xs mx-auto animate-in fade-in slide-in-from-bottom-2 delay-400 opacity-30"></div>
          <p className="max-w-2xl mx-auto text-balance text-[color:var(--muted)] leading-relaxed text-sm md:text-base animate-in fade-in slide-in-from-bottom-2 delay-500 font-light italic">
            „Každý Terragram je zrcadlem, ve kterém se odráží hloubka Vaší podstaty. Nespěchejte. Nechte se vést tichým vjemem k symbolu, který si Vás přitáhne. Právě v něm se skrývá princip, který je připraven k rozvinutí.“
          </p>
        </header>

        {/* Tiles Grid */}
        <div className={`grid grid-cols-1 md:grid-cols-2 gap-8 transition-opacity duration-500 ${activeTile !== null ? 'opacity-20 pointer-events-none' : 'opacity-100'}`}>
          {TILES.map((tile, index) => (
            <article
              key={tile.title}
              className={`about-tile surface-card lux-shimmer p-8 rounded-[32px] cursor-pointer hover:-translate-y-2 transition-all duration-500 flex flex-col justify-center min-h-[180px] group`}
              onClick={() => setActiveTile(index)}
              role="button"
              tabIndex={0}
            >
              <h3 className="font-serif text-xl tracking-[0.15em] uppercase text-[color:var(--text)] mb-4 group-hover:text-[color:var(--gold)] transition-colors">
                {tile.title}
              </h3>
              <div className="divider-gold w-12 mb-4 opacity-20 group-hover:w-full group-hover:opacity-40 transition-all duration-700"></div>
              <p className="text-[color:var(--muted)] text-sm tracking-wide leading-relaxed">
                {tile.intro}
              </p>
            </article>
          ))}
        </div>
      </div>

      {/* Detail Modal Overlay */}
      {activeContent && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-500" 
          onClick={() => setActiveTile(null)}
        >
          <div 
            className="surface-card relative w-full max-w-2xl max-h-[85vh] overflow-y-auto p-8 md:p-12 rounded-[40px] shadow-2xl animate-in zoom-in-95 duration-300" 
            onClick={event => event.stopPropagation()} 
            role="dialog" 
            aria-modal="true"
          >
            <h3 className="font-serif text-2xl md:text-3xl tracking-[0.2em] text-[color:var(--text)] uppercase mb-6">
              {activeContent.title}
            </h3>
            
            <div className="divider-gold w-full mb-8 opacity-30"></div>
            
            <div className="space-y-6">
              {activeContent.body.split('\n\n').map((paragraph, index) => (
                <p 
                  key={index} 
                  className="text-[color:var(--text)] text-sm md:text-base leading-relaxed opacity-100 font-light"
                >
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Close Button X */}
            <button
              className="absolute top-6 right-8 text-[color:var(--muted)] hover:text-[color:var(--text)] transition-colors text-3xl font-light"
              onClick={() => setActiveTile(null)}
              aria-label="Zavřít"
            >
              &times;
            </button>

            {/* Bottom Close Button */}
            <button
              className="mt-12 font-serif uppercase text-[10px] tracking-[0.5em] border border-[color:var(--gold-soft)] py-3 px-10 hover:bg-[color:var(--gold-soft)] hover:text-white transition-all duration-500 mx-auto block text-[color:var(--text)]"
              onClick={() => setActiveTile(null)}
            >
              ZAVŘÍT
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default About;