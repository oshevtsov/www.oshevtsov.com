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
