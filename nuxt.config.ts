export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss","@nuxtjs/apollo"],
  apollo: {
    clients: {
      default: {
        httpEndpoint: "https://ap-southeast-2.cdn.hygraph.com/content/clw7795ev000008l4c7ya1hvq/master",
      }
    }
  }
})
