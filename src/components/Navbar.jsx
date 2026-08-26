import { useEffect, useState } from "react";
import { MessageCircle } from "lucide-react";
import { store, buildWhatsAppLink } from "../data/store";
import InstagramIcon from "./icons/InstagramIcon";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-onyx/95 backdrop-blur-md shadow-[0_2px_24px_rgba(0,0,0,0.4)]"
          : "bg-gradient-to-b from-onyx/80 to-transparent"
      }`}
    >
      <nav className="max-w-6xl mx-auto flex items-center justify-between px-5 sm:px-8 py-3.5">
        <a
          href="#topo"
          className="font-[var(--font-display)] uppercase tracking-[0.15em] text-xl text-gold-gradient font-semibold"
        >
          {store.name}
        </a>

        <div className="flex items-center gap-3">
          <a
            href={store.instagramUrl}
            target="_blank"
            rel="noreferrer"
            aria-label="Instagram da Duran Imports"
            className="p-2 rounded-full text-cream/90 hover:text-gold hover:bg-white/5 transition-colors"
          >
            <InstagramIcon size={19} />
          </a>
          <a
            href={buildWhatsAppLink("dúvida geral sobre a loja")}
            target="_blank"
            rel="noreferrer"
            className="hidden sm:inline-flex items-center gap-2 border border-gold/60 hover:border-gold hover:bg-gold hover:text-onyx text-gold text-sm font-semibold px-4 py-2 rounded-full transition-colors"
          >
            <MessageCircle size={16} strokeWidth={2} />
            Peça no WhatsApp
          </a>
        </div>
      </nav>
    </header>
  );
}
