import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import type { ShopifyProduct } from "@/lib/shopify";

export function CTA({ product }: { product?: ShopifyProduct }) {
  return (
    <section className="bg-background py-24 lg:py-32">
      <div className="mx-auto max-w-4xl px-5 sm:px-8 text-center">
        <h2 className="font-display text-4xl sm:text-6xl text-balance">Tonight is the start of better sleep.</h2>
        <p className="mt-6 text-muted-foreground max-w-xl mx-auto">Join thousands waking up aligned, calm, and ready. Try Sleepcet risk-free for 60 nights.</p>
        {product && (
          <Link to="/product/$handle" params={{ handle: product.node.handle }} className="inline-block mt-10">
            <Button size="lg" className="rounded-full bg-cocoa hover:bg-cocoa/90 text-cream px-10 h-13">
              Shop the Pillow <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        )}
      </div>
    </section>
  );
}
