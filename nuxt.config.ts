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
    '@nuxtjs/sitemap',
  ],

  site: {
    url: 'https://carbon-farm-nadoedatel.amvera.io',
    name: 'Карбоновая ферма',
  },

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

  // @nuxt/image: глобальное качество, формат и брейкпоинты для srcset
  image: {
    quality: 75,
    format: ['webp', 'jpg'],
    screens: {
      sm: 480,
      md: 768,
      lg: 1280,
      xl: 1920,
    },
  },

  // @nuxt/icon: бандлим lucide на сервере — убирает клиентский JS для иконок
  icon: {
    serverBundle: {
      collections: ['lucide'],
    },
  },

  // Nitro: pre-compress + Cache-Control заголовки
  nitro: {
    compressPublicAssets: true,
    routeRules: {
      // JS/CSS assets с хешем в имени — можно кешировать навсегда
      '/_nuxt/**': { headers: { 'cache-control': 'public, max-age=31536000, immutable' } },
      // Все картинки через @nuxt/image попадают сюда
      '/_ipx/**':  { headers: { 'cache-control': 'public, max-age=31536000, immutable' } },
      // HTML — всегда проверяем актуальность
      '/':         { headers: { 'cache-control': 'public, max-age=0, must-revalidate' } },
    },
  },
})
