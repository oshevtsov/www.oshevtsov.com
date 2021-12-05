import type { NextPage } from 'next'
import Head from 'next/head'
import ProfileImageArtDirection from '../components/profile-image'
import Layout from "../components/layout";
import styles from '../styles/index.module.scss'

const Home: NextPage = () => {
  return (
    <Layout contentClassName={styles.content} containerClassName={styles.container}>
      <Head>
        <meta name="description" content="Homepage of Oleksii Shevtsov, PhD" />
      </Head>

      <div className={styles.text}>
        <h1>
          Hi, I am Oleksii.
        </h1>
        <h2 className={styles.mt2}>
          Software engineer, technology enthusiast, and avid learner based in Sweden.
        </h2>
      </div>
      <ProfileImageArtDirection className={styles.img} />
    </Layout>
  )
}

export default Home
