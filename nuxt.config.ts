// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  // Custom configurations
  css: ["~/assets/css/app.css"],
  modules: ["@nuxtjs/tailwindcss", "@pinia/nuxt"],
  tailwindcss: {
    cssPath: ["~/assets/css/tailwind.css", { injectPosition: "first" }],
    viewer: true,
    exposeConfig: false,
  },
  typescript: {
    builder: "vite",
  },
  // Meta data
  app: {
    head: {
      title: "Home | NetSolutions",
      meta: [
        {
          name: "description",
          content:
            "Welcome to NetSolutions, your go-to provider for web development, hosting, and design services.",
        },
        { name: "robots", content: "index, follow" },
        { property: "og:title", content: "Home | NetSolutions" },
        {
          property: "og:description",
          content: "Your web development and hosting experts at NetSolutions.",
        },
        {
          property: "og:image",
          content: "https://www.yourwebsite.com/path/to/your-image.jpg", // Use an actual image URL
        },
        { property: "og:url", content: "https://www.yourwebsite.com" },
        { property: "og:type", content: "website" },
        { property: "og:site_name", content: "NetSolutions" },
        {
          name: "keywords",
          content: "web development, hosting, design, SEO, NetSolutions",
        },
      ],
      link: [
        { rel: "icon", type: "image/svg+xml", href: "/logo.svg" }, 
      ],
    },
  },
});