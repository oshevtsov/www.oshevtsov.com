import type { NextPage } from 'next'
import Head from 'next/head'
import ProfileImageArtDirection from '../components/profile-image'
import Layout from "../components/layout";
import styles from '../styles/index.module.scss'
import packageJSON from '../package.json'

const jsonLD = {
  "@context": "http://schema.org",
  "@type": "WebSite",
  "name": "Homepage of Oleksii Shevtsov, PhD",
  "url": packageJSON.author.url,
  "sameAs": [
    "https://www.linkedin.com/in/oleksii-shevtsov",
    "https://github.com/oshevtsov",
    "https://gitlab.com/oshevtsov",
    "https://twitter.com/OleksiiShevtsov",
  ],
  "author": {
    "@type": "Person",
    familyName: "Shevtsov",
    givenName: "Oleksii",
    email: "alex.shevtsov1988@gmail.com",
  },
}

const Home: NextPage = () => {
  return (
    <Layout contentClassName={styles.content} containerClassName={styles.container}>
      <Head>
        <meta name="description" content="Homepage of Oleksii Shevtsov, PhD" />
        <meta key="og:description" property="og:description" content="Homepage of Oleksii Shevtsov, PhD" />
        <script type="application/ld+json" key="json-ld">
          {JSON.stringify(jsonLD)}
        </script>
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
