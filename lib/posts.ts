import fs from 'fs'
import path from 'path'
import { toVFile as vfile } from 'to-vfile'
import { matter, VFile } from 'vfile-matter'
import { format, formatISO, compareDesc } from 'date-fns'
import { unified, Transformer } from 'unified'
import remarkParse from 'remark-parse'
import remarkUnwrapImages from 'remark-unwrap-images'
import { visit } from 'unist-util-visit'
import { imageSize } from 'image-size'
import { cleanNodes, Root } from './utils'
import hljs from 'highlight.js'

const postsDirectory: string = path.join(process.cwd(), 'posts')
const publicDirectory: string = path.join(process.cwd(), 'public')
const stripMdExtension = (fileName: string): string => fileName.replace(/\.md$/, '')

function parseMarkdown(fullPath: string): VFile {
  return matter(vfile.readSync(fullPath), { strip: true })
}

export interface InFrontMatter {
  title: string
  published: Date
  updated: Date
  abstract: string
}

interface OutFrontMatter {
  title: string
  abstract: string
  published: {
    dateTime: string
    display: string
  }
  updated: {
    dateTime: string
    display: string
  }
}

interface InPostCardData {
  id: string
  frontMatter?: InFrontMatter
}

interface OutPostCardData {
  id: string
  frontMatter?: OutFrontMatter
}

export type PostCardData = OutPostCardData

function stringifyFrontMatter(inFrontMatter: InFrontMatter): OutFrontMatter {
  const dateTimeFormatOpts: Record<string, any> = { representation: 'date' }
  const displayFormat: string = 'LLLL d, yyyy'
  return {
    title: inFrontMatter.title,
    abstract: inFrontMatter.abstract,
    published: {
      dateTime: formatISO(inFrontMatter.published, dateTimeFormatOpts),
      display: format(inFrontMatter.published, displayFormat),
    },
    updated: {
      dateTime: formatISO(inFrontMatter.updated, dateTimeFormatOpts),
      display: format(inFrontMatter.updated, displayFormat),
    },
  }
}

export function getSortedPostsData(): PostCardData[] {
  const fileNames = fs.readdirSync(postsDirectory)
  const allPostsData: InPostCardData[] = fileNames.map((fileName) => {
    const id = stripMdExtension(fileName)
    const fullPath = path.join(postsDirectory, fileName)
    const { data } = parseMarkdown(fullPath)
    const frontMatterData = data.matter ? { frontMatter: data.matter } : {}
    return {
      id,
      ...frontMatterData,
    }
  })

  return allPostsData
    .sort((left: InPostCardData, right: InPostCardData): number => {
      const leftUpdated = left.frontMatter?.updated
      const rightUpdated = right.frontMatter?.updated
      if (leftUpdated && rightUpdated)
        return compareDesc(leftUpdated, rightUpdated)
      return 0
    })
    .map((inPostData: InPostCardData): PostCardData => {
      const outPostData: PostCardData = { id: inPostData.id }
      const inFrontMatter = inPostData.frontMatter
      if (inFrontMatter) {
        outPostData.frontMatter = stringifyFrontMatter(inFrontMatter)
      }
      return outPostData
    })
}

export function getAllPostIds() {
  const fileNames = fs.readdirSync(postsDirectory)
  return fileNames.map((fileName) => {
    return {
      params: {
        id: stripMdExtension(fileName),
      },
    }
  })
}

export interface PostData {
  frontMatter: OutFrontMatter | Record<string, never>
  mdRoot: Root
}

function addImageMetadata(): Transformer<Root, Root> {
  return (tree: Root, _) => {
    visit(tree, 'image', (node) => {
      const imageURL = path.join(publicDirectory, node.url)
      const { width, height } = imageSize(imageURL)
      node.data = {
        width,
        height
      }
    })
  }
}

function highlightCodeBlocks(): Transformer<Root, Root> {
  return (tree: Root, _) => {
    visit(tree, 'code', (node) => {
      const rawCode = node.value
      const lang = node.lang
      let highlightedCode = rawCode

      if (lang) {
        highlightedCode = hljs.highlight(rawCode, {language: lang}).value
      }
      node.value = highlightedCode
    })
  }
}

export function getPostData(id: string | string[]): PostData {
  const postId = typeof id === 'string' ? id : id.join('-')
  const fullPath = path.join(postsDirectory, `${postId}.md`)
  const file = parseMarkdown(fullPath)
  const frontMatter = file.data.matter ? stringifyFrontMatter(file.data.matter) : {}
  const pipeline = unified()
    .use(remarkParse)
    .use(remarkUnwrapImages)
    .use(addImageMetadata)
    .use(highlightCodeBlocks)
  const mdRoot: Root = pipeline.runSync(pipeline.parse(file))
  cleanNodes(mdRoot)

  return {
    frontMatter,
    mdRoot,
  }
}
