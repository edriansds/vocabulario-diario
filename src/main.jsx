import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { registerSW } from "virtual:pwa-register";
import App from "./App.jsx";
import "./styles.css";

registerSW({
  immediate: true,
  onNeedRefresh() {
    console.info("Nova versão do Vocabulário Diário disponível.");
  },
  onOfflineReady() {
    console.info("Vocabulário Diário pronto para uso offline.");
  }
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
