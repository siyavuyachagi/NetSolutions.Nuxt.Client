export default defineNuxtConfig({
  ssr: true, // Ensure SSR is enabled globally
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
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
          content: "https://www.yourwebsite.com/path/to/your-image.jpg", // Replace with your actual image URL
        },
        { property: "og:url", content: "https://www.yourwebsite.com" },
        { property: "og:type", content: "website" },
        { property: "og:site_name", content: "NetSolutions" },
        {
          name: "keywords",
          content: "web development, hosting, design, SEO, NetSolutions",
        },
      ],
      link: [{ rel: "icon", type: "image/svg+xml", href: "/logo.svg" }],
    },
  },
  vite: {
    server: {
      proxy: {
        "/api": {
          target: "https://localhost:7204", // Changed from https:// to http://
          changeOrigin: true,
          secure: false, // Only needed for HTTPS
          timeout: 60000, // Set a longer timeout (60 seconds)
          proxyTimeout: 60000,
        },
      },
    },
  },
  nitro: {
    storage: {
      cache: {
        driver: "memory", // Try switching to in-memory cache
      },
    },
    prerender: {
      crawlLinks: false, // Crawl links on the page
      // routes: ["/", "/about", "/contact", "/auth/login"], // List the pages to prerender as static
      routes: ["/", "/about", "/contact", "/auth/login"], // List the pages to prerender as static
    },
  },
});
