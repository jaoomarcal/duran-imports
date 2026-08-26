import { useState } from "react";
import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { buildWhatsAppLink } from "../data/store";

export default function ProductCard({ product, index }) {
  const hasFlavors = Array.isArray(product.flavors) && product.flavors.length > 0;
  const [selectedFlavor, setSelectedFlavor] = useState(
    hasFlavors ? product.flavors[0] : null
  );

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.4, delay: (index % 3) * 0.07 }}
      whileHover={{ y: -6 }}
      className="group relative bg-cream rounded-2xl overflow-hidden border border-black/5 shadow-[0_4px_18px_rgba(0,0,0,0.06)] hover:shadow-[0_16px_36px_rgba(0,0,0,0.14)] hover:border-gold/50 transition-all duration-300 h-full flex flex-col"
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-white flex items-center justify-center p-6 shrink-0">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-contain transition-transform duration-500 ease-out group-hover:scale-[1.06]"
        />
        <span className="absolute top-3 left-3 text-[10px] uppercase tracking-widest font-semibold text-gold-dark bg-gold-light/40 px-2.5 py-1 rounded-full">
          {product.category === "pods"
            ? "Pod"
            : product.category === "liquidos"
            ? "Líquido"
            : "Perfume"}
        </span>
      </div>

      <div className="gold-hairline mx-5 shrink-0" />

      <div className="p-4 sm:p-5 flex flex-col gap-3 flex-1">
        <h3 className="font-[var(--font-display)] text-base sm:text-lg text-onyx leading-snug uppercase tracking-wide line-clamp-2 min-h-[2.6rem] sm:min-h-[3.1rem]">
          {product.name}
        </h3>

        <div className="flex-1">
          {hasFlavors && (
            <div className="flex flex-col gap-1.5">
              {product.flavors.length > 1 && (
                <span className="text-[10px] uppercase tracking-widest text-onyx/40 font-semibold">
                  Escolha o sabor
                </span>
              )}
              <div className="flex flex-wrap gap-1.5 max-h-[4.75rem] overflow-y-auto pr-0.5">
                {product.flavors.map((flavor) => (
                  <button
                    key={flavor}
                    type="button"
                    onClick={() => setSelectedFlavor(flavor)}
                    aria-pressed={selectedFlavor === flavor}
                    className={`text-[11px] sm:text-xs font-medium px-2.5 py-1.5 rounded-full border transition-colors ${
                      selectedFlavor === flavor
                        ? "bg-onyx text-cream border-onyx"
                        : "bg-transparent text-onyx/65 border-black/15 hover:border-gold hover:text-gold-dark"
                    }`}
                  >
                    {flavor}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <a
          href={buildWhatsAppLink(product.name, selectedFlavor)}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center justify-center gap-2 w-full bg-onyx hover:bg-gold hover:text-onyx text-cream text-sm font-semibold py-2.5 rounded-full transition-colors mt-auto"
        >
          <MessageCircle size={16} strokeWidth={2} />
          Peça no WhatsApp
        </a>
      </div>
    </motion.article>
  );
}
