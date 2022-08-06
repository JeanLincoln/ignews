import Head from '../../node_modules/next/head'
import styles from './styles/home.module.scss'

export default function Home() {
  return (
    <>
      <Head>
          <title>Inicio - ig.news</title>
        </Head>
      <h1 className={styles.title}>
        Hello <span>world</span> NextJS</h1>
    </>
      )
}
