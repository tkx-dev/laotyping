export default defineEventHandler((event) => {
  const url = getRequestURL(event)
  const match = url.pathname.match(/^\/(google[a-zA-Z0-9_-]+)\.html$/)
  if (match) {
    setHeader(event, 'Content-Type', 'text/html; charset=utf-8')
    return `google-site-verification: ${match[1]}.html`
  }
})
