import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { isParent, ASTNode, Content } from '../../lib/utils'
import styles from '../../styles/blog/post.module.scss'

type MDPropsWithChildren = React.PropsWithChildren<{}>
type HeadingDepth = 1 | 2 | 3 | 4 | 5 | 6

const MDRoot = ({ children }: MDPropsWithChildren) => <>{children}</>
const MDParagraph = ({ children }: MDPropsWithChildren) => <p>{children}</p>
const MDEmphasis = ({ children }: MDPropsWithChildren) => <em>{children}</em>
const MDStrong = ({ children }: MDPropsWithChildren) => <strong>{children}</strong>
const MDBlockquote = ({ children }: MDPropsWithChildren) => <blockquote>{children}</blockquote>
const MDOrderedList = ({ children }: MDPropsWithChildren) => <ol>{children}</ol>
const MDUnorderedList = ({ children }: MDPropsWithChildren) => <ul>{children}</ul>
const MDListItem = ({ children }: MDPropsWithChildren) => <li>{children}</li>
const MDHeading1 = ({ children }: MDPropsWithChildren) => <h1>{children}</h1>
const MDHeading2 = ({ children }: MDPropsWithChildren) => <h2>{children}</h2>
const MDHeading3 = ({ children }: MDPropsWithChildren) => <h3>{children}</h3>
const MDHeading4 = ({ children }: MDPropsWithChildren) => <h4>{children}</h4>
const MDHeading5 = ({ children }: MDPropsWithChildren) => <h5>{children}</h5>
const MDHeading6 = ({ children }: MDPropsWithChildren) => <h6>{children}</h6>
const getMDHeading = (depth: HeadingDepth) => {
  switch(depth) {
    case 1:
      return MDHeading1
    case 2:
      return MDHeading2
    case 3:
      return MDHeading3
    case 4:
      return MDHeading4
    case 5:
      return MDHeading5
    case 6:
      return MDHeading6
  }
}

interface LinkProps {
  url: string
  title?: string
}
type MDLinkProps = React.PropsWithChildren<LinkProps>

function isURLRelative(url: string): boolean {
  return url.startsWith('/')
}

const MDLink = ({ children, url, title }: MDLinkProps) => {
  const isRelative = isURLRelative(url)
  return isRelative ? (
    <Link href={url}>
      <a title={title}>
        {children}
      </a>
    </Link>
  ) : (
    <a href={url} title={title} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  )
}

const MDUnknownParent = () => null

interface ParentNodeData {
  component: React.ComponentType<any>
  props?: Record<string, any>
}

const getMarkdownASTParentNodeData = (ast: ASTNode): ParentNodeData => {
  switch (ast.type) {
    case 'root':
      return { component: MDRoot, }

    case 'paragraph':
      return { component: MDParagraph, }

    case 'emphasis':
      return { component: MDEmphasis, }

    case 'strong':
      return { component: MDStrong, }
    
    case 'blockquote':
      return { component: MDBlockquote, }

    case 'heading':
      const { depth = 2 } = ast
      return { component: getMDHeading(depth), }

    case 'link':
      const { url, title } = ast
      return { component: MDLink, props: { url, title, } }

    case 'list':
      const { ordered } = ast
      return { component: ordered ? MDOrderedList : MDUnorderedList, }

    case 'listItem':
      return { component: MDListItem, }

    default:
      console.log(`Will not render - unhandled node type: ${ast.type}`)
      return { component: MDUnknownParent, }
  }
}

interface MarkdownProps {
  ast: ASTNode
}

const MarkdonwASTLiteralNode = (props: MarkdownProps) => {
  const { ast } = props
  switch (ast.type) {
    case 'text':
      const { value: textValue } = ast
      return <>{textValue}</>

    case 'inlineCode':
      const { value: codeValue } = ast
      return <code>{codeValue}</code>

    case 'code':
      const { value, lang } = ast
      return <pre><code>{value}</code></pre>

    case 'image':
      const { url, alt, title, data } = ast
      const optionalAttrs: Record<string, string | number> = {}
      if (title) optionalAttrs.title = title
      if (data) {
        if (typeof data.width === 'number') optionalAttrs.width = data.width
        if (typeof data.height === 'number') optionalAttrs.height = data.height
      }
      const shouldDisplay = (optionalAttrs.width > 0) && (optionalAttrs.height > 0)
      return shouldDisplay ? (
        <figure className={styles.image}>
          <Image
            src={url}
            alt={alt ? alt : ""}
            layout="responsive"
            {...optionalAttrs}
          />
          {
            optionalAttrs.title
              ? <figcaption>{optionalAttrs.title}</figcaption>
              : null
          }
        </figure>
      ) : null

    default:
      console.log(`Will not render - unhandled node type: ${ast.type}`)
      return null
  }
}

const MarkdownASTNode = (props: MarkdownProps) => {
  const { ast } = props
  if (isParent(ast)) {
    const nodeData = getMarkdownASTParentNodeData(ast)
    const MarkdownASTParentNode = nodeData.component
    const props = nodeData.props ? nodeData.props : {}
    const { children } = ast
    return (
      <MarkdownASTParentNode {...props}>
        {children.map((child: Content, index: number) => (
          <MarkdownASTNode
            key={`${child.type}-${index}`}
            ast={child}
          />
        ))}
      </MarkdownASTParentNode>
    )
  }
  return <MarkdonwASTLiteralNode {...props} />
}

export default MarkdownASTNode
