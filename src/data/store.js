// ============================================================
//  CONFIGURAÇÃO DA LOJA — edite os valores abaixo à vontade.
// ============================================================

import muglerAngel from "../assets/products/perfumes/mugler-angel-body-lotion.png";
import arinaAjyad from "../assets/products/perfumes/arina-ajyad.png";
import asadLattafa from "../assets/products/perfumes/asad-lattafa.jpeg";
import asadBourbon from "../assets/products/perfumes/asad-bourbon-lattafa.jpg";
import atheeriLattafa from "../assets/products/perfumes/atheeri-lattafa.jpg";
import fakharLattafa from "../assets/products/perfumes/fakhar-lattafa.jpg";
import haussmannBoulevard from "../assets/products/perfumes/haussmann-boulevard.jpg";
import clubDeNuitIconic from "../assets/products/perfumes/club-de-nuit-iconic.jpg";
import invictusVictory from "../assets/products/perfumes/invictus-victory.jpg";
import laVieEstBelle from "../assets/products/perfumes/la-vie-est-belle.png";
import musamamWhite from "../assets/products/perfumes/musamam-white-intense.png";
import musamamBlack from "../assets/products/perfumes/musamam-black-intense.jpg";
import phantomPacoRabanne from "../assets/products/perfumes/phantom-paco-rabanne.jpeg";
import portRoyalBoulevard from "../assets/products/perfumes/port-royal-boulevard.png";
import r2b2SpaceX from "../assets/products/perfumes/r2b2-space-x.jpg";
import vanillaCaramelAjyad from "../assets/products/perfumes/vanilla-caramel-ajyad.jpeg";
import yaraCandy from "../assets/products/perfumes/yara-candy-lattafa.jpeg";

import blackSheep40k from "../assets/products/pods/black-sheep-40k.png";
import blackSheepCartridge15k from "../assets/products/pods/black-sheep-cartridge-15k.webp";
import elfbarDuke from "../assets/products/pods/elfbar-duke.jpg";
import elfbarIceKing from "../assets/products/pods/elfbar-ice-king.jpg";
import elfbarTe30k from "../assets/products/pods/elfbar-te30k.jpg";
import elfbarTrio from "../assets/products/pods/elfbar-trio.png";
import igniteFrozen from "../assets/products/pods/ignite-frozen.png";
import igniteIce from "../assets/products/pods/ignite-ice.jpg";
import igniteMix from "../assets/products/pods/ignite-mix.png";
import igniteV30 from "../assets/products/pods/ignite-v30.jpg";
import igniteV55 from "../assets/products/pods/ignite-v55.png";
import igniteBlueberryIce from "../assets/products/pods/ignite-blueberry-ice.jpg";
import igniteV50Special from "../assets/products/pods/ignite-v50-special.jpg";
import lifePodOne from "../assets/products/pods/life-pod-one.png";
import igniteV80 from "../assets/products/pods/ignite-v80.png";
import wakaIcon50k from "../assets/products/pods/waka-icon-50k.png";
import igniteV500 from "../assets/products/pods/ignite-v500.jpeg";

import mrFreezePureIce from "../assets/products/liquidos/mr-freeze-pure-ice.jpg";
import blvkMintSpearmint from "../assets/products/liquidos/blvk-mint-spearmint.png";
import blvkFruitIceLychee from "../assets/products/liquidos/blvk-fruit-ice-lychee.jpg";

export const store = {
  name: "Duran Imports",
  tagline: "A melhor importação você encontra aqui",
  whatsapp: "5517991409334", // apenas números, com DDI+DDD
  instagram: "duranimports01",
  instagramUrl: "https://www.instagram.com/duranimports01",
  deliveryAreas: ["Araçatuba", "Auriflama", "Região"],
};

