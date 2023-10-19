// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  target: 'static',
  ssr: false,
  vite: {
    define: {
      "process.env.TESS_ENV": process.env.ENV,
    },
  },
  modules: [
    '@nuxtjs/tailwindcss',
    '@kevinmarrec/nuxt-pwa',
    'nuxt-icon'
  ],
  tailwindcss: {
    cssPath: '~/assets/css/tailwind.css',
    configPath: 'tailwind.config.js',
    exposeConfig: false,
    config: {},
    injectPosition: 0,
    viewer: true,
  },
  pwa: {
    workbox: {
      enabled: true
    },
    manifest: {
      name: 'STANKIN Schedule Manager',
      short_name: 'Станкин Календарь',
      lang: 'ru',
      description: 'MSUT \"STANKIN\" schedule manager webapp by ebolblga'
    }
  }
  // publicRuntimeConfig:{
  //   base:process.env.NODE_ENV == "production" ? "/Grad-Work-Alpha/": "/"
  // },
  // app: {
  //   baseURL: process.env.NODE_ENV =="production" ? "/Grad-Work-Alpha": "/",
  //   buildAssetsDir: "/nuxt/",
  //   cdnURL:"/Grad-Work-Alpha"
  // },
  // router:{
  //   base:process.env.NODE_ENV =="production" ? "/Grad-Work-Alpha/": "/"
  // }
})
