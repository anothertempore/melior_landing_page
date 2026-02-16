const chapterColors = [
  "#B58C65",
  "#6B8F83",
  "#8A7CA4",
  "#9C8A63",
  "#7A93AE",
  "#B08A6D",
];

export function PhoneMockup() {
  return (
    <div className="relative">
      {/* Ambient glow behind phone */}
      <div className="pointer-events-none absolute inset-0 -m-8 rounded-full bg-chapter-highlights/[0.06] blur-[60px]" />

      <div className="relative w-[280px]">
        {/* Phone frame */}
        <div className="rounded-[44px] border border-melior-border/60 bg-melior-bg-light p-4 shadow-card">
          {/* Dynamic Island */}
          <div className="mx-auto mb-3 h-[26px] w-[90px] rounded-full bg-melior-text-primary/90" />

          {/* Screen content */}
          <div className="flex flex-col items-center px-2 py-16">
            {/* Year */}
            <p className="font-serif text-[2.5rem] font-semibold tracking-tight text-melior-text-primary leading-none">
              2025
            </p>

            {/* Tagline */}
            <p className="mt-4 text-[11px] tracking-[0.15em] text-melior-text-tertiary uppercase">
              your year · in your words
            </p>

            {/* Chapter dots */}
            <div className="mt-10 flex gap-2.5">
              {chapterColors.map((color, i) => (
                <div
                  key={i}
                  className="h-[7px] w-[7px] rounded-full animate-breathe"
                  style={{
                    backgroundColor: color,
                    animationDelay: `${i * 0.5}s`,
                  }}
                />
              ))}
            </div>

            {/* Simulated card */}
            <div className="mt-10 w-full rounded-card bg-melior-surface/80 p-5">
              <div className="h-1.5 w-16 rounded-full bg-melior-border/60" />
              <div className="mt-3 h-1.5 w-full rounded-full bg-melior-border/40" />
              <div className="mt-2 h-1.5 w-3/4 rounded-full bg-melior-border/30" />
            </div>
          </div>

          {/* Home indicator */}
          <div className="mx-auto mt-2 h-[5px] w-[120px] rounded-full bg-melior-text-primary/15" />
        </div>
      </div>
    </div>
  );
}
