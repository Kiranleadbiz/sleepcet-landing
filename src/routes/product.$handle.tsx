import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import { useState } from "react";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Loader2, ShieldCheck, Truck, ArrowLeft } from "lucide-react";
import { useProductByHandle } from "@/hooks/useProducts";
import { useCartStore } from "@/stores/cartStore";
import { useCartSync } from "@/hooks/useCartSync";
import { toast } from "sonner";

export const Route = createFileRoute("/product/$handle")({ component: ProductPage });

function ProductPage() {
  useCartSync();
  const { handle } = useParams({ from: "/product/$handle" });
  const { data: product, isLoading } = useProductByHandle(handle);
  const [imgIdx, setImgIdx] = useState(0);
  const [variantIdx, setVariantIdx] = useState(0);
  const addItem = useCartStore(s => s.addItem);
  const setOpen = useCartStore(s => s.setOpen);
  const isAdding = useCartStore(s => s.isLoading);

  if (isLoading) return (
    <div className="min-h-screen flex items-center justify-center bg-cream"><Loader2 className="h-6 w-6 animate-spin" /></div>
  );
  if (!product) return (
    <div className="min-h-screen bg-cream">
      <Nav />
      <div className="mx-auto max-w-3xl py-32 px-6 text-center">
        <h1 className="font-display text-4xl">Product not found</h1>
        <Link to="/" className="mt-6 inline-block text-gold">Back home</Link>
      </div>
    </div>
  );

  const variant = product.variants.edges[variantIdx]?.node;
  const images = product.images.edges;

  const handleAdd = async () => {
    if (!variant) return;
    await addItem({
      product: { node: product },
      variantId: variant.id,
      variantTitle: variant.title,
      price: variant.price,
      quantity: 1,
      selectedOptions: variant.selectedOptions || [],
    });
    toast.success("Added to cart");
    setOpen(true);
  };

  return (
    <div className="min-h-screen bg-cream">
      <Nav />
      <div className="mx-auto max-w-7xl px-5 sm:px-8 py-10">
        <Link to="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground"><ArrowLeft className="h-4 w-4 mr-1" /> Back</Link>
      </div>
      <section className="mx-auto max-w-7xl px-5 sm:px-8 pb-24 grid lg:grid-cols-2 gap-14">
        <div>
          <div className="aspect-square rounded-2xl overflow-hidden bg-sand shadow-soft">
            {images[imgIdx] && (
              <img src={images[imgIdx].node.url} alt={images[imgIdx].node.altText ?? product.title} className="w-full h-full object-cover" />
            )}
          </div>
          {images.length > 1 && (
            <div className="mt-4 grid grid-cols-5 gap-3">
              {images.map((img, i) => (
                <button key={i} onClick={() => setImgIdx(i)} className={`aspect-square rounded-lg overflow-hidden border-2 transition ${i === imgIdx ? "border-gold" : "border-transparent opacity-60"}`}>
                  <img src={img.node.url} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>
        <div>
          <Badge className="bg-sand text-cocoa border-0">SLEEPCET</Badge>
          <h1 className="mt-4 font-display text-4xl sm:text-5xl text-balance">{product.title}</h1>
          <p className="mt-6 text-3xl font-display text-cocoa">
            {variant?.price.currencyCode} {parseFloat(variant?.price.amount ?? "0").toFixed(2)}
          </p>
          <p className="mt-6 text-muted-foreground leading-relaxed whitespace-pre-line">{product.description}</p>

          {product.variants.edges.length > 1 && (
            <div className="mt-8">
              <p className="text-sm text-muted-foreground mb-3">Options</p>
              <div className="flex flex-wrap gap-2">
                {product.variants.edges.map((v, i) => (
                  <button key={v.node.id} onClick={() => setVariantIdx(i)} disabled={!v.node.availableForSale}
                    className={`px-4 py-2 rounded-full border text-sm transition ${i === variantIdx ? "border-cocoa bg-cocoa text-cream" : "border-border bg-background hover:border-cocoa/40"} disabled:opacity-40`}>
                    {v.node.title}
                  </button>
                ))}
              </div>
            </div>
          )}

          <Button onClick={handleAdd} disabled={isAdding || !variant?.availableForSale} size="lg" className="mt-10 w-full rounded-full bg-cocoa hover:bg-cocoa/90 text-cream h-14 text-base">
            {isAdding ? <Loader2 className="h-5 w-5 animate-spin" /> : variant?.availableForSale ? "Add to Cart" : "Sold Out"}
          </Button>

          <div className="mt-8 grid grid-cols-2 gap-4 text-xs">
            {[
              { i: Truck, t: "Free shipping" },
              { i: ShieldCheck, t: "5-year warranty" },
            ].map(({ i: Icon, t }) => (
              <div key={t} className="flex flex-col items-center gap-2 p-4 rounded-xl bg-background">
                <Icon className="h-5 w-5 text-gold" />
                <span className="text-muted-foreground">{t}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
