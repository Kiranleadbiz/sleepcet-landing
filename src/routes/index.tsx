import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { Hero } from "@/components/site/Hero";
import { Benefits } from "@/components/site/Benefits";
import { Science } from "@/components/site/Science";
import { Compare } from "@/components/site/Compare";
import { Craftsmanship } from "@/components/site/Craftsmanship";
import { Lifestyle } from "@/components/site/Lifestyle";
import { ProductSection } from "@/components/site/ProductSection";
import { FAQ } from "@/components/site/FAQ";
import { CTA } from "@/components/site/CTA";
import { Footer } from "@/components/site/Footer";
import { useProducts } from "@/hooks/useProducts";
import { useCartSync } from "@/hooks/useCartSync";

export const Route = createFileRoute("/")({ component: Index });

function Index() {
  useCartSync();
  const { data: products, isLoading } = useProducts();
  const product = products?.[0];
  return (
    <div className="min-h-screen bg-background">
      <Nav />
      <Hero product={product} />
      <Benefits />
      <Science />
      <Compare />
      <Craftsmanship />
      <Lifestyle product={product} />
      <ProductSection product={product} isLoading={isLoading} />
      <FAQ />
      <CTA product={product} />
      <Footer />
    </div>
  );
}
