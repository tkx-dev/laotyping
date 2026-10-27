import { test, expect } from '@playwright/test';

test.describe('SEO and Google Search Console Configuration', () => {
  test('should render required SEO meta tags and canonical URL', async ({ page }) => {
    await page.goto('/');

    // Title
    await expect(page).toHaveTitle(/LaoType/);

    // Meta Description & Keywords
    const metaDesc = page.locator('meta[name="description"]');
    await expect(metaDesc).toHaveAttribute('content', /LaoType/);

    const metaKeywords = page.locator('meta[name="keywords"]');
    await expect(metaKeywords).toHaveAttribute('content', /lao typing/);

    // Open Graph
    const ogTitle = page.locator('meta[property="og:title"]');
    await expect(ogTitle).toHaveAttribute('content', /LaoType/);

    const ogUrl = page.locator('meta[property="og:url"]');
    await expect(ogUrl).toHaveAttribute('content', 'https://typing.nungdees.xyz');

    const ogImage = page.locator('meta[property="og:image"]');
    await expect(ogImage).toHaveAttribute('content', 'https://typing.nungdees.xyz/og-image.jpg');

    // Canonical link
    const canonical = page.locator('link[rel="canonical"]');
    await expect(canonical).toHaveAttribute('href', 'https://typing.nungdees.xyz');

    // Alternate links (hreflang)
    const altLao = page.locator('link[rel="alternate"][hreflang="lo"]');
    await expect(altLao).toHaveAttribute('href', 'https://typing.nungdees.xyz');

    // Structured Data JSON-LD
    const jsonLd = page.locator('script[type="application/ld+json"]');
    await expect(jsonLd).toBeAttached();
    const jsonContent = await jsonLd.textContent();
    expect(jsonContent).toContain('WebApplication');
    expect(jsonContent).toContain('FAQPage');

    // Google Analytics (gtag.js)
    const gtagScript = page.locator('script[src*="googletagmanager.com/gtag/js?id=G-853N51294D"]');
    await expect(gtagScript).toBeAttached();
  });

  test('should serve dynamic XML sitemap with correct content-type', async ({ request }) => {
    const response = await request.get('/sitemap.xml');
    expect(response.status()).toBe(200);
    expect(response.headers()['content-type']).toContain('application/xml');
    const text = await response.text();
    expect(text).toContain('<?xml');
    expect(text).toContain('<urlset');
    expect(text).toContain('https://typing.nungdees.xyz/');
  });

  test('should serve robots.txt pointing to sitemap.xml', async ({ request }) => {
    const response = await request.get('/robots.txt');
    expect(response.status()).toBe(200);
    const text = await response.text();
    expect(text).toContain('User-agent: *');
    expect(text).toContain('Sitemap: https://typing.nungdees.xyz/sitemap.xml');
  });

  test('should dynamically verify Google Search Console HTML verification file', async ({ request }) => {
    const response = await request.get('/google1234567890abcdef.html');
    expect(response.status()).toBe(200);
    const text = await response.text();
    expect(text).toBe('google-site-verification: google1234567890abcdef.html');
  });
});
