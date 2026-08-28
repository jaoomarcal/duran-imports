# Duran Imports — Loja

Site em React (Vite) para a Duran Imports (perfumes importados e pods),
visual preto/dourado, catálogo por categoria, **carrinho / lista de
orçamento** que finaliza o pedido pelo WhatsApp e **painel do dono**
(`/painel`) para cadastrar produtos, preços e sabores.

> A identidade visual (preto/dourado, fontes Oswald/Inter) e os produtos
> continuam os mesmos — o que mudou foi ganhar carrinho e painel.

## 🧩 Bibliotecas

| Pacote | Para quê serve |
|---|---|
| `react` / `react-dom` | Base do site |
| `vite` | Compila e serve |
| `tailwindcss` (v4) | Estilização (cores em `src/index.css`, bloco `@theme`) |
| `framer-motion` | Animações (cards, gaveta do carrinho, botão flutuante) |
| `lucide-react` | Ícones |
| `react-router-dom` | Rotas (`/` loja, `/painel` admin) |
| `@supabase/supabase-js` | Banco de produtos + login do painel + Storage de fotos |
| `@radix-ui/react-dialog` | Base acessível da gaveta do carrinho |
| `sonner` | Avisos ("Adicionado ao pedido") |

## ▶️ Rodar na sua máquina

```bash
cd duran-imports
npm install
cp .env.example .env   # preencha com as chaves do Supabase
npm run dev            # http://localhost:5173
```

Sem o `.env` o site abre, mas o catálogo aparece vazio (ainda não há banco).

## 🗄️ Banco (Supabase) — uma vez só

1. Crie um projeto em [supabase.com](https://supabase.com).
2. **SQL Editor → New query**, cole todo o `supabase/schema.sql` e rode.
   Isso cria a tabela `produtos`, as regras de segurança (RLS), o bucket
   de fotos e **já insere os 37 produtos** que estavam no site.
3. **Project Settings → API**: copie a *Project URL* e a *Publishable/anon
   key* para o `.env` (`VITE_SUPABASE_URL` e `VITE_SUPABASE_ANON_KEY`).
4. **Authentication → Users → Add user**: crie o e-mail/senha do dono.
5. **SQL Editor**, rode (trocando o e-mail):
   ```sql
   insert into public.admins (user_id)
   select id from auth.users where email = 'dono@duranimports.com';
   ```
6. Reinicie o `npm run dev`. O catálogo carrega e `/painel` faz login.

## ✏️ O que se edita onde

| Quero mudar… | Onde |
|---|---|
| Nome, WhatsApp, Instagram, áreas de entrega | `src/data/store.js` (`store`) |
| Produtos, preços, sabores, esgotado, destaque, fotos | **painel `/painel`** |
| Cores da marca / fontes | `src/index.css` (bloco `@theme`) |
| Banner do topo | `public/hero-bg.jpg` |
| Imagem de prévia de link (WhatsApp/Instagram) | `public/og-image.jpg` + URLs no `index.html` |

Preço vazio no painel = mostra **"Consulte o preço"**. O carrinho não
calcula total: o cliente monta a lista e recebe o orçamento no WhatsApp.

As **37 fotos originais** ficam em `public/products/`. Fotos novas
enviadas pelo painel vão para o Storage do Supabase.

## 🚀 Deploy (GitHub + Vercel)

```bash
git add .
git commit -m "Loja Duran Imports: carrinho e painel"
git remote add origin https://github.com/SEU-USUARIO/duran-imports.git
git push -u origin main
```

Na [vercel.com](https://vercel.com): **Add New → Project** → importe o
repositório. Framework **Vite** é detectado. Em **Environment Variables**
adicione `VITE_SUPABASE_URL` e `VITE_SUPABASE_ANON_KEY` **antes** do
Deploy. Depois, no Supabase → **Authentication → URL Configuration**,
adicione a URL da Vercel (para o login do painel funcionar em produção).
Ajuste também as URLs em `index.html` (canonical / og) para o domínio real.

O `vercel.json` já faz o `/painel` funcionar ao recarregar a página.

## 📁 Estrutura

```
public/
├─ products/          → 37 fotos originais dos produtos
├─ hero-bg.jpg        → banner 3D do topo
└─ og-image.jpg       → prévia de link
src/
├─ components/
│  ├─ cart/           → FloatingCart (botão) + CartDrawer (gaveta + checkout)
│  ├─ Navbar / Hero / Products / ProductCard / DeliveryStrip / Footer
│  └─ ProductSkeleton
├─ context/CartContext.jsx   → carrinho + localStorage
├─ hooks/                     → useProducts, useAuth, useAdmin
├─ lib/                       → supabase, utils
├─ data/store.js              → config da loja + montagem das mensagens do WhatsApp
├─ pages/Admin.jsx            → /painel
└─ App.jsx / main.jsx
supabase/schema.sql           → banco + RLS + Storage + catálogo inicial
```
