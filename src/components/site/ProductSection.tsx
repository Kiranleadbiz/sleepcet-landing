import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Loader2, ShieldCheck, Truck, RotateCcw, Star, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/stores/cartStore";
import { toast } from "sonner";
import type { ShopifyProduct } from "@/lib/shopify";

function Skeleton({ className }: { className?: string }) {
  return <div className={`animate-pulse rounded-lg bg-cocoa/10 ${className}`} />;
}

const TRUST = [
  { icon: Truck, label: "Free shipping" },
  { icon: RotateCcw, label: "60-night trial" },
  { icon: ShieldCheck, label: "5-year warranty" },
];

export function ProductSection({ product, isLoading }: { product?: ShopifyProduct; isLoading?: boolean }) {
  const [imgIdx, setImgIdx] = useState(0);
  const [variantIdx, setVariantIdx] = useState(0);
  const addItem = useCartStore((s) => s.addItem);
  const setOpen = useCartStore((s) => s.setOpen);
  const isAdding = useCartStore((s) => s.isLoading);

  if (isLoading) {
    return (
      <section id="product" className="bg-sand">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 py-24 lg:py-32">
          <div className="text-center mb-14">
            <Skeleton className="h-3 w-20 mx-auto" />
            <Skeleton className="h-10 w-64 mx-auto mt-3" />
          </div>
          <div className="grid lg:grid-cols-2 gap-14">
            <Skeleton className="aspect-square rounded-2xl" />
            <div className="space-y-4">
              <Skeleton className="h-5 w-32" />
              <Skeleton className="h-10 w-28" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-14 w-full mt-6 rounded-full" />
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (!product) return null;

  const p = product.node;
  const images = p.images.edges;
  const variants = p.variants.edges;
  const variant = variants[variantIdx]?.node;
  const price = parseFloat(variant?.price.amount ?? p.priceRange.minVariantPrice.amount);
  const currency = variant?.price.currencyCode ?? p.priceRange.minVariantPrice.currencyCode;

  const handleAdd = async () => {
    if (!variant) return;
    await addItem({
      product,
      variantId: variant.id,
      variantTitle: variant.title,
      price: variant.price,
      quantity: 1,
      selectedOptions: variant.selectedOptions ?? [],
    });
    toast.success("Added to cart");
    setOpen(true);
  };

  return (
    <section id="product" className="bg-sand">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 py-24 lg:py-32">
        <div className="text-center mb-14">
          <p className="text-xs uppercase tracking-[0.18em] text-cocoa/60">The Pillow</p>
          <h2 className="mt-3 font-display text-4xl sm:text-5xl text-cocoa">{p.title}</h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-14 items-start">
          {/* Image gallery */}
          <div>
            <div className="aspect-square rounded-2xl overflow-hidden bg-background shadow-soft">
              {images[imgIdx] ? (
                <img
                  src={images[imgIdx].node.url}
                  alt={images[imgIdx].node.altText ?? p.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-muted-foreground text-sm">
                  No image
                </div>
              )}
            </div>
            {images.length > 1 && (
              <div className="mt-4 grid grid-cols-5 gap-3">
                {images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setImgIdx(i)}
                    className={`aspect-square rounded-lg overflow-hidden border-2 transition ${
                      i === imgIdx ? "border-gold" : "border-transparent opacity-50 hover:opacity-80"
                    }`}
                  >
                    <img src={img.node.url} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product details */}
          <div className="flex flex-col">
            {/* Rating */}
            <div className="flex items-center gap-1.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-gold text-gold" />
              ))}
              <span className="ml-1 text-sm text-muted-foreground">4.9 · 2,400+ reviews</span>
            </div>

            {/* Price */}
            <p className="mt-5 font-display text-4xl text-cocoa">
              {currency} {price.toFixed(2)}
            </p>

            {/* Description */}
            {p.description && (
              <p className="mt-5 text-muted-foreground leading-relaxed">{p.description}</p>
            )}

            {/* Variants */}
            {variants.length > 1 && (
              <div className="mt-8">
                <p className="text-xs uppercase tracking-[0.14em] text-cocoa/60 mb-3">Options</p>
                <div className="flex flex-wrap gap-2">
                  {variants.map((v, i) => (
                    <button
                      key={v.node.id}
                      onClick={() => setVariantIdx(i)}
                      disabled={!v.node.availableForSale}
                      className={`px-4 py-2 rounded-full border text-sm transition ${
                        i === variantIdx
                          ? "border-cocoa bg-cocoa text-cream"
                          : "border-border bg-background hover:border-cocoa/40"
                      } disabled:opacity-40`}
                    >
                      {v.node.title}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Add to cart */}
            <Button
              onClick={handleAdd}
              disabled={isAdding || !variant?.availableForSale}
              size="lg"
              className="mt-10 w-full rounded-full bg-cocoa hover:bg-cocoa/90 text-cream h-14 text-base"
            >
              {isAdding ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : variant?.availableForSale ? (
                "Add to Cart"
              ) : (
                "Sold Out"
              )}
            </Button>

            {/* View full product */}
            <Link
              to="/product/$handle"
              params={{ handle: p.handle }}
              className="mt-4 flex items-center justify-center gap-1 text-sm text-muted-foreground hover:text-cocoa transition"
            >
              View full product details <ArrowRight className="h-3.5 w-3.5" />
            </Link>

            {/* Trust badges */}
            <div className="mt-8 grid grid-cols-3 gap-3">
              {TRUST.map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="flex flex-col items-center gap-2 p-4 rounded-xl bg-background text-xs text-center"
                >
                  <Icon className="h-5 w-5 text-gold" />
                  <span className="text-muted-foreground">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
