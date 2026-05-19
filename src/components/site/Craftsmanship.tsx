import productShot from "@/assets/product-shot-new.jpg";
import crossSection from "@/assets/cross-section.jpg";
import lifestyleSide from "@/assets/lifestyle-side-new.png";
import { Baby } from "lucide-react";

const specs = [
  { k: "Density", v: "55 kg/m³ visco-elastic memory foam" },
  { k: "Cover", v: "Tencel™ + bamboo charcoal knit, 320 GSM" },
  { k: "Loft zones", v: "Dual — 12cm side lobe / 10cm back lobe" },
  { k: "Surface temp", v: "Regulated 2–4°C cooler than standard foam" },
  { k: "Certifications", v: "CertiPUR-US® and OEKO-TEX® Standard 100" },
  { k: "Made for", v: "Side and back sleepers, 5'2\" – 6'4\"" },
];

export function Craftsmanship() {
  return (
    <section id="craftsmanship" className="bg-background">
      {/* Materials & Specs */}
      <div className="mx-auto max-w-7xl px-5 sm:px-8 py-24 lg:py-32 grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-gold">Craftsmanship</p>
          <h2 className="mt-4 font-display text-4xl sm:text-5xl text-balance text-cocoa">
            Built like furniture. Tuned like an instrument.
          </h2>
          <p className="mt-6 text-muted-foreground leading-relaxed max-w-md">
            Every Sleepcet is pressed, cured and hand-finished in small batches. We obsess over density,
            rebound and breathability so the pillow you sleep on tonight feels the same on night 1,800.
          </p>
          <dl className="mt-10 divide-y divide-border/60 border-y border-border/60">
            {specs.map((s) => (
              <div key={s.k} className="grid grid-cols-[140px_1fr] gap-6 py-4">
                <dt className="text-xs uppercase tracking-[0.14em] text-cocoa/60">{s.k}</dt>
                <dd className="text-sm text-cocoa">{s.v}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="relative">
          <div className="absolute -inset-6 -z-10 blur-3xl opacity-30 gradient-gold rounded-full" />
          <img
            src={productShot}
            alt="Sleepcet pillow detail showing cooling knit cover and contoured foam"
            loading="lazy"
            width={1280}
            height={1280}
            className="rounded-2xl shadow-soft w-full"
          />
        </div>
      </div>

      {/* Anatomy / cross-section */}
      <div className="bg-sand">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 py-24 lg:py-32 grid lg:grid-cols-2 gap-16 items-center">
          <img
            src={crossSection}
            alt="Cross-section of the Sleepcet pillow showing internal layers"
            loading="lazy"
            width={1280}
            height={960}
            className="rounded-2xl shadow-soft w-full order-2 lg:order-1"
          />
          <div className="order-1 lg:order-2">
            <p className="text-xs uppercase tracking-[0.18em] text-cocoa/70">Anatomy</p>
            <h2 className="mt-4 font-display text-4xl sm:text-5xl text-balance text-cocoa">
              A closer look inside.
            </h2>
            <p className="mt-6 text-cocoa/70 leading-relaxed max-w-md">
              The cross-section reveals how the cooling cover, adaptive transition layer and ergonomic core
              work together — distributing weight away from pressure points while keeping your cervical
              spine in a neutral line.
            </p>
            <ul className="mt-8 space-y-4 text-sm text-cocoa/80">
              <li className="flex gap-3"><span className="text-gold font-display">→</span> 1.5cm cooling knit — wicks moisture and disperses heat</li>
              <li className="flex gap-3"><span className="text-gold font-display">→</span> 2cm adaptive transition — softens initial contact</li>
              <li className="flex gap-3"><span className="text-gold font-display">→</span> 7cm ergonomic core — holds cervical curvature all night</li>
              <li className="flex gap-3"><span className="text-gold font-display">→</span> Ventilated base — airflow channels reduce heat retention</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Side-sleeper feature */}
      <div className="mx-auto max-w-7xl px-5 sm:px-8 py-24 lg:py-32 grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-gold">For side sleepers</p>
          <h2 className="mt-4 font-display text-4xl sm:text-5xl text-balance text-cocoa">
            The shoulder, finally respected.
          </h2>
          <p className="mt-6 text-muted-foreground leading-relaxed max-w-md">
            Standard pillows force side sleepers to choose between a sore shoulder or a kinked neck.
            Sleepcet's higher side lobe cradles the head at the exact angle your spine wants — no more
            stacking pillows, no more 3am adjustments.
          </p>
          <div className="mt-10 grid grid-cols-3 gap-6 text-cocoa">
            <div>
              <div className="font-display text-3xl text-gold">92%</div>
              <p className="mt-2 text-xs text-cocoa/60 leading-relaxed">reported less morning stiffness</p>
            </div>
            <div>
              <div className="font-display text-3xl text-gold">2.4×</div>
              <p className="mt-2 text-xs text-cocoa/60 leading-relaxed">fewer night-time position changes</p>
            </div>
            <div>
              <div className="font-display text-3xl text-gold">14d</div>
              <p className="mt-2 text-xs text-cocoa/60 leading-relaxed">average time to feel the difference</p>
            </div>
          </div>
          <div className="mt-8 inline-flex items-center gap-2 rounded-full bg-gold/10 px-4 py-2 text-sm font-medium text-gold border border-gold/20">
            <Baby className="h-4 w-4" />
            Parent Friendly
          </div>
        </div>
        <img
          src={lifestyleSide}
          alt="Side sleeper resting comfortably on Sleepcet pillow"
          loading="lazy"
          width={1280}
          height={1280}
          className="rounded-2xl shadow-soft w-full"
        />
      </div>
    </section>
  );
}
