import { Root, Content, Parent } from 'mdast'
import { Node } from 'unist'

type ASTNode = Root | Content

export type {
  Root,
  Content,
  ASTNode,
}

export function cleanNodes(node: ASTNode): void {
  delete node.position
  if (isParent(node)) {
    node.children.forEach(child => cleanNodes(child))
  }
}

export function isParent(node: Parent | Node): node is Parent {
  return 'children' in node
}

export function capitalize(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1)
}

export function pathNameToTitle(pathName: string) {
  const title = ['Oleksii Shevtsov, PhD']
  const subTitleParts = pathName.split('/')
                                .filter(p => !!p)
                                .map(p => p.split('-')
                                           .map(capitalize)
                                           .join(' '))
  return title.concat(subTitleParts).join(' | ')
}

type StringOrUndefined = string | undefined
export function combineClassNames(...classNames: StringOrUndefined[]) {
  return classNames.filter(c => !!c).join(' ')
}
