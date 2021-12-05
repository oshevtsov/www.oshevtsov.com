import { useRouter } from 'next/router'
import Link from 'next/link'
import styles from './navbar.module.scss'
import { useEffect } from 'react'

const NavBar = () => {
  const router = useRouter()
  useEffect(() => {
    const pathname = router.pathname
    if (pathname !== '/') {
      const regex = /(?<=\/)\w/
      const ind = pathname.substring(1).search(regex)
      const path = ind < 0 ? pathname : pathname.substring(0, ind)
      document
        .querySelectorAll(`a[href='${path}']`)
        .forEach(el => el?.classList.add(styles['nav__current-item']))
    }
  })

  return (
    <header>
      <nav className={styles['nav']}>
        <div className={styles['nav__left']}>
          <Link href="/">
            <a>@oshevtsov</a>
          </Link>
        </div>
        <div className={styles['nav__right']}>
          <input
            id="nav-burger"
            type="checkbox"
            className={styles['nav__checkbox']}
          />
          <label htmlFor="nav-burger" className={styles['nav__button']}>
            <span className={styles['nav__icon']}></span>
          </label>
          <div className={styles['nav__items']}>
            <Link href="/about">
              <a>About me</a>
            </Link>
            {/*
            <Link href="/cv">
              <a>CV</a>
            </Link>
            */}
            <Link href="/blog">
              <a>Blog</a>
            </Link>
            <Link href="/contact">
              <a>Contact</a>
            </Link>
            {/*
            <button type="button" className={styles.mode}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><circle cx="256" cy="256" r="208" fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="32"/><path d="M256 464c-114.88 0-208-93.12-208-208S141.12 48 256 48z"/></svg>
            </button>
            */}
          </div>
        </div>
      </nav>
    </header>
  )
}

export default NavBar
