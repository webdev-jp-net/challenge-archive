import type { NextPage } from 'next'
import Head from 'next/head'
import Link from "next/link";
import styles from '../styles/Home.module.css'
import { client } from "../libs/client"
import * as dayjs from 'dayjs'

const Home: NextPage = ({challenge}) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>何かを頑張った記録</title>
        <meta name="description" content="毎週火曜日に行う、何かを頑張る人たちの進捗報告会で発表したことのアーカイブです。" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          何かを頑張った記録
        </h1>

        <div className={styles.grid}>
          {challenge.map((article) => (
              <Link href={`/challenge/${article.id}`} key={article.id}>
                <a className={styles.card}>
                  {dayjs(article['to-be-announce']).format('YYYY年M月D日')}
                </a>
              </Link>
          ))}
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://github.com/webdev-jp-net/challenge-archive"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub: challenge-archive
        </a>
      </footer>
    </div>
  )
}

export default Home


// データをテンプレートに受け渡す部分の処理を記述します
export const getStaticProps = async () => {
  const data = await client.get({ endpoint: "challenge" });

  return {
    props: {
      challenge: data.contents,
    },
  };
};
