import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { buildWhatsAppLink } from "../data/store";
import { useCart } from "../context/CartContext";

/**
 * Botão flutuante do WhatsApp. Some quando há itens no pedido — nesse
 * caso quem ocupa o canto é o botão do carrinho (FloatingCart).
 */
export default function FloatingWhatsApp() {
  const { itens } = useCart();
  if (itens.length > 0) return null;

  return (
    <motion.a
      href={buildWhatsAppLink()}
      target="_blank"
      rel="noreferrer"
      aria-label="Falar no WhatsApp"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1, type: "spring", stiffness: 200, damping: 14 }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-5 right-5 z-50 rounded-full bg-gold p-4 text-onyx shadow-xl shadow-black/40 hover:bg-gold-light"
    >
      <MessageCircle size={26} strokeWidth={2} />
    </motion.a>
  );
}
