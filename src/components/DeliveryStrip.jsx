import { motion } from "framer-motion";
import { Truck, ShieldCheck, PackageCheck } from "lucide-react";
import { store } from "../data/store";

const items = [
  {
    icon: Truck,
    title: "Entrega rápida",
    text: `Atendemos ${store.deliveryAreas.join(", ")}`,
  },
  {
    icon: PackageCheck,
    title: "Atacado & Varejo",
    text: "Compre uma unidade ou feche pedidos maiores",
  },
  {
    icon: ShieldCheck,
    title: "Produtos originais",
    text: "Importação com garantia e procedência",
  },
];

export default function DeliveryStrip() {
  return (
    <section className="relative bg-onyx py-14 sm:py-16">
      <div className="gold-hairline absolute top-0 inset-x-0" />
      <div className="max-w-6xl mx-auto px-6 sm:px-8 grid sm:grid-cols-3 gap-8 sm:gap-6">
        {items.map((item, i) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="flex flex-col items-center text-center gap-3"
          >
            <div className="p-3 rounded-full border border-gold/40 text-gold">
              <item.icon size={22} strokeWidth={1.8} />
            </div>
            <h3 className="font-[var(--font-display)] uppercase tracking-wide text-cream text-sm sm:text-base">
              {item.title}
            </h3>
            <p className="text-cream/55 text-xs sm:text-sm max-w-[220px]">
              {item.text}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
