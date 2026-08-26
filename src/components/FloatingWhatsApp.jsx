import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { buildWhatsAppLink } from "../data/store";

export default function FloatingWhatsApp() {
  return (
    <motion.a
      href={buildWhatsAppLink("um produto da loja")}
      target="_blank"
      rel="noreferrer"
      aria-label="Falar no WhatsApp"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1, type: "spring", stiffness: 200, damping: 14 }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-5 right-5 z-50 bg-gold hover:bg-gold-light text-onyx rounded-full p-4 shadow-xl shadow-black/40"
    >
      <MessageCircle size={26} strokeWidth={2} />
    </motion.a>
  );
}
