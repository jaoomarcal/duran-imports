import { MessageCircle } from "lucide-react";
import { store, buildWhatsAppLink } from "../data/store";
import InstagramIcon from "./icons/InstagramIcon";

export default function Footer() {
  return (
    <footer className="bg-onyx text-cream/70 py-10 border-t border-white/5">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="text-center sm:text-left">
          <p className="font-[var(--font-display)] uppercase tracking-[0.15em] text-xl text-gold-gradient font-semibold">
            {store.name}
          </p>
          <p className="text-xs text-cream/45 mt-1">
            Entregas em {store.deliveryAreas.join(" · ")}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <a
            href={store.instagramUrl}
            target="_blank"
            rel="noreferrer"
            aria-label="Instagram"
            className="p-2.5 rounded-full bg-white/5 hover:bg-gold hover:text-onyx transition-colors"
          >
            <InstagramIcon size={18} />
          </a>
          <a
            href={buildWhatsAppLink("dúvida geral sobre a loja")}
            target="_blank"
            rel="noreferrer"
            aria-label="WhatsApp"
            className="p-2.5 rounded-full bg-white/5 hover:bg-gold hover:text-onyx transition-colors"
          >
            <MessageCircle size={18} />
          </a>
        </div>
      </div>

      <p className="text-center text-[11px] text-cream/30 mt-8">
        © {new Date().getFullYear()} {store.name}. Todos os direitos reservados.
      </p>
    </footer>
  );
}
