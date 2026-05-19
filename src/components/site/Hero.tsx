import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import heroImg from "@/assets/hero-pillow.png";
import { Link } from "@tanstack/react-router";
import type { ShopifyProduct } from "@/lib/shopify";

export function Hero({ product }: { product?: ShopifyProduct }) {
  const handle = product?.node.handle;
  return (
    <section className="relative overflow-hidden bg-[#04102a] text-white">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 grid lg:grid-cols-2 gap-10 items-center min-h-[88vh] py-16 lg:py-24">
        <div className="fade-up max-w-xl">
          <div className="inline-flex items-center gap-3 mb-8 text-xs uppercase tracking-[0.22em] text-primary">
            <span className="h-px w-10 bg-primary" />
            Designed for Deep Recovery & Neck Support
          </div>
          <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl leading-[1.02] text-balance">
            Wake Up<br />Recharged,<br /><span className="italic text-primary">Not Tired</span>
          </h1>
          <p className="mt-8 text-white text-lg sm:text-xl max-w-md leading-snug font-medium">
            Better blood flow. Easier breathing. Deep recovery. All night long.
          </p>
          <div className="mt-6 h-px w-16 bg-white/30" />
          <p className="mt-6 text-white/70 text-base max-w-md leading-relaxed">
            Ergonomic cervical support engineered to improve blood circulation, support healthy airflow, reduce fatigue, and provide lasting comfort for active lifestyles and elderly sleepers.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-6">
            {handle ? (
              <Link to="/product/$handle" params={{ handle }}>
                <Button size="lg" className="rounded-full bg-gradient-to-r from-primary to-primary/70 text-white hover:opacity-90 px-10 h-14 text-base shadow-lg shadow-primary/30">
                  Shop Now <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            ) : (
              <Button size="lg" className="rounded-full bg-gradient-to-r from-primary to-primary/70 text-white px-10 h-14 text-base shadow-lg shadow-primary/30">
                Shop Now <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            )}
            <a href="#science" className="inline-flex items-center gap-2 text-white hover:text-primary transition-colors text-base">
              Discover The Science <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
        <div className="relative fade-in">
          <div className="absolute inset-0 -z-10 blur-3xl opacity-30 bg-primary rounded-full" />
          <img src={heroImg} alt="Woman sleeping peacefully on Sleepcet ergonomic cervical pillow" className="w-full h-auto rounded-2xl shadow-soft" width={1280} height={1280} />
        </div>
      </div>
    </section>
  );
}
