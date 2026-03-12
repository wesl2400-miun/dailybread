import { defineConfig } from "vite";
import sitemap from "vite-sitemap";

export default defineConfig({
  base: 'dailybread',
  plugins: [
    sitemap({
      base: '/',
      filename: 'sitemap.xml'
    })
  ]
});