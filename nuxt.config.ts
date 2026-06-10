import tailwindcss from '@tailwindcss/vite'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  runtimeConfig: {
    public: {
      web3formsKey: '',
    },
  },

  modules: [
    '@nuxt/eslint',
    '@nuxt/image',
    '@nuxt/icon',
  ],

  vite: {
    plugins: [
      tailwindcss(),
    ],
  },

  css: ['~/assets/css/main.css'],

  // Авто-импорт компонентов без префикса поддиректории
  components: [
    { path: '~/components', pathPrefix: false },
  ],

  // @nuxt/image: глобальное качество и брейкпоинты для srcset
  image: {
    quality: 75,
    screens: {
      sm: 480,
      md: 768,
      lg: 1280,
      xl: 1920,
    },
  },

  // // Nitro: pre-compress + Cache-Control заголовки
  // nitro: {
  //   compressPublicAssets: true,
  //   routeRules: {
  //     '/_nuxt/**': { headers: { 'cache-control': 'public, max-age=31536000, immutable' } },
  //     '/trees/**': { headers: { 'cache-control': 'public, max-age=31536000, immutable' } },
  //     '/*.jpg':    { headers: { 'cache-control': 'public, max-age=31536000, immutable' } },
  //     '/*.png':    { headers: { 'cache-control': 'public, max-age=31536000, immutable' } },
  //     '/*.svg':    { headers: { 'cache-control': 'public, max-age=31536000, immutable' } },
  //     '/':         { headers: { 'cache-control': 'public, max-age=0, must-revalidate' } },
  //   },
  // },
})
