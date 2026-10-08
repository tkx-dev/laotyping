// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  app: {
    head: {
      title: 'LaoType | ເວັບໄຊຝຶກພິມດີດພາສາລາວ (Lao Typing Speed Test)',
      htmlAttrs: {
        lang: 'lo',
        dir: 'ltr',
      },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=5' },
        {
          name: 'description',
          content: 'LaoType ເປັນເວັບໄຊທົດສອບ ແລະ ຝຶກພິມດີດພາສາລາວອອນລາຍຟຣີ (Lao Typing Speed Test). ວັດແທກຄວາມໄວ WPM, ຄວາມຖືກຕ້ອງ (Accuracy), ຮອງຮັບທັງພາສາລາວ ແລະ ພາສາອັງກິດ ພ້ອມແປ້ນພິມຈຳລອງ.',
        },
        {
          name: 'keywords',
          content: 'lao typing, lao typing test, lao speed typing, ພິມດີດພາສາລາວ, ຝຶກພິມດີດ, ແປ້ນພິມລາວ, monkeytype lao, speed typing test, wpm lao, typing practice lao',
        },
        { name: 'author', content: 'LaoType' },
        { name: 'application-name', content: 'LaoType' },
        { name: 'theme-color', content: '#1c1917' },
        { name: 'color-scheme', content: 'dark' },
        { name: 'apple-mobile-web-app-title', content: 'LaoType' },
        { name: 'mobile-web-app-capable', content: 'yes' },
        { name: 'apple-mobile-web-app-capable', content: 'yes' },
        { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' },
        { name: 'robots', content: 'index, follow' },
        // Open Graph / Facebook
        { property: 'og:site_name', content: 'LaoType' },
        { property: 'og:type', content: 'website' },
        { property: 'og:title', content: 'LaoType | ເວັບໄຊຝຶກພິມດີດພາສາລາວ (Lao Typing Speed Test)' },
        {
          property: 'og:description',
          content: 'ທົດສອບ ແລະ ຝຶກພິມດີດພາສາລາວ ແລະ ພາສາອັງກິດອອນລາຍຟຣີ ວັດແທກຄວາມໄວ WPM ແລະ ຄວາມຖືກຕ້ອງ ດ້ວຍລະບົບທີ່ທັນສະໄໝ',
        },
        { property: 'og:image', content: '/og-image.jpg' },
        { property: 'og:image:width', content: '1200' },
        { property: 'og:image:height', content: '675' },
        { property: 'og:image:alt', content: 'LaoType - Lao Typing Speed Test Banner' },
        { property: 'og:locale', content: 'lo_LA' },
        { property: 'og:locale:alternate', content: 'en_US' },
        // Twitter
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: 'LaoType | ເວັບໄຊຝຶກພິມດີດພາສາລາວ' },
        {
          name: 'twitter:description',
          content: 'ທົດສອບ ແລະ ຝຶກພິມດີດພາສາລາວ ແລະ ພາສາອັງກິດອອນລາຍຟຣີ ວັດແທກ WPM ດ້ວຍແປ້ນພິມຈຳລອງ',
        },
        { name: 'twitter:image', content: '/og-image.jpg' },
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
        { rel: 'manifest', href: '/site.webmanifest' },
      ],
    },
  },
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
      {
        name: 'JetBrains Mono',
        provider: 'google',
        weights: [400, 500, 600, 700],
      },
      {
        name: 'Inter',
        provider: 'google',
        weights: [400, 500, 600, 700],
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
