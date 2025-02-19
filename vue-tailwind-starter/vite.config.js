import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    vue(),
    VitePWA({
      registerType: 'autoUpdate',
      filename: 'sw.js',
      devOptions: {
        enabled: false,
        type: 'module',
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg}']
      },
      manifest: {
        name: "Vue PWA Starter",
        short_name: "VuePWA",
        description: "A Vue 3 PWA Starter with Tailwind",
        theme_color: "#ffffff",
        icons: [
          {
            src: "/images/icon.png",
            sizes: "512x512",
            type: "image/png",
          }
        ]
      }
    })
  ]
});
