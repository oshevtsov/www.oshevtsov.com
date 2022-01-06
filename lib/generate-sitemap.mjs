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
    `Sitemap: ${rootURL}/sitemap.xml`,
  ]
  const sitemapBits = [
    `<?xml version="1.0" encoding="UTF-8"?>`,
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
  ]
  pages.forEach((page) => {
    sitemapBits.push(`\t<url>`)
    sitemapBits.push(`\t\t<loc>${rootURL}${page}</loc>`)
    sitemapBits.push(`\t</url>`)
  })
  posts.forEach((post) => {
    sitemapBits.push(`\t<url>`)
    sitemapBits.push(`\t\t<loc>${rootURL}/blog/${post}</loc>`)
    sitemapBits.push(`\t</url>`)
  })
  sitemapBits.push(`</urlset>`)

  fs.writeFileSync('public/sitemap.xml', sitemapBits.join('\n'))
  fs.writeFileSync('public/robots.txt', robotsBits.join('\n'))
}
