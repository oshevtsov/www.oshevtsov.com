import fs from 'fs'
import { globby } from 'globby'

const packageJSON = JSON.parse(fs.readFileSync('package.json', {encoding: 'utf8'}))
const rootURL = packageJSON.author.url

const allowedPages = [
  'pages',
  '!pages/_*',
  '!pages/**/[*',
  '!pages/api',
  '!pages/404.js',
]

function processPathXMLForSEO(path) {
  return path
    .replace('pages', '')
    .replace('.tsx', '')
    .replace('.md', '')
    .replace('/index', '')
}

export async function generateSitemap() {
  const posts = fs.readdirSync('posts').map(processPathXMLForSEO)
  const pages = (await globby(allowedPages)).map(processPathXMLForSEO)
  const robotsBits = [
    `User-agent: *`,
    `Disallow: /api`,
    '',
    `User-agent: *`,
    `Allow: /`,
    '',
    `Sitemap: ${rootURL}/sitemap.xml`,
  ]
  const sitemapBits = [
    `<?xml version="1.0" encoding="UTF-8"?>\n`,
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">`,
  ]
  pages.forEach((page) => {
    sitemapBits.push(`<url>`)
    sitemapBits.push(`<loc>${rootURL}${page}/</loc>`)
    sitemapBits.push(`<changefreq>daily</changefreq>`)
    sitemapBits.push(`<priority>0.7</priority>`)
    sitemapBits.push(`</url>`)
  })
  posts.forEach((post) => {
    sitemapBits.push(`<url>`)
    sitemapBits.push(`<loc>${rootURL}/blog/${post}/</loc>`)
    sitemapBits.push(`<changefreq>daily</changefreq>`)
    sitemapBits.push(`<priority>0.7</priority>`)
    sitemapBits.push(`</url>`)
  })
  sitemapBits.push(`</urlset>`)

  fs.writeFileSync('public/sitemap.xml', sitemapBits.join(''))
  fs.writeFileSync('public/robots.txt', robotsBits.join('\n'))
}
