import type { NextComponentType } from 'next'
import styles from './footer.module.scss'

const Footer: NextComponentType = () => {
  return (
    <footer className={styles.footer}>
      <p>&copy; Oleksii Shevtsov</p>
    </footer>
  )
}

export default Footer;
