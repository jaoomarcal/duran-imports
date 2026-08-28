import { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { AnimatePresence, motion } from "framer-motion";
import { Trash2, ShoppingBag, ArrowLeft, X, MessageCircle } from "lucide-react";

import { cn } from "../../lib/utils";
import { store, buildPedidoWhatsApp } from "../../data/store";
import { useCart } from "../../context/CartContext";

const CLIENTE_KEY = "duran:cliente";

function lerCliente() {
  try {
    return JSON.parse(localStorage.getItem(CLIENTE_KEY) || "{}");
  } catch {
    return {};
  }
}

const AREAS = [...store.deliveryAreas, "Outra"];

export default function CartDrawer({ onClose }) {
  const { itens, chave, incrementar, decrementar, remover, limpar } = useCart();
  const [etapa, setEtapa] = useState("pedido");

  const salvo = lerCliente();
  const [nome, setNome] = useState(salvo.nome || "");
  const [area, setArea] = useState(salvo.area || store.deliveryAreas[0]);
  const [endereco, setEndereco] = useState(salvo.endereco || "");
  const [pagamento, setPagamento] = useState(salvo.pagamento || "pix");

  const vazio = itens.length === 0;
  const podeEnviar = nome.trim().length > 1 && endereco.trim().length > 4;
  const naEtapaDados = etapa === "dados" && !vazio;

  function finalizar() {
    const dados = { nome, area, endereco, pagamento };
    try {
      localStorage.setItem(CLIENTE_KEY, JSON.stringify(dados));
    } catch {
      /* storage indisponível */
    }
    const link = buildPedidoWhatsApp(
      itens.map((i) => ({
        nome: i.nome,
        sabor: i.sabor,
        quantidade: i.quantidade,
      })),
      dados
    );
    if (link) {
      window.open(link, "_blank", "noopener,noreferrer");
      limpar();
      onClose();
    }
  }

  return (
    <>
      <button
        onClick={onClose}
        className="absolute right-3 top-3 z-10 rounded-full p-2 text-onyx/50 transition hover:bg-black/5 hover:text-onyx"
        aria-label="Fechar pedido"
      >
        <X size={20} />
      </button>

      <div className="border-b border-black/10 px-5 py-4 pr-14">
        <Dialog.Title className="flex items-center gap-2 font-[var(--font-display)] text-lg uppercase tracking-wide text-onyx">
          {naEtapaDados ? (
            <>
              <button
                onClick={() => setEtapa("pedido")}
                className="rounded-md p-1 text-onyx/50 transition hover:bg-black/5"
                aria-label="Voltar ao pedido"
              >
                <ArrowLeft size={20} />
              </button>
              Seus dados
            </>
          ) : (
            <>
              <ShoppingBag size={20} className="text-gold-dark" />
              Seu pedido
            </>
          )}
        </Dialog.Title>
        <Dialog.Description className="mt-0.5 text-sm text-onyx/55">
          {vazio
            ? "Nenhum item ainda."
            : naEtapaDados
              ? "Para enviar o pedido pelo WhatsApp."
              : `${itens.length} ${itens.length === 1 ? "item" : "itens"} — sem valores, você recebe o orçamento no WhatsApp.`}
        </Dialog.Description>
      </div>

      <div className="flex-1 overflow-y-auto px-5 py-4">
        {vazio ? (
          <div className="flex flex-col items-center gap-3 py-16 text-center text-onyx/50">
            <ShoppingBag size={40} strokeWidth={1.4} className="text-gold/60" />
            <p className="text-sm">Adicione produtos para montar seu pedido.</p>
          </div>
        ) : naEtapaDados ? (
          <DadosCliente
            nome={nome}
            setNome={setNome}
            area={area}
            setArea={setArea}
            endereco={endereco}
            setEndereco={setEndereco}
            pagamento={pagamento}
            setPagamento={setPagamento}
          />
        ) : (
          <ul className="space-y-3">
            <AnimatePresence initial={false}>
              {itens.map((item) => {
                const k = chave(item.id, item.sabor);
                return (
                  <motion.li
                    key={k}
                    layout
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, x: 40 }}
                    transition={{ duration: 0.25 }}
                    className="flex gap-3 rounded-xl border border-black/10 bg-cream p-3"
                  >
                    <img
                      src={item.imagem || "/favicon.jpg"}
                      alt={item.nome}
                      className="h-16 w-16 shrink-0 rounded-lg bg-white object-contain p-1"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="line-clamp-2 text-sm font-semibold text-onyx">
                        {item.nome}
                      </p>
                      {item.sabor && (
                        <p className="text-xs text-onyx/55">{item.sabor}</p>
                      )}
                      <div className="mt-2 flex items-center gap-2">
                        <div className="flex items-center rounded-md border border-black/15">
                          <button
                            onClick={() => decrementar(k)}
                            className="px-2.5 py-1 text-sm text-onyx/70 hover:bg-black/5"
                            aria-label="Diminuir"
                          >
                            −
                          </button>
                          <span className="w-8 text-center text-sm font-semibold text-onyx">
                            {item.quantidade}
                          </span>
                          <button
                            onClick={() => incrementar(k)}
                            className="px-2.5 py-1 text-sm text-onyx/70 hover:bg-black/5"
                            aria-label="Aumentar"
                          >
                            +
                          </button>
                        </div>
                        <button
                          onClick={() => remover(k)}
                          className="ml-auto rounded-md p-1.5 text-onyx/40 transition hover:bg-black/5 hover:text-onyx"
                          aria-label={`Remover ${item.nome}`}
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </motion.li>
                );
              })}
            </AnimatePresence>
          </ul>
        )}
      </div>

      {!vazio && (
        <div className="mt-auto space-y-2 border-t border-black/10 bg-paper px-5 py-4">
          {naEtapaDados ? (
            <>
              <button
                disabled={!podeEnviar}
                onClick={finalizar}
                className="flex w-full items-center justify-center gap-2 rounded-full bg-onyx py-3 text-sm font-semibold text-cream transition-colors hover:bg-gold hover:text-onyx disabled:cursor-not-allowed disabled:opacity-40"
              >
                <MessageCircle size={17} strokeWidth={2} />
                Enviar pedido no WhatsApp
              </button>
              <button
                onClick={() => setEtapa("pedido")}
                className="w-full rounded-full border border-black/15 py-2.5 text-sm font-semibold text-onyx/70 hover:border-gold hover:text-gold-dark"
              >
                Voltar ao pedido
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => setEtapa("dados")}
                className="w-full rounded-full bg-onyx py-3 text-sm font-semibold text-cream transition-colors hover:bg-gold hover:text-onyx"
              >
                Continuar para os dados
              </button>
              <button
                onClick={onClose}
                className="w-full rounded-full border border-black/15 py-2.5 text-sm font-semibold text-onyx/70 hover:border-gold hover:text-gold-dark"
              >
                Continuar escolhendo
              </button>
            </>
          )}
        </div>
      )}
    </>
  );
}

