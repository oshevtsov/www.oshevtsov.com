import { NextPage, GetStaticProps } from 'next'
import Head from 'next/head'
import Layout from '../../components/layout'
import styles from '../../styles/blog/index.module.scss'

import PostCard from '../../components/post-card'
import { getSortedPostsData, PostCardData } from '../../lib/posts'

export const getStaticProps: GetStaticProps = async () => {
  const allPostsData = getSortedPostsData()
  return {
    props: {
      allPostsData
    }
  }
}

interface Props {
  allPostsData: PostCardData[]
}

const Blog: NextPage<Props> = ({ allPostsData }) => {
  return (
    <Layout
      contentClassName={styles.content}
      containerClassName={styles.container}
    >
      <Head>
        <meta name="description" content="Personal blog of Oleksii Shevtsov, PhD" />
        <meta key="og:description" property="og:description" content="Personal blog of Oleksii Shevtsov, PhD" />
      </Head>

      <h1>Blog</h1>
      <section className={styles.feed}>
        <h2>Latest updates</h2>
        {allPostsData.map((postData: PostCardData) => (
          <PostCard 
            key={postData.id}
            className={styles.card}
            postData={postData}
          />
        ))}
      </section>
    </Layout>
  )
}

export default Blog
