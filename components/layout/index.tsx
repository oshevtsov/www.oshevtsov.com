import { useRouter } from 'next/router'
import { ReactNode } from 'react'
import Head from 'next/head'
import Footer from '../footer'
import NavBar from '../navbar'
import styles from './layout.module.scss'
import { pathNameToTitle, combineClassNames } from '../../lib/utils'

interface Props {
  contentClassName?: string;
  containerClassName?: string;
  children?: ReactNode;
}

const Layout = ({ contentClassName, containerClassName, children }: Props) => {
  const router = useRouter()
  const title = pathNameToTitle(router.pathname)
  const bodyClassName = combineClassNames(styles.container, containerClassName)
  const mainClassName = combineClassNames(styles.main, contentClassName)

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content="Homepage of Oleksii Shevtsov, PhD" />
        <link rel="icon" href="/favicon.ico" />
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
