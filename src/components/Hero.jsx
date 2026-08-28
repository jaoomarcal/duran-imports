import { motion } from "framer-motion";
import { MessageCircle, ArrowDown, Truck } from "lucide-react";
import { store, buildWhatsAppLink } from "../data/store";
import RingMotif from "./RingMotif";

export default function Hero() {
  return (
    <section
      id="topo"
      className="relative overflow-hidden bg-onyx pt-32 pb-20 sm:pt-40 sm:pb-28"
    >
      {/* Banner 3D — textura de fundo */}
      <img
        src="/hero-bg.jpg"
        alt=""
        aria-hidden
        className="absolute inset-0 h-full w-full object-cover object-right"
      />
      {/* Véu escuro para contraste do texto */}
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-b from-onyx/85 via-onyx/70 to-onyx"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(60%_50%_at_25%_35%,rgba(11,11,12,0.75),transparent)]"
      />

      <RingMotif className="absolute -top-24 left-1/2 w-[520px] -translate-x-1/2 opacity-50 sm:w-[720px]" />

      <div className="relative mx-auto flex max-w-6xl flex-col items-center gap-6 px-6 text-center sm:px-8">
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-[11px] font-semibold uppercase tracking-[0.4em] text-silver/80 sm:text-xs"
        >
          Perfumaria &amp; Pods Importados
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-[var(--font-display)] text-5xl font-semibold uppercase leading-none tracking-wide text-gold-gradient sm:text-7xl"
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
          className="max-w-lg text-base text-cream/85 sm:text-lg"
        >
          {store.tagline}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.38 }}
          className="mt-2 flex flex-col items-center gap-3 sm:flex-row"
        >
          <a
            href="#produtos"
            className="inline-flex items-center gap-2 rounded-full bg-gold px-7 py-3 font-semibold text-onyx shadow-lg shadow-black/40 transition-colors hover:bg-gold-light"
          >
            Ver catálogo
          </a>
          <a
            href={buildWhatsAppLink()}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-sm font-semibold text-cream/90 underline decoration-cream/30 underline-offset-4 hover:text-gold"
          >
            <MessageCircle size={16} strokeWidth={2} />
            Falar no WhatsApp
          </a>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mt-2 flex items-center gap-2 text-xs text-silver/70 sm:text-sm"
        >
          <Truck size={15} />
          Entregamos em {store.deliveryAreas.join(" · ")} — Atacado &amp; Varejo
        </motion.p>

        <motion.a
          href="#produtos"
          aria-label="Rolar para os produtos"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 6, 0] }}
          transition={{
            opacity: { delay: 0.9 },
            y: { repeat: Infinity, duration: 1.8 },
          }}
          className="mt-4 text-gold/70"
        >
          <ArrowDown size={22} />
        </motion.a>
      </div>
    </section>
  );
}
