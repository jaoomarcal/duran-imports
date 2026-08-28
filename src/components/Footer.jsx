import { MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";
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
            href={buildWhatsAppLink()}
            target="_blank"
            rel="noreferrer"
            aria-label="WhatsApp"
            className="p-2.5 rounded-full bg-white/5 hover:bg-gold hover:text-onyx transition-colors"
          >
            <MessageCircle size={18} />
          </a>
        </div>
      </div>

      <p className="mt-8 flex items-center justify-center gap-1.5 text-center text-[11px] text-cream/30">
        <span>
          © {new Date().getFullYear()} {store.name}. Todos os direitos
          reservados.
        </span>
        <span aria-hidden>·</span>
        <Link
          to="/painel"
          aria-label="Área restrita (painel do dono)"
          className="-m-2 inline-flex items-center p-2 text-sm leading-none text-cream/25 transition-colors hover:text-gold"
        >
          •
        </Link>
      </p>
    </footer>
  );
}
