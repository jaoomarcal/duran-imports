import { createClient } from "@supabase/supabase-js";

// Variáveis do arquivo .env (nunca commite o .env!)
const rawUrl = (import.meta.env.VITE_SUPABASE_URL || "").trim();
const anonKey = (import.meta.env.VITE_SUPABASE_ANON_KEY || "").trim();

const match = rawUrl.match(/https:\/\/[a-z0-9-]+\.supabase\.(co|in)/i);
const url = match ? match[0] : rawUrl;

export const supabaseConfigurado = Boolean(match && anonKey);

if (!supabaseConfigurado) {
  console.error(
    "[supabase] Configure o arquivo .env:\n" +
      "  VITE_SUPABASE_URL       -> Project Settings > Data API > Project URL\n" +
      "  VITE_SUPABASE_ANON_KEY  -> Project Settings > API Keys > Publishable/anon key\n" +
      "Depois de editar o .env, PARE e rode 'npm run dev' de novo."
  );
}

export const supabase = createClient(url || "https://placeholder.supabase.co", anonKey || "placeholder", {
  auth: { persistSession: true, autoRefreshToken: true },
});

export const BUCKET_PRODUTOS = "produtos";

/**
 * Resolve o caminho salvo no banco para uma URL utilizável pela <img>:
 *  - "/products/..."  -> arquivo embutido no site (catálogo inicial)
 *  - "http..."        -> já é uma URL completa
 *  - qualquer outro   -> path dentro do bucket "produtos" do Storage
 */
export function urlImagemProduto(path) {
  if (!path) return null;
  if (path.startsWith("/") || path.startsWith("http")) return path;
  return supabase.storage.from(BUCKET_PRODUTOS).getPublicUrl(path).data.publicUrl;
}
