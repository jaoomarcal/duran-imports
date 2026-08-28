import { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { AnimatePresence, motion } from "framer-motion";
import { ShoppingBag } from "lucide-react";

import { useCart } from "../../context/CartContext";
import CartDrawer from "./CartDrawer";

/**
 * Botão flutuante do pedido (aparece quando há itens) + gaveta lateral.
 * Usa o Dialog do Radix (foco preso, ESC fecha, trava o scroll) com
 * `forceMount` para o Framer Motion controlar entrada e saída.
 */
export default function FloatingCart() {
  const { itens, quantidadeTotal } = useCart();
  const [aberto, setAberto] = useState(false);
  const temItens = itens.length > 0;

  return (
    <Dialog.Root open={aberto} onOpenChange={setAberto}>
      <AnimatePresence>
        {temItens && !aberto && (
          <motion.div
            key="fab"
            initial={{ opacity: 0, y: 80, scale: 0.6 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 80, scale: 0.6 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="fixed bottom-5 right-5 z-50"
          >
            <Dialog.Trigger asChild>
              <motion.button
                whileTap={{ scale: 0.92 }}
                whileHover={{ scale: 1.06 }}
                className="relative grid h-16 w-16 place-items-center rounded-full bg-gold text-onyx shadow-xl shadow-black/40 ring-1 ring-gold-dark/40"
                aria-label={`Abrir pedido, ${quantidadeTotal} ${quantidadeTotal === 1 ? "item" : "itens"}`}
              >
                <ShoppingBag size={24} strokeWidth={2} />
                <motion.span
                  key={quantidadeTotal}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -right-1 -top-1 grid h-6 min-w-6 place-items-center rounded-full bg-onyx px-1 text-xs font-bold text-cream ring-2 ring-gold"
                >
                  {quantidadeTotal}
                </motion.span>
              </motion.button>
            </Dialog.Trigger>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {aberto && (
          <Dialog.Portal forceMount>
            <Dialog.Overlay asChild forceMount>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-0 z-50 bg-onyx/50 backdrop-blur-sm"
              />
            </Dialog.Overlay>

            <Dialog.Content asChild forceMount>
              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", stiffness: 300, damping: 32 }}
                className="fixed inset-y-0 right-0 z-50 flex h-full w-full max-w-md flex-col bg-paper shadow-2xl focus:outline-none"
              >
                <CartDrawer onClose={() => setAberto(false)} />
              </motion.div>
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  );
}
