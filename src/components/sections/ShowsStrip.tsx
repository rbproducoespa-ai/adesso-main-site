const DEFAULT_SHOWS = [
  "Automechanika Frankfurt", "Hannover Messe", "DSEI London", "Interpack Düsseldorf",
  "Eurobike Frankfurt", "MIPIM Cannes", "Fachpack Nuremberg", "Medica Düsseldorf",
  "SPS Nuremberg", "Intersolar Munich", "Bauma Munich", "Productronica Munich",
  "Formnext Frankfurt", "CES Las Vegas",
];

export function ShowsStrip({ showsList }: { showsList?: string[] }) {
  const shows = showsList?.length ? showsList : DEFAULT_SHOWS;
  // Duplicate for seamless loop
  const doubled = [...shows, ...shows];

  return (
    <section className="bg-[#0E0E0E] border-b border-white/5 overflow-hidden">
      <div className="flex items-center">
        {/* Fixed label */}
        <div className="flex-shrink-0 px-6 lg:px-10 py-4 flex items-center gap-4 border-r border-white/10 bg-[#0E0E0E] relative z-10">
          <span className="text-[10px] font-semibold tracking-[0.22em] uppercase text-[#8C7355] whitespace-nowrap">
            Shows Served
          </span>
        </div>

        {/* Scrolling marquee */}
        <div className="overflow-hidden flex-1 py-4">
          <div
            className="flex items-center gap-10"
            style={{
              animation: "marquee 38s linear infinite",
              width: "max-content",
            }}
          >
            {doubled.map((show, i) => (
              <span
                key={`${show}-${i}`}
                className="text-[11px] font-medium text-white/35 tracking-[0.06em] whitespace-nowrap"
              >
                {show}
                <span className="inline-block mx-5 w-px h-2.5 bg-white/15 align-middle" />
              </span>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}
