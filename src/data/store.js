// ============================================================
//  CONFIGURAÇÃO DA LOJA — edite os valores abaixo à vontade.
//  Os PRODUTOS agora ficam no banco (Supabase) e são gerenciados
//  pelo painel em /painel. Veja supabase/schema.sql.
// ============================================================

export const store = {
  name: "Duran Imports",
  tagline: "A melhor importação você encontra aqui",
  whatsapp: "5517991409334", // apenas números, com DDI+DDD
  instagram: "duranimports01",
  instagramUrl: "https://www.instagram.com/duranimports01",
  deliveryAreas: ["Araçatuba", "Auriflama", "Região"],
};

// Filtro de categorias da vitrine. O "id" precisa bater com a coluna
// "categoria" do banco ("perfumes" | "pods" | "liquidos").
export const categories = [
  { id: "todos", label: "Todos" },
  { id: "perfumes", label: "Perfumes" },
  { id: "pods", label: "Pods" },
  { id: "liquidos", label: "Líquidos" },
];

export const rotuloCategoria = {
  perfumes: "Perfume",
  pods: "Pod",
  liquidos: "Líquido",
};

function linkWhats(message) {
  return `https://wa.me/${store.whatsapp}?text=${encodeURIComponent(message)}`;
}

// Link direto do WhatsApp para um produto (usado no card e no ícone rápido).
export function buildWhatsAppLink(produto, flavor) {
  if (!produto) {
    return linkWhats(
      `Olá! Vim pelo site da ${store.name} e gostaria de mais informações sobre os produtos. Obrigado(a)!`
    );
  }
  const label = flavor ? `${produto} (sabor: ${flavor})` : produto;
  return linkWhats(
    `Olá! Vim pelo site da ${store.name} e tenho interesse em "${label}". ` +
      `Poderiam me passar disponibilidade e valor? Obrigado(a)!`
  );
}

const ROTULO_PAGAMENTO = { pix: "PIX", dinheiro: "Dinheiro", cartao: "Cartão" };

/**
 * Monta a mensagem do pedido (lista de orçamento — sem total) com todos
 * os itens do carrinho + os dados do cliente, e devolve o link do WhatsApp.
 * `itens` = [{ nome, sabor, quantidade }]
 * `dados` = { nome, area, endereco, pagamento }
 */
export function buildPedidoWhatsApp(itens, dados = {}) {
  if (!itens.length) return null;

  const linhas = itens.map((i) => {
    const sabor = i.sabor ? ` — ${i.sabor}` : "";
    return `• ${i.quantidade}x ${i.nome}${sabor}`;
  });

  const entrega = [dados.area, (dados.endereco || "").trim()]
    .filter(Boolean)
    .join(" — ");

  const info = [
    dados.nome ? `*Cliente:* ${dados.nome.trim()}` : null,
    entrega ? `*Entrega:* ${entrega}` : null,
    dados.pagamento
      ? `*Pagamento:* ${ROTULO_PAGAMENTO[dados.pagamento] || dados.pagamento}`
      : null,
  ].filter(Boolean);

  const mensagem = [
    `✨ *NOVO PEDIDO — ${store.name.toUpperCase()}*`,
    "",
    ...linhas,
    "",
    "————————————————",
    ...info,
    "",
    "Poderiam confirmar os valores e a disponibilidade? Obrigado(a)!",
  ].join("\n");

  return `https://wa.me/${store.whatsapp}?text=${encodeURIComponent(mensagem)}`;
}
