import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  base: '/study-dutch/',
  plugins: [
    vue(),
    VitePWA({
      registerType: 'autoUpdate',
      filename: 'sw.js',
      scope: '/study-dutch/',
      devOptions: {
        enabled: false,
        type: 'module',
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg}']
      },
      manifest: {
        name: "Study Dutch",
        short_name: "StudyDutch",
        description: "A Vue 3 PWA Starter with Tailwind",
        theme_color: "#ffffff",
        icons: [
          {
            src: "/FASK-PWA/images/icon.png",
            sizes: "512x512",
            type: "image/png",
          }
        ]
      }
    })
  ]
});
