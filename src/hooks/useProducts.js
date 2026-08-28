import { useCallback, useEffect, useState } from "react";
import { supabase, supabaseConfigurado, urlImagemProduto } from "../lib/supabase";

/** Normaliza o registro do banco para o formato que a vitrine usa */
function normalizar(row) {
  return {
    id: row.id,
    slug: row.slug,
    nome: row.nome,
    descricao: row.descricao,
    categoria: row.categoria,
    preco: row.preco != null ? Number(row.preco) : null,
    sabores: Array.isArray(row.sabores) ? row.sabores : [],
    imagem: urlImagemProduto(row.imagem),
    destaque: row.destaque,
    esgotado: row.esgotado,
    ordem: row.ordem ?? 0,
  };
}

/**
 * Busca os produtos do Supabase.
 * Retorna { produtos, loading, erro, recarregar }.
 */
export function useProducts() {
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(null);

  const carregar = useCallback(async () => {
    if (!supabaseConfigurado) {
      setErro("Supabase não configurado (.env).");
      setLoading(false);
      return;
    }
    setLoading(true);
    setErro(null);
    const { data, error } = await supabase
      .from("produtos")
      .select("*")
      .order("ordem", { ascending: true })
      .order("nome", { ascending: true });

    if (error) {
      setErro(error.message);
      setProdutos([]);
    } else {
      setProdutos((data || []).map(normalizar));
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    carregar();
  }, [carregar]);

  return { produtos, loading, erro, recarregar: carregar };
}