// PREÇOS: troque "price" pelo valor real (em reais) ou deixe null para
// mostrar "Consulte o preço".
//
// SABORES: quando o produto tem mais de um sabor, adicione o campo
// "flavors" (lista de textos). O site mostra os sabores como botões —
// o cliente escolhe um, e o nome do sabor escolhido entra automaticamente
// na mensagem do WhatsApp. Produtos sem "flavors" não mostram seletor.
export const products = [
  // ---------------- PERFUMES ----------------
  {
    id: "mugler-angel",
    name: "Angel Body Lotion — Mugler",
    category: "perfumes",
    price: null,
    image: muglerAngel,
  },
  {
    id: "arina-ajyad",
    name: "Arina — Ajyad",
    category: "perfumes",
    price: null,
    image: arinaAjyad,
  },
  {
    id: "asad-lattafa",
    name: "Asad — Lattafa",
    category: "perfumes",
    price: null,
    image: asadLattafa,
  },
  {
    id: "asad-bourbon",
    name: "Asad Bourbon — Lattafa",
    category: "perfumes",
    price: null,
    image: asadBourbon,
  },
  {
    id: "atheeri-lattafa",
    name: "Atheeri — Lattafa",
    category: "perfumes",
    price: null,
    image: atheeriLattafa,
  },
  {
    id: "fakhar-lattafa",
    name: "Fakhar — Lattafa",
    category: "perfumes",
    price: null,
    image: fakharLattafa,
  },
  {
    id: "haussmann-boulevard",
    name: "Haussmann — Boulevard Paris",
    category: "perfumes",
    price: null,
    image: haussmannBoulevard,
  },
  {
    id: "club-de-nuit-iconic",
    name: "Club de Nuit Iconic — Armaf",
    category: "perfumes",
    price: null,
    image: clubDeNuitIconic,
  },
  {
    id: "invictus-victory",
    name: "Invictus Victory — Paco Rabanne",
    category: "perfumes",
    price: null,
    image: invictusVictory,
  },
  {
    id: "la-vie-est-belle",
    name: "La Vie Est Belle — Lancôme",
    category: "perfumes",
    price: null,
    image: laVieEstBelle,
  },
  {
    id: "musamam-white",
    name: "Musamam White Intense — Lattafa",
    category: "perfumes",
    price: null,
    image: musamamWhite,
  },
  {
    id: "musamam-black",
    name: "Musamam Black Intense — Lattafa",
    category: "perfumes",
    price: null,
    image: musamamBlack,
  },
  {
    id: "phantom-paco-rabanne",
    name: "Phantom — Paco Rabanne",
    category: "perfumes",
    price: null,
    image: phantomPacoRabanne,
  },
  {
    id: "port-royal-boulevard",
    name: "Port Royal — Boulevard Paris",
    category: "perfumes",
    price: null,
    image: portRoyalBoulevard,
  },
  {
    id: "r2b2-space-x",
    name: "R2B2 Space X — Reyane Tradition",
    category: "perfumes",
    price: null,
    image: r2b2SpaceX,
  },
  {
    id: "vanilla-caramel-ajyad",
    name: "Vanilla Caramel — Ajyad",
    category: "perfumes",
    price: null,
    image: vanillaCaramelAjyad,
  },
  {
    id: "yara-candy",
    name: "Yara Candy — Lattafa",
    category: "perfumes",
    price: null,
    image: yaraCandy,
  },

  // ---------------- PODS (1ª leva — 12 de 21) ----------------
  {
    id: "black-sheep-40k",
    name: "The Black Sheep Dual Flavor",
    category: "pods",
    price: null,
    image: blackSheep40k,
    // Combinações reais de sabor (dispositivo tem 2 lados/sabores por unidade)
    flavors: [
      "Cool Mint",
      "Grape / Passion Fruit",
      "Fresh Mint / Mango Orange",
      "Grape / Grape Mango",
      "Grape / Menthol",
      "Blueberry Bubble / Sour Green Apple",
      "Açaí Strawberry / Açaí Grape",
      "Fresh Mint / Passion Fruit",
      "Grape / Strawberry Kiwi",
      "Strawberry Watermelon / Fresh Mint",
      "Miami Mint / Strawberry Kiwi",
    ],
  },
  {
    id: "black-sheep-cartridge-15k",
    name: "The Black Sheep Cartridge 15K",
    category: "pods",
    price: null,
    image: blackSheepCartridge15k,
    flavors: [
      "Grape",
      "Açaí Grape",
      "Energy Drink",
      "Aloe Grape",
      "Miami Mint",
      "Menthol",
      "Passion Fruit",
      "Strawberry Watermelon",
    ],
  },
  {
    id: "elfbar-duke",
    name: "ElfBar Duke",
    category: "pods",
    price: null,
    image: elfbarDuke,
    // ATENÇÃO: os nomes dos sabores não apareciam escritos na foto — coloquei
    // pelas cores só pra você não ficar sem opção. Troque pelos nomes reais.
    flavors: ["Fanta Grape", "Strawberry Kiwi ice", "Peach Mango WaterMelon", "Pineapple Ice"],
  },
  {
    id: "elfbar-ice-king",
    name: "ElfBar Ice King Turbo",
    category: "pods",
    price: null,
    image: elfbarIceKing,
    // ATENÇÃO: mesma observação do ElfBar Duke — ajuste os nomes reais dos sabores.
    flavors: ["Havaian Slush", "WildBerry", "Passion Flash"],
  },
  {
    id: "elfbar-te30k",
    name: "ElfBar TE30K",
    category: "pods",
    price: null,
    image: elfbarTe30k,
    flavors: ["Winter Mint", "Bubaloo Grape", "Bobaloo TutiFruit", "Elf Love", "Strawberry Ice"],
  },
  {
    id: "elfbar-trio",
    name: "ElfBar Trio Turbo",
    category: "pods",
    price: null,
    image: elfbarTrio,
    flavors: ["Raspberry Watermelon", "Blue Razz Ice", "Pineapple Lime"],
  },
  {
    id: "ignite-frozen",
    name: "Ignite Frozen",
    category: "pods",
    price: null,
    image: igniteFrozen,
    flavors: ["Icy Mint", "Strawberry Banana", "Pineapple Ice"],
  },
  {
    id: "ignite-ice",
    name: "Ignite Ice",
    category: "pods",
    price: null,
    image: igniteIce,
    flavors: ["Strawberry", "Menthol", "PineApple kiwi"],
  },
  {
    id: "ignite-mix",
    name: "Ignite Mix (sabor duplo)",
    category: "pods",
    price: null,
    image: igniteMix,
    flavors: [
      "WaterMelon Grape Ice / Acai Ice",
      "Ice Mint / Peach Grape",
      "Grape Ice / Watermelon Ice",
      "Might Melon / Menthol"
    ],
  },
  {
    id: "ignite-v30",
    name: "Ignite V300",
    category: "pods",
    price: null,
    image: igniteV30,
    flavors:["Banana Coconut Ice", "Pineapple Ice"],
  },
  {
    id: "ignite-v55",
    name: "Ignite V55 Ultra Thin",
    category: "pods",
    price: null,
    image: igniteV55,
  },
  {
    id: "ignite-blueberry-ice",
    name: "Ignite V155",
    category: "pods",
    price: null,
    image: igniteBlueberryIce,
    flavors: ["Menthol", "Kiwi Passion", "Green Apple", "Strawberry W. ice", "Banana Ice", "Watermelon Ice", "Strawberry Banana", "Tropical Acai"],
  },
  {
    id: "ignite-v50-special",
    name: "Ignite V50 Special Edition — 5000 Puffs",
    category: "pods",
    price: null,
    image: igniteV50Special,
    flavors: ["Strawberry Banana"],
  },

  // ---------------- PODS (2ª leva) ----------------
  {
    id: "life-pod-one",
    name: "Life Pod One 40K",
    category: "pods",
    price: null,
    image: lifePodOne,
    // Sabores confirmados na linha oficial Life Pod One 40K
    flavors: [
      "Passion Mango",
      "Watermelon Bubblegum",
      "Strawberry Bubblegum",
      "Love 66 (Maracujá + Melão Ice)",
      "Bluerazz Bubblegum",
      "Miami Mint",
      "Grape Ice",
    ],
  },
  {
    id: "ignite-v80",
    name: "Ignite V80 — 8000 Puffs (Black Edition)",
    category: "pods",
    price: null,
    image: igniteV80,
    // "Blueberry Lemon" é o sabor da foto; os demais são o restante da linha oficial V80
    flavors: [
      "Blueberry Lemon",
      "Banana Ice",
      "Blueberry Ice",
      "Grape Fruit Mint",
      "Icy Mint",
      "Menthol",
      "Strawberry Kiwi",
      "Watermelon Ice",
    ],
  },
  {
    id: "waka-icon-50k",
    name: "Waka Icon 50K",
    category: "pods",
    price: null,
    image: wakaIcon50k,
    // Lista oficial de sabores do Waka Icon 50K
    flavors: [
      "Watermelon Ice",
      "Blueberry Mint",
      "Fresh Mint",
      "Cool Mint",
      "Cherry Watermelon",
      "Grape Strawberry",
      "Peach Mango Watermelon",
      "Kiwi Dragon Berry",
      "Strawberry Kiwi",
      "Strawberry Guava",
    ],
  },
  {
    id: "ignite-v500",
    name: "Ignite V500",
    category: "pods",
    price: null,
    image: igniteV500,
    flavors: [
      "Kiwi Acai",
      "Pineapple Ice",
      "Grape Ice",
      "Green Apple",
      "Strawberry Ice",
      "Cool Menthol",
    ],
  },

  // ---------------- LÍQUIDOS / SAIS DE NICOTINA ----------------
  {
    id: "mr-freeze-pure-ice",
    name: "Mr. Freeze Menthol 100ml",
    category: "liquidos",
    price: null,
    image: mrFreezePureIce,
    // "Pure Ice" é o sabor da foto; os demais são o restante da linha oficial Mr. Freeze
    flavors: [
      "Pure Ice",
      "Grape Frost",
      "Blue Razz Frost",
      "Strawberry Banana Frost",
      "Peach Frost",
      "Watermelon Frost",
      "Spearmint Frost",
      "Apple Frost",
    ],
  },
  {
    id: "blvk-mint",
    name: "BLVK Mint — Nicotine Salt 30ml",
    category: "liquidos",
    price: null,
    image: blvkMintSpearmint,
    flavors: ["Original Spearmint", "Double Spearmint", "Melon Spearmint"],
  },
  {
    id: "blvk-fruit-ice",
    name: "BLVK Fruit Ice — Nicotine Salt 30ml",
    category: "liquidos",
    price: null,
    image: blvkFruitIceLychee,
    // ATENÇÃO: "Sweet Lychee" é o sabor confirmado na foto. Os demais sabores
    // dessa linha variam bastante entre fornecedores — confirme com seu
    // distribuidor antes de divulgar outros sabores.
    flavors: ["Sweet Lychee"],
  },
];

export const categories = [
  { id: "todos", label: "Todos" },
  { id: "perfumes", label: "Perfumes" },
  { id: "pods", label: "Pods" },
  { id: "liquidos", label: "Líquidos" },
];

// Monta o link do WhatsApp já com a mensagem formal preenchida.
// Se um sabor for escolhido, ele entra na mensagem automaticamente.
export function buildWhatsAppLink(productName, flavor) {
  const productLabel = flavor ? `${productName} (sabor: ${flavor})` : productName;
  const message =
    `Olá! Vim pelo site da ${store.name} e tenho interesse no produto ` +
    `"${productLabel}". Poderiam me passar mais informações sobre disponibilidade ` +
    `e valor? Obrigado(a)!`;
  return `https://wa.me/${store.whatsapp}?text=${encodeURIComponent(message)}`;
}
