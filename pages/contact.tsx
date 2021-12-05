import { ReactNode } from 'react'
import type { NextPage } from 'next'
import Head from 'next/head'
import ProfileImageArtDirection from '../components/profile-image'
import Layout from '../components/layout'
import GitHubIcon from '../components/icons/github'
import GitLabIcon from '../components/icons/gitlab'
import LinkedInIcon from '../components/icons/linkedin'
import EmailIcon from '../components/icons/email'
import styles from '../styles/contact.module.scss'

interface ContactData {
  url: string;
  displayUrl: string;
  icon: ReactNode;
}

const contacts: ContactData[] = [
  {
    url: "https://www.linkedin.com/in/oleksii-shevtsov",
    displayUrl: "linkedin.com/in/oleksii-shevtsov",
    icon: <LinkedInIcon />,
  },
  {
    url: "https://github.com/oshevtsov",
    displayUrl: "github.com/oshevtsov",
    icon: <GitHubIcon />,
  },
  {
    url: "https://gitlab.com/oshevtsov",
    displayUrl: "gitlab.com/oshevtsov",
    icon: <GitLabIcon />,
  },
  {
    url: "alex.shevtsov1988@gmail.com",
    displayUrl: "alex.shevtsov1988@gmail.com",
    icon: <EmailIcon />,
  },
]

function makeListItem({ url, displayUrl, icon }: ContactData) {
  const isEmail = url.includes('@')
  const hrefPrefix = isEmail ? 'mailto: ' : ''
  const href = hrefPrefix + url

  return (
    <li key={url}>
      <span className={styles.icon}>{icon}</span> &nbsp; <a href={href} target="_blank" rel="noopener noreferrer">{displayUrl}</a>
    </li>
  )
}

const Home: NextPage = () => {
  return (
    <Layout contentClassName={styles.content} containerClassName={styles.container}>
      <Head>
        <meta name="description" content="Contact" />
      </Head>

      <div className={styles.text}>
        <h1>
          Contact me
        </h1>
        <ul className={styles.contact}>
          { contacts.map(makeListItem) }
        </ul>
      </div>
      <ProfileImageArtDirection className={styles.img} />
    </Layout>
  )
}

export default Home

