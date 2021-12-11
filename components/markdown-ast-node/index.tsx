import React from 'react'
import { isParent, ASTNode, Content } from '../../lib/utils'

type MDPropsWithChildren = React.ComponentPropsWithoutRef<React.ElementType>
type HeadingDepth = 1 | 2 | 3 | 4 | 5 | 6

const MDRoot = ({ children }: MDPropsWithChildren) => <>{children}</>
const MDParagraph = ({ children }: MDPropsWithChildren) => <p>{children}</p>
const MDEmphasis = ({ children }: MDPropsWithChildren) => <em>{children}</em>
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
const MDUnknownParent = () => null

const getMarkdownASTParentNode = (ast: ASTNode) => {
  switch (ast.type) {
    case 'root':
      return MDRoot

    case 'paragraph':
      return MDParagraph

    case 'emphasis':
      return MDEmphasis

    case 'heading':
      const { depth = 2 } = ast
      return getMDHeading(depth)

    default:
      console.log(`Will not render - unhandled node type: ${ast.type}`)
      return MDUnknownParent
  }
}

interface MarkdownProps {
  ast: ASTNode
}

const MarkdonwASTLiteralNode = (props: MarkdownProps) => {
  const { ast } = props
  switch (ast.type) {
    case 'text':
      const { value } = ast
      return <>{value}</>

    default:
      console.log(`Will not render - unhandled node type: ${ast.type}`)
      return null
  }
}

const MarkdownASTNode = (props: MarkdownProps) => {
  const { ast } = props
  if (isParent(ast)) {
    const MarkdownASTParentNode = getMarkdownASTParentNode(ast)
    const { children } = ast
    return (
      <MarkdownASTParentNode>
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
