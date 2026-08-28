/** Junta classes condicionais: cn("a", cond && "b", null) -> "a b" */
export function cn(...parts) {
  return parts.filter(Boolean).join(" ");
}

/** Chave única de um item do carrinho: produto + sabor escolhido */
export function chaveItem(id, sabor) {
  return `${id}__${sabor || ""}`;
}
