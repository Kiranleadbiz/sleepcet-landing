import airwayClosed from "@/assets/airway-closed.jpg";
import airwayOpen from "@/assets/airway-open.jpg";

export function Science() {
  return (
    <section id="science" className="py-24 lg:py-32 bg-sand">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 grid lg:grid-cols-2 gap-16 items-center">
        <div className="space-y-5">
          <img src={airwayClosed} alt="Standard pillow closes the airway, restricting breathing" loading="lazy" width={1254} height={627} className="rounded-2xl shadow-soft w-full" />
          <img src={airwayOpen} alt="Sleepcet opens the airway for easier breathing" loading="lazy" width={1254} height={627} className="rounded-2xl shadow-soft w-full" />
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-cocoa/70">Sleep technology</p>
          <h2 className="mt-4 font-display text-4xl sm:text-5xl text-cocoa text-balance">Three layers. One result: alignment.</h2>
          <div className="mt-10 space-y-6">
            {[
              { n: "01", t: "Cooling Knit Cover", d: "Breathable, moisture-wicking weave keeps surface temperature regulated." },
              { n: "02", t: "Adaptive Memory Foam", d: "Pressure-responsive layer molds to head, neck and shoulder geometry." },
              { n: "03", t: "Ergonomic Core", d: "Contoured base maintains cervical curvature for side and back sleepers." },
            ].map(s => (
              <div key={s.n} className="flex gap-6 pb-6 border-b border-cocoa/10 last:border-0">
                <span className="font-display text-3xl text-gold">{s.n}</span>
                <div>
                  <h3 className="text-lg text-cocoa">{s.t}</h3>
                  <p className="mt-1 text-sm text-cocoa/70 leading-relaxed">{s.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
