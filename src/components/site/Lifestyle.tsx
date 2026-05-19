import lifestyleImg from "@/assets/sleep-positions.jpg";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import type { ShopifyProduct } from "@/lib/shopify";

export function Lifestyle({ product }: { product?: ShopifyProduct }) {
  return (
    <section className="relative bg-cocoa text-cream overflow-hidden">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 py-24 lg:py-32 grid lg:grid-cols-2 gap-16 items-center">
        <img src={lifestyleImg} alt="Sleeper resting on Sleepcet pillow" loading="lazy" width={1280} height={1280} className="rounded-2xl shadow-soft" />
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-gold">Recovery sleep</p>
          <h2 className="mt-4 font-display text-4xl sm:text-5xl text-balance">Sleep that resets you.</h2>
          <p className="mt-6 text-cream/70 leading-relaxed max-w-md">
            Built for the people who wake up sore, scroll for solutions, and want one that actually works. Our pillow restores the natural posture your body asks for every night.
          </p>
          {product && (
            <Link to="/product/$handle" params={{ handle: product.node.handle }} className="inline-block mt-10">
              <Button size="lg" className="rounded-full gradient-gold text-cocoa hover:opacity-90 px-8 h-12">
                Shop the Pillow <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
