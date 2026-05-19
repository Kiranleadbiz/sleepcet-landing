export function Footer() {
  return (
    <footer className="bg-cocoa text-cream/80">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 py-16 grid gap-10 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2">
            <div className="h-7 w-7 rounded-full gradient-gold" />
            <span className="font-display text-xl tracking-wide text-cream">SLEEPCET</span>
          </div>
          <p className="mt-4 max-w-sm text-sm">Ergonomic sleep technology designed by clinicians, refined by sleepers. Better mornings, by design.</p>
        </div>
        <div>
          <h4 className="text-cream text-sm mb-4">Shop</h4>
          <ul className="space-y-2 text-sm">
            <li>The Cervical Pillow</li>
            <li>Pillowcases</li>
            <li>Care Guide</li>
          </ul>
        </div>
        <div>
          <h4 className="text-cream text-sm mb-4">Support</h4>
          <ul className="space-y-2 text-sm">
            <li>Shipping & returns</li>
            <li>Contact</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-cream/10 py-6 text-center text-xs text-cream/50">© {new Date().getFullYear()} Sleepcet. All rights reserved.</div>
    </footer>
  );
}
