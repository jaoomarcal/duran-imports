import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";

import "./index.css";
import { CartProvider } from "./context/CartContext";
import { iniciarHeartbeat } from "./lib/heartbeat";
import App from "./App.jsx";
import Admin from "./pages/Admin.jsx";

// Mantém o projeto Supabase ativo enquanto o site estiver aberto.
iniciarHeartbeat();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <CartProvider>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/painel" element={<Admin />} />
        </Routes>
        <Toaster
          position="top-center"
          toastOptions={{
            style: {
              borderRadius: "0.75rem",
              background: "#0b0b0c",
              color: "#f5f3ec",
              border: "1px solid rgba(200,162,74,0.35)",
            },
          }}
        />
      </CartProvider>
    </BrowserRouter>
  </StrictMode>
);
