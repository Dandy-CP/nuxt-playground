// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ["@nuxthq/ui", "@vueuse/nuxt"],
  colorMode: {
    preference: "light",
  },
  runtimeConfig: {
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE,
    },
  },
  routeRules: {
    "/**": { ssr: false },
  },
  // devtools: { enabled: true },
});
