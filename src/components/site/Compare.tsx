import { Check, X } from "lucide-react";

const rows = [
  ["Cervical alignment support", true, false],
  ["Adaptive memory foam contour", true, false],
  ["Cooling breathable cover", true, false],
  ["Engineered for side & back sleepers", true, false],
  ["Loses shape within months", false, true],
];

export function Compare() {
  return (
    <section id="compare" className="py-24 lg:py-32 bg-background">
      <div className="mx-auto max-w-5xl px-5 sm:px-8">
        <div className="text-center max-w-2xl mx-auto">
          <p className="text-xs uppercase tracking-[0.18em] text-gold">The difference</p>
          <h2 className="mt-4 font-display text-4xl sm:text-5xl text-balance">Not just another pillow.</h2>
        </div>
        <div className="mt-14 overflow-hidden rounded-2xl border border-border bg-cream">
          <div className="grid grid-cols-3 px-6 py-5 text-sm font-medium bg-sand">
            <div className="text-cocoa/70">Feature</div>
            <div className="text-center text-cocoa">Sleepcet</div>
            <div className="text-center text-cocoa/60">Standard pillow</div>
          </div>
          {rows.map(([label, a, b], i) => (
            <div key={i} className="grid grid-cols-3 px-6 py-5 border-t border-border/60 items-center">
              <div className="text-sm">{label as string}</div>
              <div className="flex justify-center">
                {a ? <span className="h-8 w-8 rounded-full gradient-gold flex items-center justify-center"><Check className="h-4 w-4 text-cocoa" /></span>
                   : <span className="h-8 w-8 rounded-full bg-muted flex items-center justify-center"><X className="h-4 w-4 text-muted-foreground" /></span>}
              </div>
              <div className="flex justify-center">
                {b ? <span className="h-8 w-8 rounded-full bg-muted flex items-center justify-center"><Check className="h-4 w-4 text-muted-foreground" /></span>
                   : <span className="h-8 w-8 rounded-full bg-muted flex items-center justify-center"><X className="h-4 w-4 text-muted-foreground" /></span>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
