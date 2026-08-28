import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { ArrowLeft, LogOut, Plus, Pencil, Trash2 } from "lucide-react";

import { cn } from "../lib/utils";
import { urlImagemProduto, supabaseConfigurado } from "../lib/supabase";
import { categories } from "../data/store";
import { useAuth } from "../hooks/useAuth";
import { useAdmin } from "../hooks/useAdmin";

const CATS = categories.filter((c) => c.id !== "todos");

/* --------------------------- Login --------------------------- */
function Login({ onEntrar }) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [carregando, setCarregando] = useState(false);

  async function submit(e) {
    e.preventDefault();
    setCarregando(true);
    try {
      await onEntrar(email, senha);
    } catch (err) {
      toast.error("Login inválido", { description: err.message });
    } finally {
      setCarregando(false);
    }
  }

  return (
    <div className="grid min-h-screen place-items-center bg-onyx px-4">
      <form
        onSubmit={submit}
        className="w-full max-w-sm space-y-4 rounded-2xl border border-white/10 bg-charcoal p-6"
      >
        <h1 className="text-center font-[var(--font-display)] text-lg uppercase tracking-wide text-gold-gradient">
          Duran Imports — Painel
        </h1>
        <input
          type="email"
          required
          autoComplete="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-lg border border-white/15 bg-onyx px-3 py-2.5 text-sm text-cream outline-none focus:border-gold focus:ring-2 focus:ring-gold/30"
        />
        <input
          type="password"
          required
          autoComplete="current-password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          className="w-full rounded-lg border border-white/15 bg-onyx px-3 py-2.5 text-sm text-cream outline-none focus:border-gold focus:ring-2 focus:ring-gold/30"
        />
        <button
          type="submit"
          disabled={carregando}
          className="w-full rounded-full bg-gold py-2.5 text-sm font-semibold text-onyx transition-colors hover:bg-gold-light disabled:opacity-50"
        >
          {carregando ? "Entrando..." : "Entrar"}
        </button>
        <Link
          to="/"
          className="block text-center text-xs text-cream/50 hover:text-gold"
        >
          ← Voltar para a loja
        </Link>
      </form>
    </div>
  );
}

/* --------------------------- Formulário --------------------------- */
const VAZIO = {
  nome: "",
  slug: "",
  categoria: "perfumes",
  descricao: "",
  preco: "",
  sabores: "",
  imagem: "",
  destaque: false,
  esgotado: false,
  ordem: 0,
};

function ProdutoForm({ inicial, onSalvar, onCancelar, uploadFoto }) {
  const [form, setForm] = useState(() => {
    if (!inicial) return VAZIO;
    return {
      ...VAZIO,
      ...inicial,
      preco: inicial.preco ?? "",
      sabores: Array.isArray(inicial.sabores)
        ? inicial.sabores.join("\n")
        : inicial.sabores || "",
    };
  });
  const [enviando, setEnviando] = useState(false);

  const set = (campo) => (e) => {
    const v = e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setForm((f) => ({ ...f, [campo]: v }));
  };

  async function onFile(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const path = await uploadFoto(file);
      setForm((f) => ({ ...f, imagem: path }));
      toast.success("Foto enviada");
    } catch (err) {
      toast.error("Falha no upload", { description: err.message });
    }
  }

  async function submit(e) {
    e.preventDefault();
    setEnviando(true);
    const ok = await onSalvar(form);
    setEnviando(false);
    if (ok) onCancelar();
  }

  const campo =
    "mt-1 w-full rounded-lg border border-white/15 bg-onyx px-3 py-2 text-sm text-cream outline-none focus:border-gold focus:ring-2 focus:ring-gold/30";

  return (
    <form
      onSubmit={submit}
      className="space-y-3 rounded-xl border border-white/10 bg-charcoal p-4"
    >
      <div className="grid gap-3 sm:grid-cols-2">
        <label className="text-sm text-cream/80">
          Nome
          <input required value={form.nome} onChange={set("nome")} className={campo} />
        </label>
        <label className="text-sm text-cream/80">
          Categoria
          <select value={form.categoria} onChange={set("categoria")} className={campo}>
            {CATS.map((c) => (
              <option key={c.id} value={c.id}>
                {c.label}
              </option>
            ))}
          </select>
        </label>
        <label className="text-sm text-cream/80">
          Preço (R$) — deixe vazio para "Consulte o preço"
          <input
            type="number"
            step="0.01"
            value={form.preco}
            onChange={set("preco")}
            className={campo}
          />
        </label>
        <label className="text-sm text-cream/80">
          Ordem
          <input
            type="number"
            value={form.ordem}
            onChange={set("ordem")}
            className={campo}
          />
        </label>
      </div>

      <label className="block text-sm text-cream/80">
        Sabores — um por linha (deixe vazio se não tiver)
        <textarea
          rows={3}
          value={form.sabores}
          onChange={set("sabores")}
          placeholder={"Menthol\nGrape Ice\nStrawberry Kiwi"}
          className={campo}
        />
      </label>

      <label className="block text-sm text-cream/80">
        Descrição (opcional)
        <textarea
          rows={2}
          value={form.descricao}
          onChange={set("descricao")}
          className={campo}
        />
      </label>

      <div className="flex flex-wrap items-center gap-4 text-sm text-cream/80">
        <label className="flex items-center gap-2">
          <input type="checkbox" checked={form.destaque} onChange={set("destaque")} />
          Destaque
        </label>
        <label className="flex items-center gap-2">
          <input type="checkbox" checked={form.esgotado} onChange={set("esgotado")} />
          Esgotado
        </label>
      </div>

      <div className="flex items-center gap-3">
        {form.imagem && (
          <img
            src={urlImagemProduto(form.imagem)}
            alt=""
            className="h-16 w-16 rounded-lg bg-white object-contain p-1"
          />
        )}
        <input
          type="file"
          accept="image/*"
          onChange={onFile}
          className="text-sm text-cream/70"
        />
      </div>

      <div className="flex gap-2 pt-1">
        <button
          type="submit"
          disabled={enviando}
          className="rounded-full bg-gold px-5 py-2 text-sm font-semibold text-onyx hover:bg-gold-light disabled:opacity-50"
        >
          {enviando ? "Salvando..." : "Salvar"}
        </button>
        <button
          type="button"
          onClick={onCancelar}
          className="rounded-full border border-white/20 px-5 py-2 text-sm font-semibold text-cream/70 hover:border-gold hover:text-gold"
        >
          Cancelar
        </button>
      </div>
    </form>
  );
}

