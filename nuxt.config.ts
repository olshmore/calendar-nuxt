export default defineNuxtConfig({
  ssr: true,
  devtools: { enabled: true },
  modules: [
    "@pinia/nuxt",
    "@nuxtjs/eslint-module",
    "nuxt-icons"
  ],
  components: [
    "~/components",
    { path: "~/components/calendar" }
  ]
});
