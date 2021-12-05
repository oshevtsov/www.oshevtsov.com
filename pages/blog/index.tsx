import { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link'
import Layout from '../../components/layout';
import styles from '../../styles/blog/index.module.scss';

const Blog: NextPage = () => {
  return (
    <Layout
      contentClassName={styles.content}
      containerClassName={styles.container}
    >
      <Head>
        <meta name="description" content="Blog" />
      </Head>

      <h1>Blog</h1>
      <section className={styles.feed}>
        <h2>Latest updates</h2>
        <article className={styles.card}>
          <Link href="#">
            <a>
              <h3>
                Amet placeat earum ipsa sunt iusto? Distinctio sequi omnis id at
                rem labore Facere ullam
              </h3>
            </a>
          </Link>
          <p>
            Amet placeat earum ipsa sunt iusto? Distinctio sequi omnis id at rem
            labore Facere ullam error eum ex et Ipsa debitis eum ea cupiditate
            explicabo facilis accusamus natus excepturi Corrupti Amet placeat
            earum ipsa sunt iusto? Distinctio sequi omnis id at rem labore
            Facere ullam error eum ex et Ipsa debitis eum ea cupiditate
            explicabo facilis accusamus natus excepturi Corrupti
          </p>
          <small>
            <span>Published on 05/12/2021</span>
            <span>Last updated on 05/12/2021</span>
          </small>
        </article>
        <article className={styles.card}>
          <Link href="#">
            <a>
              <h3>
                Amet placeat earum ipsa sunt iusto? Distinctio sequi omnis id at
                rem labore Facere ullam
              </h3>
            </a>
          </Link>
          <p>
            Amet placeat earum ipsa sunt iusto? Distinctio sequi omnis id at rem
            labore Facere ullam error eum ex et Ipsa debitis eum ea cupiditate
            explicabo facilis accusamus natus excepturi Corrupti Amet placeat
            earum ipsa sunt iusto? Distinctio sequi omnis id at rem labore
            Facere ullam error eum ex et Ipsa debitis eum ea cupiditate
            explicabo facilis accusamus natus excepturi Corrupti
          </p>
          <small>
            <span>Published on 05/12/2021</span>
            <span>Last updated on 05/12/2021</span>
          </small>
        </article>
      </section>
    </Layout>
  );
};

export default Blog;
