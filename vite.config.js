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
        name: "Slice of Dutch",
        short_name: "SliceOfDutch",
        description: "‘Slice of Dutch’ was created to take the pain out of your learning routine and inject a little fun back into the process",
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
