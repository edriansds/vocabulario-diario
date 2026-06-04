import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),

    VitePWA({
      registerType: "autoUpdate",

      includeAssets: [
        "favicon.svg",
        "pwa-icon.svg",
        "maskable-icon.svg"
      ],

      manifest: {
        name: "Vocabulário Diário",
        short_name: "Vocabulário",
        description:
          "Aprenda uma palavra nova em português todos os dias, com significado, origem e exemplo de uso.",
        lang: "pt-BR",
        dir: "ltr",
        display: "standalone",
        orientation: "portrait",
        start_url: "/vocabulario-diario/",
        scope: "/vocabulario-diario/",
        theme_color: "#0d1117",
        background_color: "#010409",
        categories: ["education", "productivity"],
        icons: [
          {
            src: "/vocabulario-diario/pwa-icon.svg",
            sizes: "any",
            type: "image/svg+xml",
            purpose: "any"
          },
          {
            src: "/vocabulario-diario/maskable-icon.svg",
            sizes: "any",
            type: "image/svg+xml",
            purpose: "maskable"
          }
        ]
      },

      workbox: {
        globPatterns: ["**/*.{js,css,html,svg,png,ico,json}"],
        cleanupOutdatedCaches: true,
        clientsClaim: true,
        skipWaiting: true
      },

      devOptions: {
        enabled: false
      }
    })
  ],

  base: "/vocabulario-diario/"
});