const campoBase =
  "mt-1 w-full rounded-lg border border-black/15 bg-white px-3 py-2 text-sm text-onyx outline-none focus:border-gold focus:ring-2 focus:ring-gold/30";

function DadosCliente({
  nome,
  setNome,
  area,
  setArea,
  endereco,
  setEndereco,
  pagamento,
  setPagamento,
}) {
  return (
    <div className="space-y-4">
      <label className="block text-sm font-semibold text-onyx">
        Nome
        <input
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          placeholder="Seu nome"
          className={campoBase}
        />
      </label>

      <label className="block text-sm font-semibold text-onyx">
        Área de entrega
        <select
          value={area}
          onChange={(e) => setArea(e.target.value)}
          className={campoBase}
        >
          {AREAS.map((a) => (
            <option key={a} value={a}>
              {a}
            </option>
          ))}
        </select>
      </label>

      <label className="block text-sm font-semibold text-onyx">
        Endereço
        <textarea
          rows={2}
          value={endereco}
          onChange={(e) => setEndereco(e.target.value)}
          placeholder="Rua, número, bairro e ponto de referência"
          className={campoBase}
        />
      </label>

      <div className="text-sm font-semibold text-onyx">
        Forma de pagamento
        <div className="mt-1.5 flex gap-1.5">
          {[
            ["pix", "PIX"],
            ["dinheiro", "Dinheiro"],
            ["cartao", "Cartão"],
          ].map(([valor, rotulo]) => (
            <button
              key={valor}
              type="button"
              onClick={() => setPagamento(valor)}
              className={cn(
                "flex-1 rounded-md border px-2 py-2 text-xs font-semibold transition-colors",
                pagamento === valor
                  ? "border-onyx bg-onyx text-cream"
                  : "border-black/15 bg-white text-onyx/60 hover:border-gold hover:text-gold-dark"
              )}
            >
              {rotulo}
            </button>
          ))}
        </div>
      </div>

      <p className="text-xs text-onyx/50">
        O pedido é combinado e os valores confirmados pelo WhatsApp da loja.
      </p>
    </div>
  );
}
