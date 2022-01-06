import React from 'react'
import { NextPage, GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head'
import { useRouter } from 'next/router'
import Layout from '../../components/layout';
import styles from '../../styles/blog/post.module.scss'

import MarkdownASTNode from '../../components/markdown-ast-node'
import Date from '../../components/date'
import { getAllPostIds, getPostData, PostData } from '../../lib/posts'

export const getStaticProps: GetStaticProps = async (context) => {
  const postId = context.params?.id

  if (postId) {
    const postData = getPostData(postId)
    return {
      props: {
        ...postData,
      },
    }
  }

  return {
    notFound: true,
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getAllPostIds()
  return {
    paths,
    fallback: false,
  }
}

const Post: NextPage<PostData> = ({ frontMatter, mdRoot }) => {
  const router = useRouter()

  return (
    <Layout
      contentClassName={styles.content}
      containerClassName={styles.container}
    >
      <Head>
        <meta name="description" content={frontMatter.abstract} />
        <meta key="og:description" property="og:description" content={frontMatter.abstract} />
      </Head>

      <div className={styles.back}>
        <button role="button" onClick={router.back}>&larr; Back</button>
      </div>
      <div className={styles.frontmatter}>
        <h1>{frontMatter.title}</h1>
        <p>{frontMatter.abstract}</p>
        <small>
          <span>
            Published:{' '}
            <Date
              dateTime={frontMatter.published?.dateTime}
              display={frontMatter.published?.display}
            />
          </span>
          <span>
            Updated:{' '}
            <Date
              dateTime={frontMatter.updated?.dateTime}
              display={frontMatter.updated?.display}
            />
          </span>
        </small>
      </div>
      <div className={styles.markdown}>
        <MarkdownASTNode ast={mdRoot} />
      </div>
    </Layout>
  )
}

export default Post
