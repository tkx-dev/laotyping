// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@nuxt/icon/module',
    '@nuxt/image',
    '@nuxt/fonts',
  ],
  fonts: {
    defaults: {
      weights: [400, 500, 600, 700],
      styles: ['normal'],
    },
    families: [
      {
        name: 'Noto Sans Lao',
        provider: 'google',
        weights: [300, 400, 500, 600, 700],
      },
      {
        name: 'Phetsarath',
        provider: 'google',
        weights: [400, 700],
      },
    ],
  },
  css: ['~/assets/css/main.css'],
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
})
