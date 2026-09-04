import { supabase, supabaseConfigurado } from "./supabase";

/**
 * Heartbeat do Supabase.
 *
 * Projetos no plano gratuito do Supabase são pausados após ~7 dias sem
 * nenhuma atividade. Basta uma consulta a cada poucos dias para manter o
 * projeto "acordado" — então este módulo NÃO fica consultando o tempo todo:
 * ele registra em localStorage a data do último pulso e só dispara um novo
 * quando já se passaram 4 dias (margem segura antes dos 7).
 *
 * A verificação roda ao abrir o site e ao voltar o foco para a aba. Também
 * mantém a sessão de autenticação renovada nessas ocasiões.
 *
 * Observação: por rodar no navegador, só cobre os dias em que alguém abre o
 * site. Para garantia 24/7 há o cron em .github/workflows/supabase-keepalive.yml.
 */

const CHAVE = "duran:ultimo-heartbeat";
const INTERVALO_MS = 4 * 24 * 60 * 60 * 1000; // 4 dias
// Enquanto uma aba fica aberta por muito tempo, reavaliamos uma vez por dia.
const CHECAGEM_MS = 24 * 60 * 60 * 1000;

let iniciado = false;

function ultimoPulso() {
  try {
    return Number(localStorage.getItem(CHAVE)) || 0;
  } catch {
    return 0;
  }
}

function registrarPulso() {
  try {
    localStorage.setItem(CHAVE, String(Date.now()));
  } catch {
    /* localStorage indisponível — sem persistência, mas segue funcionando */
  }
}

async function pulsarSeNecessario() {
  if (document.visibilityState === "hidden") return;
  if (Date.now() - ultimoPulso() < INTERVALO_MS) return;
  try {
    // Consulta barata só para gerar atividade no projeto.
    await supabase.from("produtos").select("id").limit(1);
    // Aproveita para manter o access token fresco.
    await supabase.auth.getSession();
    registrarPulso();
  } catch {
    /* offline ou erro de rede — tenta de novo na próxima oportunidade */
  }
}

/** Liga o heartbeat. Chamado uma vez na inicialização do app. */
export function iniciarHeartbeat() {
  if (iniciado || !supabaseConfigurado || typeof window === "undefined") return;
  iniciado = true;

  pulsarSeNecessario();
  setInterval(pulsarSeNecessario, CHECAGEM_MS);

  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "visible") pulsarSeNecessario();
  });

  window.addEventListener("online", pulsarSeNecessario);
}
