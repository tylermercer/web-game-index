import { defineConfig } from "astro/config";
import cloudflare from "@astrojs/cloudflare";
import vue from "@astrojs/vue";

// https://astro.build/config
export default defineConfig({
  output: "static",
  // Keep Astro 5's lossless whitespace compression (Astro 7 defaults to JSX whitespace rules,
  // which can drop meaningful spaces between text and expressions)
  compressHTML: true,
  session: {
    driver: "memory",
  },
  adapter: cloudflare({
    imageService: "compile",
    prerenderEnvironment: "node",
  }),
  integrations: [vue()],
});
