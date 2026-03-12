import { defineConfig } from "vite";
import sitemap from "vite-sitemap";

export default defineConfig({
  base: '/dailybread',
  plugins: [
    sitemap({
      base: '/',
      urls: [
        { loc: '/', priority: 1.0, changefreq: 'yearly' }
      ],
      filename: 'sitemap.xml'
    })
  ]
});