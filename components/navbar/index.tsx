import type { NextComponentType } from 'next'
import Link from 'next/link'
import styles from './navbar.module.scss'

const NavBar: NextComponentType = () => {
  return (
    <header className={styles.header}>
      <div className={styles.handle}>@oshevtsov</div>
      <div className={styles.container}>
        <input id="nav-burger" type="checkbox" className={styles.checkbox} />
        <label htmlFor="nav-burger" className={styles.navButton}>
          <span className={styles.navIcon}>&nbsp;</span>
        </label>
        <nav className={styles.navigation}>
          <Link href="/about">
            <a>About me</a>
          </Link>
          <Link href="/cv">
            <a>CV</a>
          </Link>
          <Link href="/blog">
            <a>Blog</a>
          </Link>
          <Link href="/contact">
            <a>Contact</a>
          </Link>
        </nav>
        {/*
        <button type="button" className={styles.mode}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><circle cx="256" cy="256" r="208" fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="32"/><path d="M256 464c-114.88 0-208-93.12-208-208S141.12 48 256 48z"/></svg>
        </button>
        */}
      </div>
    </header>
  )
}

export default NavBar
