import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { categories } from "../data/store";
import { useProducts } from "../hooks/useProducts";
import ProductCard from "./ProductCard";
import { ProductGridSkeleton } from "./ProductSkeleton";

export default function Products() {
  const { produtos, loading, erro } = useProducts();
  const [active, setActive] = useState("todos");

  const filtered = useMemo(
    () =>
      active === "todos"
        ? produtos
        : produtos.filter((p) => p.categoria === active),
    [active, produtos]
  );

  return (
    <section id="produtos" className="bg-paper py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-6 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-8 max-w-xl text-center sm:mb-10"
        >
          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-gold-dark">
            Catálogo
          </span>
          <h2 className="mt-2 font-[var(--font-display)] text-3xl uppercase tracking-wide text-onyx sm:text-4xl">
            Nossos Produtos
          </h2>
          <p className="mt-3 text-sm text-onyx/60 sm:text-base">
            Monte seu pedido e finalize pelo WhatsApp — enviamos a lista pronta
            para agilizar seu atendimento.
          </p>
        </motion.div>

        <div className="mb-10 flex flex-wrap items-center justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActive(cat.id)}
              className={`rounded-full border px-5 py-2 text-sm font-semibold transition-colors ${
                active === cat.id
                  ? "border-onyx bg-onyx text-cream"
                  : "border-black/15 bg-transparent text-onyx/70 hover:border-gold hover:text-gold-dark"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {erro && !loading && produtos.length === 0 && (
          <p className="mx-auto max-w-md rounded-xl border border-black/10 bg-cream p-4 text-center text-sm text-onyx/60">
            Não foi possível carregar o catálogo agora. Tente novamente em
            instantes.
          </p>
        )}

        {loading ? (
          <ProductGridSkeleton n={6} />
        ) : (
          <motion.div
            layout
            className="grid grid-cols-2 items-stretch gap-4 sm:gap-6 md:grid-cols-3"
          >
            <AnimatePresence mode="popLayout">
              {filtered.map((product, i) => (
                <ProductCard product={product} index={i} key={product.id} />
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {!loading && !erro && filtered.length === 0 && (
          <p className="text-center text-sm text-onyx/50">
            Nenhum produto nesta categoria por enquanto.
          </p>
        )}
      </div>
    </section>
  );
}
