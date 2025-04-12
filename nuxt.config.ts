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
          content:
            "web development, web design,uiux design, seo, netsolutions, mobile development, project, solutions, code",
        },
      ],
      link: [{ rel: "icon", type: "image/svg+xml", href: "/logo.svg" }],
    },
  },
  nitro: {
    storage: {
      cache: {
        driver: "fs", // Use filesystem-based cache instead of memory
        base: "./.cache", // Optional: specify a cache directory
      },
    },
  },
  runtimeConfig: {
    public: {
      googleMapsApiKey: process.env.NUXT_PUBLIC_GOOGLE_MAPS_API_KEY,
      apiUrlDev: process.env.NUXT_PUBLIC_API_URL_DEV,
      apiUrlProd: process.env.NUXT_PUBLIC_API_URL_PROD,
    },
  },
  devServer: {
    port: 3001,
    host: "0.0.0.0",
  },
  // hooks: {
  //   "build:before": () => {
  //     console.log("Build environment variables:");
  //     console.log("NODE_ENV:", process.env.NODE_ENV);
  //     console.log(
  //       "NUXT_PUBLIC_API_URL_DEV:",
  //       process.env.NUXT_PUBLIC_API_URL_DEV
  //     );
  //     console.log(
  //       "NUXT_PUBLIC_API_URL_PROD:",
  //       process.env.NUXT_PUBLIC_API_URL_PROD
  //     );
  //   },
  // },
});
