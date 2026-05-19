import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [
  { q: "Is this pillow right for side and back sleepers?", a: "Yes. The contoured geometry is specifically engineered for both, with a higher lobe to support side sleeping and a lower lobe for back sleepers." },
  { q: "How long until I notice a difference?", a: "Most sleepers report improved alignment within the first 7–14 nights as the foam adapts to your contours and your body adjusts to neutral posture." },
  { q: "What is the 60-night trial?", a: "Sleep on it for 60 nights. If it isn't right for you, return it for a full refund — no questions asked." },
  { q: "How do I care for it?", a: "The cooling cover is removable and machine washable. The memory foam core should be spot cleaned and air dried." },
  { q: "Is shipping free?", a: "Yes — free shipping on every order, with carbon-neutral delivery." },
];

export function FAQ() {
  return (
    <section id="faq" className="py-24 lg:py-32 bg-cream">
      <div className="mx-auto max-w-3xl px-5 sm:px-8">
        <div className="text-center">
          <p className="text-xs uppercase tracking-[0.18em] text-gold">Questions</p>
          <h2 className="mt-4 font-display text-4xl sm:text-5xl text-balance">Everything you'd ask before buying.</h2>
        </div>
        <Accordion type="single" collapsible className="mt-12">
          {faqs.map((f, i) => (
            <AccordionItem key={i} value={`f${i}`} className="border-border/60">
              <AccordionTrigger className="text-left text-base hover:no-underline py-6">{f.q}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed">{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
