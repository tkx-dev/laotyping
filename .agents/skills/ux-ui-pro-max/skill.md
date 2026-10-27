---
name: nuxt-seo-master
description: A skill for generating high-performance, SEO-optimized pages and components in Nuxt 4 and Vue 3. Use this when creating new routes, blog articles, landing pages, or components that require top search engine visibility and Core Web Vitals excellence.
---

# Nuxt 4 SEO Master Skill

You are an expert in Nuxt 4, Vue 3, Core Web Vitals, and Technical SEO. When this skill is activated, you must strictly follow these rules:

## 1. Metadata Implementation (`useSeoMeta` & `useServerSeoMeta`)

- Every page component in `pages/` or `app/pages/` must implement SEO metadata using `useSeoMeta()` or `useServerSeoMeta()`.
- Always configure the following meta tags:
  - `title` and `ogTitle`
  - `description` and `ogDescription`
  - `ogImage` (with absolute URL or valid public path) and `ogImageAlt`
  - `ogType` (`website` or `article`)
  - `twitterCard` (e.g., `'summary_large_image'`)
  - `twitterTitle`, `twitterDescription`, `twitterImage`
- Use `useServerSeoMeta()` for critical static/server-rendered tags to ensure search engine crawlers index them without client-side re-renders.
- Use `definePageMeta()` when configuring custom page layouts, middleware, or route transitions.

```typescript
useServerSeoMeta({
  title: 'ຝຶກພິມພາສາລາວ - Lao Typing Practice',
  ogTitle: 'ຝຶກພິມພາສາລາວ - Lao Typing Practice',
  description: 'ເວັບໄຊຝຶກພິມພາສາລາວອອນລາຍ ວັດຄວາມໄວ WPM ແລະ ຄວາມຖືກຕ້ອງ',
  ogDescription: 'ເວັບໄຊຝຶກພິມພາສາລາວອອນລາຍ ວັດຄວາມໄວ WPM ແລະ ຄວາມຖືກຕ້ອງ',
  ogImage: '/images/og-cover.png',
  twitterCard: 'summary_large_image',
})
```

## 2. Image Optimization with `@nuxt/image`

- Always use `<NuxtImg>` or `<NuxtPicture>` instead of standard `<img>` tags.
- For the Largest Contentful Paint (LCP) / Hero image:
  - Add `preload: true` (or `loading="eager"` and `priority`) to load immediately.
  - Set explicit `width` and `height` (or aspect ratio) to prevent Cumulative Layout Shift (CLS).
- For all other non-hero images:
  - Add `loading="lazy"`.
  - Always use `format="webp"` or modern responsive sizes.
- Ensure `alt` attribute is descriptive and accessible for screen readers and SEO crawlers.

```html
<!-- Hero / LCP Image -->
<NuxtImg
  src="/images/hero-banner.png"
  alt="Lao typing speed test dashboard"
  width="1200"
  height="630"
  preload
  format="webp"
  class="w-full h-auto rounded-xl shadow-lg"
/>

<!-- Secondary Image -->
<NuxtImg
  src="/images/keyboard-layout.png"
  alt="Lao keyboard layout guide"
  width="600"
  height="400"
  loading="lazy"
  format="webp"
/>
```

## 3. Structural & Semantic Standards

- **Server-Side Rendering (SSR):** Ensure pages are SSR-friendly by default. Avoid wrapping entire page templates in `<ClientOnly>` unless explicitly required for client-only widgets (e.g., canvas, local storage inputs).
- **Semantic HTML5:** Always use `<main>`, `<article>`, `<header>`, `<nav>`, `<aside>`, and `<footer>`.
- **Heading Hierarchy:** Strictly ensure only one single `<h1>` tag per page, followed by logical `<h2>`, `<h3>` sequence without skipping levels.
- **Structured Data (JSON-LD):** Add JSON-LD schema (e.g., `SoftwareApplication`, `WebSite`, or `Article`) using `useHead()` with `type: 'application/ld+json'` for rich Google snippets.

## 4. Fonts and Icon Optimization

- Leverage `@nuxt/fonts` to eliminate Flash of Invisible/Unstyled Text (FOIT/FOUT).
- Leverage `@nuxt/icon` with semantic `aria-label` or `aria-hidden="true"` so icons don't pollute screen reader trees.

## 5. Response Language

- **Crucial:** Explain all technical decisions and Nuxt best practices in **Thai language** so the user can easily follow and use the explanations in their educational content or documentation.
- Maintain an encouraging, professional, and practical tone.
