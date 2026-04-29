'use client';

interface Props {
  leftContent: React.ReactNode;
  children: React.ReactNode;
}

export function AuthSplitLayout({ leftContent, children }: Props) {
  return (
    <section className="flex flex-1">
      {/* Left decorative panel */}
      <div className="relative hidden flex-col justify-between overflow-hidden bg-linen px-12 py-14 dark:bg-linen md:flex md:w-[44%] lg:w-[46%]">
        {/* Dot pattern */}
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle,#8b5e52_1px,transparent_1px)] bg-size-[28px_28px] opacity-[0.06] dark:opacity-[0.04]"
          aria-hidden="true"
        />

        {/* Crochet mandala */}
        <div
          className="pointer-events-none absolute right-0 bottom-0 translate-x-1/3 translate-y-1/3 opacity-[0.12] dark:opacity-[0.07]"
          aria-hidden="true"
        >
          <svg viewBox="0 0 400 400" width="480" height="480" fill="none" aria-hidden="true">
            <circle cx="200" cy="200" r="190" stroke="#c1644f" strokeWidth="1.5" />
            <circle cx="200" cy="200" r="148" stroke="#c1644f" strokeWidth="1" />
            <circle cx="200" cy="200" r="106" stroke="#c1644f" strokeWidth="1" />
            <circle cx="200" cy="200" r="64" stroke="#c1644f" strokeWidth="1" />
            {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => {
              const rad = (deg * Math.PI) / 180;
              return (
                <line
                  key={deg}
                  x1={200 + 12 * Math.cos(rad)}
                  y1={200 + 12 * Math.sin(rad)}
                  x2={200 + 190 * Math.cos(rad)}
                  y2={200 + 190 * Math.sin(rad)}
                  stroke="#c1644f"
                  strokeWidth="0.8"
                />
              );
            })}
            <circle cx="200" cy="200" r="12" stroke="#c1644f" strokeWidth="1.5" fill="none" />
          </svg>
        </div>

        {/* Brand mark */}
        <div className="relative z-10">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 240 240"
            width="40"
            height="40"
            aria-hidden="true"
          >
            <g
              fill="none"
              stroke="#8b5e52"
              strokeWidth="14"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <ellipse cx="80" cy="70" rx="34" ry="22" transform="rotate(-22 80 70)" />
              <ellipse cx="120" cy="120" rx="34" ry="22" />
              <ellipse cx="160" cy="170" rx="34" ry="22" transform="rotate(-22 160 170)" />
            </g>
            <circle cx="190" cy="190" r="9" fill="#c1644f" />
          </svg>
          <p className="mt-2 font-ui text-mocha text-xs uppercase tracking-[0.18em]">Stitchery</p>
        </div>

        {/* Variable content */}
        <div className="relative z-10 max-w-85">{leftContent}</div>

        {/* Footer */}
        <p className="relative z-10 font-ui text-warm-gray text-xs">
          © {new Date().getFullYear()} Stitchery — Kathmandu, Nepal
        </p>
      </div>

      {/* Right panel */}
      <div className="flex flex-1 flex-col items-center justify-center px-5 py-10 sm:px-10">
        {children}
      </div>
    </section>
  );
}
