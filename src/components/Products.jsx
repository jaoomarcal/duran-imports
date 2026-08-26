import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { products, categories } from "../data/store";
import ProductCard from "./ProductCard";

export default function Products() {
  const [active, setActive] = useState("todos");

  const filtered = useMemo(
    () =>
      active === "todos"
        ? products
        : products.filter((p) => p.category === active),
    [active]
  );

  return (
    <section id="produtos" className="bg-paper py-16 sm:py-24">
      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-xl mx-auto mb-8 sm:mb-10"
        >
          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-gold-dark">
            Catálogo
          </span>
          <h2 className="font-[var(--font-display)] uppercase text-3xl sm:text-4xl text-onyx mt-2 tracking-wide">
            Nossos Produtos
          </h2>
          <p className="text-onyx/60 text-sm sm:text-base mt-3">
            Toque em "Peça no WhatsApp" e fale direto com a gente — já
            enviamos o nome do produto para agilizar seu atendimento.
          </p>
        </motion.div>

        <div className="flex items-center justify-center gap-2 mb-10 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActive(cat.id)}
              className={`px-5 py-2 rounded-full text-sm font-semibold border transition-colors ${
                active === cat.id
                  ? "bg-onyx text-cream border-onyx"
                  : "bg-transparent text-onyx/70 border-black/15 hover:border-gold hover:text-gold-dark"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <motion.div
          layout
          className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 items-stretch"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((product, i) => (
              <ProductCard product={product} index={i} key={product.id} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
