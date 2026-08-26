import { motion } from "framer-motion";
import { MessageCircle, ArrowDown, Truck } from "lucide-react";
import { store, buildWhatsAppLink } from "../data/store";
import RingMotif from "./RingMotif";

export default function Hero() {
  return (
    <section
      id="topo"
      className="relative bg-onyx overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-28"
    >
      <RingMotif className="absolute -top-24 left-1/2 -translate-x-1/2 w-[520px] sm:w-[720px] opacity-70" />

      <div className="relative max-w-6xl mx-auto px-6 sm:px-8 flex flex-col items-center text-center gap-6">
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="uppercase tracking-[0.4em] text-[11px] sm:text-xs font-semibold text-silver/80"
        >
          Perfumaria &amp; Pods Importados
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-[var(--font-display)] uppercase font-semibold tracking-wide text-gold-gradient text-5xl sm:text-7xl leading-none"
        >
          {store.name}
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.22 }}
          className="gold-hairline w-40 sm:w-56"
        />

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.28 }}
          className="max-w-lg text-cream/85 text-base sm:text-lg"
        >
          {store.tagline}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.38 }}
          className="flex flex-col sm:flex-row items-center gap-3 mt-2"
        >
          <a
            href={buildWhatsAppLink("um produto da loja")}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 bg-gold hover:bg-gold-light text-onyx font-semibold px-7 py-3 rounded-full shadow-lg shadow-black/40 transition-colors"
          >
            <MessageCircle size={18} strokeWidth={2} />
            Peça agora no WhatsApp
          </a>
          <a
            href="#produtos"
            className="inline-flex items-center gap-2 text-cream/90 hover:text-gold text-sm font-semibold underline underline-offset-4 decoration-cream/30"
          >
            Ver catálogo
          </a>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="flex items-center gap-2 text-xs sm:text-sm text-silver/70 mt-2"
        >
          <Truck size={15} />
          Entregamos em {store.deliveryAreas.join(" · ")} — Atacado &amp; Varejo
        </motion.p>

        <motion.a
          href="#produtos"
          aria-label="Rolar para os produtos"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 6, 0] }}
          transition={{ opacity: { delay: 0.9 }, y: { repeat: Infinity, duration: 1.8 } }}
          className="mt-4 text-gold/70"
        >
          <ArrowDown size={22} />
        </motion.a>
      </div>
    </section>
  );
}
