import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from "react";
import { toast } from "sonner";
import { chaveItem as chave } from "../lib/utils";

/**
 * Item do carrinho: { id, nome, sabor, imagem, quantidade }
 * A "chave" de um item é id + sabor (mesmo produto em sabores diferentes
 * = linhas diferentes). Como não há preço, o carrinho é uma lista de
 * orçamento: o cliente monta o pedido e finaliza no WhatsApp.
 */
const CartContext = createContext(null);
const STORAGE_KEY = "duran:carrinho";

function reducer(state, action) {
  switch (action.type) {
    case "ADD": {
      const { produto, sabor } = action;
      const k = chave(produto.id, sabor);
      const existe = state.find((i) => chave(i.id, i.sabor) === k);
      if (existe) {
        return state.map((i) =>
          chave(i.id, i.sabor) === k
            ? { ...i, quantidade: i.quantidade + 1 }
            : i
        );
      }
      return [
        ...state,
        {
          id: produto.id,
          nome: produto.nome,
          sabor: sabor || null,
          imagem: produto.imagem,
          quantidade: 1,
        },
      ];
    }
    case "INC":
      return state.map((i) =>
        chave(i.id, i.sabor) === action.k
          ? { ...i, quantidade: i.quantidade + 1 }
          : i
      );
    case "DEC":
      return state
        .map((i) =>
          chave(i.id, i.sabor) === action.k
            ? { ...i, quantidade: i.quantidade - 1 }
            : i
        )
        .filter((i) => i.quantidade > 0);
    case "REMOVE":
      return state.filter((i) => chave(i.id, i.sabor) !== action.k);
    case "CLEAR":
      return [];
    case "HYDRATE":
      return action.payload;
    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [itens, dispatch] = useReducer(reducer, []);

  useEffect(() => {
    try {
      const salvo = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
      if (Array.isArray(salvo) && salvo.length) {
        dispatch({ type: "HYDRATE", payload: salvo });
      }
    } catch {
      /* ignora carrinho corrompido */
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(itens));
    } catch {
      /* storage indisponível */
    }
  }, [itens]);

  const value = useMemo(() => {
    const quantidadeTotal = itens.reduce((acc, i) => acc + i.quantidade, 0);
    return {
      itens,
      quantidadeTotal,
      chave,
      adicionar: (produto, sabor) => {
        dispatch({ type: "ADD", produto, sabor });
        toast.success("Adicionado ao pedido", {
          description: sabor ? `${produto.nome} — ${sabor}` : produto.nome,
        });
      },
      incrementar: (k) => dispatch({ type: "INC", k }),
      decrementar: (k) => dispatch({ type: "DEC", k }),
      remover: (k) => dispatch({ type: "REMOVE", k }),
      limpar: () => dispatch({ type: "CLEAR" }),
    };
  }, [itens]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart precisa estar dentro de <CartProvider>");
  return ctx;
}
