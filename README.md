# Duran Imports — Landing Page

Landing page em React (Vite) para a Duran Imports (perfumes importados e
pods), com visual clean preto/branco e detalhes dourados, catálogo com
filtro por categoria, botão "Peça no WhatsApp" com mensagem pronta e
Instagram da loja. Sem seção de endereço fixo — é loja com entrega.

## 🧩 Bibliotecas usadas

| Pacote | Para quê serve |
|---|---|
| `react` / `react-dom` | Base do site |
| `vite` | Compila e serve o projeto |
| `tailwindcss` (v4) + `@tailwindcss/postcss` | Estilização |
| `framer-motion` | Animações dos cards, banner, filtro e botão flutuante |
| `lucide-react` | Ícones |

Já está tudo no `package.json` — só rodar `npm install`.

## ▶️ Como rodar na sua máquina

```bash
cd duran-imports
npm install
npm run dev
```

Abre em `http://localhost:5173`.

Para gerar a versão final (pasta `dist/`, pronta pra hospedar):

```bash
npm run build
```

## ✏️ Onde editar textos, preços e produtos

Tudo fica em um único arquivo:

```
src/data/store.js
```

Lá você edita:
- **Preços** de cada produto (campo `price`)
- **Nome, categoria e imagem** de cada produto (o campo `category` é
  `"perfumes"` ou `"pods"` — controla o filtro de categorias da página)
- Número de **WhatsApp**, **Instagram**, **áreas de entrega**
- A **mensagem automática** enviada ao WhatsApp (função `buildWhatsAppLink`)

Para adicionar um novo produto: importe a imagem no topo do arquivo e
copie um bloco dentro do array `products`, ajustando `id`, `name`,
`category`, `price` e `image`.

## 🚀 Hospedagem gratuita (GitHub + Vercel)

Mesmo passo a passo do outro projeto:

```bash
git init
git add .
git commit -m "Primeira versão da landing page Duran Imports"
git branch -M main
git remote add origin https://github.com/SEU-USUARIO/duran-imports.git
git push -u origin main
```

Depois, em https://vercel.com:
1. "Continue with GitHub" e autorize o acesso.
2. "Add New" → "Project" → importe o repositório `duran-imports`.
3. Deixe tudo padrão (Framework: Vite) e clique em **Deploy**.

Em ~1 minuto o site está no ar. Para atualizar depois, sempre que mexer
no código:

```bash
git add .
git commit -m "Atualiza preços"
git push
```

A Vercel republica sozinha a cada push.

## 📁 Estrutura do projeto

```
src/
├─ assets/           → logo e fotos dos produtos
├─ components/       → Navbar, Hero, ProductCard, Products (filtro), DeliveryStrip, Footer...
├─ data/store.js     → todas as informações editáveis da loja
├─ App.jsx           → monta a página
└─ index.css         → paleta preto/branco/dourado e fontes
```