/* --------------------------- Painel --------------------------- */
export default function Admin() {
  const { user, loading: authLoading, entrar, sair } = useAuth();
  const { produtos, loading, uploadFoto, salvar, remover, toggle } = useAdmin();
  const [editando, setEditando] = useState(null);

  if (!supabaseConfigurado) {
    return (
      <div className="grid min-h-screen place-items-center bg-onyx px-6 text-center text-cream/60">
        <div className="max-w-sm space-y-2">
          <p className="font-[var(--font-display)] text-lg uppercase tracking-wide text-gold-gradient">
            Painel indisponível
          </p>
          <p className="text-sm">
            Configure o arquivo <code>.env</code> com as chaves do Supabase e
            rode <code>npm run dev</code> de novo. Veja{" "}
            <code>supabase/schema.sql</code>.
          </p>
          <Link to="/" className="inline-block text-sm text-gold hover:underline">
            ← Voltar para a loja
          </Link>
        </div>
      </div>
    );
  }

  if (authLoading) {
    return (
      <div className="grid min-h-screen place-items-center bg-onyx text-cream/40">
        Carregando...
      </div>
    );
  }

  if (!user) return <Login onEntrar={entrar} />;

  return (
    <div className="min-h-screen bg-onyx text-cream">
      <div className="mx-auto max-w-3xl px-4 py-6">
        <header className="flex items-center justify-between">
          <Link
            to="/"
            className="flex items-center gap-1 text-sm text-cream/60 hover:text-gold"
          >
            <ArrowLeft size={16} /> Loja
          </Link>
          <h1 className="font-[var(--font-display)] text-lg uppercase tracking-wide text-gold-gradient">
            Painel
          </h1>
          <button
            onClick={sair}
            className="flex items-center gap-1 text-sm text-cream/60 hover:text-gold"
          >
            <LogOut size={16} /> Sair
          </button>
        </header>

        <div className="my-4">
          {editando ? (
            <ProdutoForm
              inicial={editando === "novo" ? null : editando}
              onSalvar={salvar}
              onCancelar={() => setEditando(null)}
              uploadFoto={uploadFoto}
            />
          ) : (
            <button
              onClick={() => setEditando("novo")}
              className="flex items-center gap-2 rounded-full bg-gold px-5 py-2 text-sm font-semibold text-onyx hover:bg-gold-light"
            >
              <Plus size={16} /> Novo produto
            </button>
          )}
        </div>

        {loading ? (
          <div className="space-y-2">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="h-16 w-full animate-pulse rounded-xl bg-white/5"
              />
            ))}
          </div>
        ) : (
          <ul className="divide-y divide-white/10 overflow-hidden rounded-xl border border-white/10">
            {produtos.map((p) => (
              <li
                key={p.id}
                className="flex flex-col gap-2 p-3 sm:flex-row sm:items-center sm:gap-3"
              >
                <div className="flex min-w-0 items-center gap-3">
                  <img
                    src={urlImagemProduto(p.imagem) || "/favicon.jpg"}
                    alt=""
                    className="h-12 w-12 shrink-0 rounded-lg bg-white object-contain p-1"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold">{p.nome}</p>
                    <p className="text-xs text-cream/45">
                      {p.categoria}
                      {p.preco != null
                        ? ` · R$ ${Number(p.preco).toFixed(2)}`
                        : " · sem preço"}
                      {p.sabores?.length ? ` · ${p.sabores.length} sabores` : ""}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 sm:ml-auto">
                  <TogglePill
                    ativo={p.destaque}
                    onClick={() => toggle(p.id, "destaque", p.destaque)}
                    label="Destaque"
                  />
                  <TogglePill
                    ativo={!p.esgotado}
                    onClick={() => toggle(p.id, "esgotado", p.esgotado)}
                    label={p.esgotado ? "Esgotado" : "Ativo"}
                  />
                  <button
                    onClick={() => setEditando(p)}
                    className="ml-auto rounded-md p-1.5 text-cream/70 hover:bg-white/10 sm:ml-0"
                    aria-label="Editar"
                  >
                    <Pencil size={16} />
                  </button>
                  <button
                    onClick={() => {
                      if (confirm(`Excluir "${p.nome}"?`)) remover(p.id);
                    }}
                    className="rounded-md p-1.5 text-red-400 hover:bg-red-500/10"
                    aria-label="Excluir"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

function TogglePill({ ativo, onClick, label }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold transition-colors",
        ativo ? "bg-gold text-onyx" : "bg-white/10 text-cream/50"
      )}
    >
      {label}
    </button>
  );
}
