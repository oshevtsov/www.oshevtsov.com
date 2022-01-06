import { useRouter } from 'next/router'
import { ReactNode } from 'react'
import Head from 'next/head'
import Footer from '../footer'
import NavBar from '../navbar'
import styles from './layout.module.scss'
import { pathNameToTitle, combineClassNames } from '../../lib/utils'
import packageJSON from '../../package.json'

interface Props {
  contentClassName?: string;
  containerClassName?: string;
  children?: ReactNode;
}

const domainURL = packageJSON.author.url

const Layout = ({ contentClassName, containerClassName, children }: Props) => {
  const router = useRouter()
  const relativePath = router.asPath
  const title = pathNameToTitle(relativePath)
  const bodyClassName = combineClassNames(styles.container, containerClassName)
  const mainClassName = combineClassNames(styles.main, contentClassName)

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content="Homepage of Oleksii Shevtsov, PhD" />
        <link rel="icon" sizes="32x32" type="image/png" href="/favicon-32x32.png" />
        <link rel="icon" sizes="16x16" type="image/png" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5e81ac" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="canonical" href={`${domainURL}${relativePath}`} />
        <meta name="theme-color" content="#ffffff" />
        <meta name="msapplication-TileColor" content="#2b5797" />
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="author" content="Oleksii Shevtsov" />
        <meta property="og:title" content={title} />
        <meta key="og:description" property="og:description" content="Homepage of Oleksii Shevtsov, PhD" />
        <meta property="og:locale" content="en-US" />
        <meta property="og:image" content={`${domainURL}/og_image.png`} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="627" />
        <meta property="og:url" content={`${domainURL}${relativePath}`} />
        <meta property="twitter:card" content="summary_large_image" />
      </Head>

      <div className={bodyClassName}>
        <NavBar />
        <main className={mainClassName}>{children}</main>
        <Footer />
      </div>
    </>
  )
}

export default Layout
