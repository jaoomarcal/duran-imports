import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, MessageCircle, Check } from "lucide-react";

import { cn } from "../lib/utils";
import { rotuloCategoria, buildWhatsAppLink } from "../data/store";
import { useCart } from "../context/CartContext";

export default function ProductCard({ product, index = 0 }) {
  const { adicionar } = useCart();
  const temSabores = Array.isArray(product.sabores) && product.sabores.length > 0;
  const [sabor, setSabor] = useState(temSabores ? product.sabores[0] : null);
  const [adicionado, setAdicionado] = useState(false);

  const esgotado = product.esgotado;

  function onAdd() {
    adicionar(product, sabor);
    setAdicionado(true);
    setTimeout(() => setAdicionado(false), 1400);
  }

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.4, delay: (index % 3) * 0.07 }}
      whileHover={{ y: -6 }}
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-2xl border border-black/5 bg-cream shadow-[0_4px_18px_rgba(0,0,0,0.06)] transition-all duration-300 hover:border-gold/50 hover:shadow-[0_16px_36px_rgba(0,0,0,0.14)]",
        esgotado && "opacity-60"
      )}
    >
      <div className="relative flex aspect-[4/5] shrink-0 items-center justify-center overflow-hidden bg-white p-6">
        <img
          src={product.imagem || "/favicon.jpg"}
          alt={product.nome}
          loading="lazy"
          className={cn(
            "h-full w-full object-contain transition-transform duration-500 ease-out group-hover:scale-[1.06]",
            esgotado && "grayscale"
          )}
        />
        <span className="absolute left-3 top-3 rounded-full bg-gold-light/40 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-widest text-gold-dark">
          {rotuloCategoria[product.categoria] || "Produto"}
        </span>
        {esgotado && (
          <span className="absolute right-3 top-3 rounded-full bg-onyx/85 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-widest text-cream">
            Esgotado
          </span>
        )}
      </div>

      <div className="gold-hairline mx-5 shrink-0" />

      <div className="flex flex-1 flex-col gap-3 p-4 sm:p-5">
        <h3 className="line-clamp-2 min-h-[2.6rem] font-[var(--font-display)] text-base uppercase leading-snug tracking-wide text-onyx sm:min-h-[3.1rem] sm:text-lg">
          {product.nome}
        </h3>

        <p className="text-sm font-semibold text-gold-dark">
          {product.preco != null
            ? new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(product.preco)
            : "Consulte o preço"}
        </p>

        <div className="flex-1">
          {temSabores && (
            <div className="flex flex-col gap-1.5">
              {product.sabores.length > 1 && (
                <span className="text-[10px] font-semibold uppercase tracking-widest text-onyx/40">
                  Escolha o sabor
                </span>
              )}
              <div className="flex max-h-[4.75rem] flex-wrap gap-1.5 overflow-y-auto pr-0.5">
                {product.sabores.map((f) => (
                  <button
                    key={f}
                    type="button"
                    disabled={esgotado}
                    onClick={() => setSabor(f)}
                    aria-pressed={sabor === f}
                    className={cn(
                      "rounded-full border px-2.5 py-1.5 text-[11px] font-medium transition-colors sm:text-xs",
                      sabor === f
                        ? "border-onyx bg-onyx text-cream"
                        : "border-black/15 bg-transparent text-onyx/65 hover:border-gold hover:text-gold-dark"
                    )}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {esgotado ? (
          <span className="mt-auto rounded-full border border-black/15 py-2.5 text-center text-sm font-semibold text-onyx/45">
            Indisponível
          </span>
        ) : (
          <div className="mt-auto flex gap-2">
            <button
              onClick={onAdd}
              className={cn(
                "flex flex-1 items-center justify-center gap-2 rounded-full py-2.5 text-sm font-semibold transition-colors",
                adicionado
                  ? "bg-gold text-onyx"
                  : "bg-onyx text-cream hover:bg-gold hover:text-onyx"
              )}
            >
              {adicionado ? (
                <>
                  <Check size={16} strokeWidth={2.5} /> Adicionado
                </>
              ) : (
                <>
                  <Plus size={16} strokeWidth={2.5} /> Adicionar
                </>
              )}
            </button>
            <a
              href={buildWhatsAppLink(product.nome, sabor)}
              target="_blank"
              rel="noreferrer"
              aria-label={`Perguntar sobre ${product.nome} no WhatsApp`}
              className="grid shrink-0 place-items-center rounded-full border border-black/15 px-3 text-onyx/60 transition-colors hover:border-gold hover:text-gold-dark"
            >
              <MessageCircle size={16} strokeWidth={2} />
            </a>
          </div>
        )}
      </div>
    </motion.article>
  );
}
