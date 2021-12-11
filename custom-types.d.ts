import { InFrontMatter } from './lib/posts'

declare module 'vfile' {
  interface VFileDataMap {
    matter: InFrontMatter
  }
}
