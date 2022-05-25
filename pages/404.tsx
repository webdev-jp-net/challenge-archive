import type { NextPage } from 'next'
import Head from 'next/head'
import Link from "next/link";
import styles from '../styles/Home.module.css'


const NotFound: NextPage = () => {
  return (
    <div className={styles.container}>
    <Head>
      <title>ページがありません</title>
    </Head>

      <h1>ページがありません</h1>
      <footer className={styles.footer}>
        <Link href={`/`}>
          <a>ホームページに戻る</a>
        </Link>
      </footer>
    </div>
  )
}

export default NotFound