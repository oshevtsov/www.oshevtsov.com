import { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Layout from '../components/layout'
import styles from '../styles/about.module.scss'

const About: NextPage = () => {
  return (
    <Layout
      contentClassName={styles.content}
      containerClassName={styles.container}
    >
      <Head>
        <meta name="description" content="About Oleksii Shevtsov, PhD" />
        <meta key="og:description" property="og:description" content="About Oleksii Shevtsov, PhD" />
      </Head>

      <div className={styles.img}>
        <Image
          src="/images/oleksii-mobile.webp"
          alt="Oleksii Shevtsov"
          width={360}
          height={325}
          priority
        />
      </div>
      <h1 className={styles.mt4}>About me</h1>
      <section className={styles.about}>
        <p>
          My name is Oleksii Shevtsov. I was born in Kyiv, Ukraine, at the end
          of 1980s. I have always been a curious child and most of all wanted to
          understand how the world around me really works. Superficial knowledge
          was not enough, and I was ready to dig much deeper to satisfy my
          curiosity. It was inevitable that I would end up in a scientific
          career later on.
        </p>
        <p>
          When the time came to choose my first profession, I made a decision to
          enter the Physics Department of the Taras Shevchenko National
          University of Kyiv. It would be a lie to say that I fully understood
          the implications and consequences of this choice, let alone what to do
          with it after the graduation. Fast-forward 10 years, I have defended
          my PhD in Theoretical Physics, and worked as a post-doc (fixed-term
          contract researcher) at some of the best universities in Sweden and
          the USA. The scientific career seemed to shape up, but I was not
          satisfied. Getting a permanent job in academia looked like a step
          backward. Heavy bureaucracy and a permanent race for funding did not
          seem like a good use of my time. I was up for a new challenge.
        </p>
        <p>
          The new chapter of my life started in 2018, when I decided to enter
          the private sector job market. I knew the competition was high, and I
          really wanted to leverage my scientific experience to bring a new
          perspective and unique approach to tackling some of the
          industry&apos;s toughest problems. I had extensive experience in data
          analysis and several programming languages, so becoming a software
          engineer was a natural choice. This was a new field for me, though,
          where quality code and software design matter a lot. I made my
          research to identify what it really means to be a{' '}
          <em>good software engineer</em> and have been on this path ever since.
        </p>
        <p>
          For my post-academic journey I moved in August 2018 to Gothenburg,
          Sweden, where I am living with my wife now. In my first non-academic
          job I worked as a software engineering consultant in the field of
          embedded systems in the automotive sector. We developed software for
          real-time head/eye/gaze tracking used as a basis for the future active
          driver assistance systems (ADAS). In January 2020 I joined Jeppesen
          Systems, a subsidiary of Boeing, as a software application engineer. I
          am working on implementing a system for real-time tracking and
          adjustment of the monthly schedule and salary for the crew members of
          one of the biggest cargo carriers in the world.
        </p>
        <p>
          The path I have taken is far from straight, and I could never imagine
          to come to where I am now. I enjoy solving difficult problems,
          designing complex systems, and use software as a tool to make it
          possible. The curiosity and hunger for knowledge that brought me here
          are even stronger than before. As a big fan of new and emerging
          technologies closely intertwined with science, I am eager to see what
          the future holds for us and make my contribution to bring this to
          reality.
        </p>
        <a
          href="/files/CV_SHEVTSOV.pdf"
          role="button"
          className={styles.cv}
          download
        >
          Download CV
        </a>
      </section>
    </Layout>
  )
}

export default About
