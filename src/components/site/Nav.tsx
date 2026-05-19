import { Link } from "@tanstack/react-router";
import { CartDrawer } from "./CartDrawer";

export function Nav() {
  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-cream/75 border-b border-border/60">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="h-7 w-7 rounded-full gradient-gold" />
          <span className="font-display text-xl tracking-wide">SLEEPCET</span>
        </Link>
        <nav className="hidden md:flex items-center gap-10 text-sm text-muted-foreground">
          <a href="#science" className="hover:text-foreground transition-colors">Science</a>
          <a href="#benefits" className="hover:text-foreground transition-colors">Benefits</a>
          <a href="#compare" className="hover:text-foreground transition-colors">Compare</a>
          <a href="#faq" className="hover:text-foreground transition-colors">FAQ</a>
        </nav>
        <CartDrawer />
      </div>
    </header>
  );
}
