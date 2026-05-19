import { Droplets, Moon, Activity, Zap, Bone, UserRound, ShieldCheck, Truck } from "lucide-react";

const items = [
  { icon: Droplets, title: "Better\nBlood Flow", text: "Supports healthy circulation for deep recovery." },
  { icon: Moon, title: "Snoring\nFriendly", text: "Promotes healthy airflow for quieter, restful sleep." },
  { icon: Activity, title: "Fitness\nRecovery", text: "Helps muscles relax and body recover overnight." },
  { icon: Zap, title: "Fatigue\nRemoving", text: "Wake up refreshed, energetic and ready to perform." },
  { icon: Bone, title: "Neck Pain\nRelief", text: "Ergonomic cervical support reduces neck & shoulder pain." },
  { icon: UserRound, title: "Elder\nComfort", text: "Gentle support designed for elderly sleepers." },
];

export function Benefits() {
  return (
    <section id="benefits" className="py-20 lg:py-28 bg-[#04102a] text-white">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-8 lg:gap-6">
          {items.map(({ icon: Icon, title, text }) => (
            <div key={title} className="flex flex-col items-center text-center">
              <div className="h-12 w-12 rounded-full border border-primary/30 bg-primary/5 flex items-center justify-center text-primary">
                <Icon className="h-5 w-5" strokeWidth={1.5} />
              </div>
              <h3 className="mt-4 text-sm font-medium whitespace-pre-line leading-tight">{title}</h3>
              <p className="mt-2 text-[11px] text-white/60 leading-relaxed max-w-[140px]">{text}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 rounded-2xl border border-primary/20 bg-primary/5 px-6 sm:px-10 py-8">
          <div className="grid sm:grid-cols-2 gap-8 sm:gap-4 items-center divide-y sm:divide-y-0 sm:divide-x divide-primary/15">
            <div className="flex items-start gap-4 sm:px-6">
              <ShieldCheck className="h-8 w-8 text-primary shrink-0" strokeWidth={1.5} />
              <div>
                <div className="font-display text-2xl text-primary leading-none">5 Yr<span className="ml-2 text-sm font-sans text-white">Warranty</span></div>
                <p className="mt-2 text-xs text-white/60 leading-relaxed">Long-lasting quality you can trust.</p>
              </div>
            </div>
            <div className="flex items-start gap-4 sm:px-6 pt-8 sm:pt-0">
              <Truck className="h-8 w-8 text-primary shrink-0" strokeWidth={1.5} />
              <div>
                <div className="font-display text-2xl text-primary leading-none">Free<span className="ml-2 text-sm font-sans text-white">Shipping</span></div>
                <p className="mt-2 text-xs text-white/60 leading-relaxed">Delivered fast to your doorstep.</p>
              </div>
            </div>
          </div>
        </div>

        <p className="mt-14 text-center font-display text-2xl sm:text-3xl">
          Better Sleep. Better Health. <span className="text-primary">Better You.</span>
        </p>
      </div>
    </section>
  );
}
