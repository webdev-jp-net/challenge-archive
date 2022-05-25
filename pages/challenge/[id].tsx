import type { NextPage } from 'next'
import Head from 'next/head'
import Link from "next/link";
import { client } from "../../libs/client"
import * as dayjs from 'dayjs'
import styles from '../../styles/Home.module.css'

const Article: NextPage = ({article}) => {


  const card = (task, type) => {
    const log = task['action-log'].filter(li => li.announce.id === article.id && li.type === type).map((log) => {
      return {
        note: log.note,
        fieldId: log.fieldId,
      };
    });
    return (
      <article className={styles.task}>
        <header>
          <span>{task.attribute.id}</span>
          {' '}:{' '}
          <span>{task.status[0]}</span>
          <h3>{task.title}</h3>
        </header>
        <ul>
          {log.map(li => (
            <li>{li.note}</li>
          ))}
        </ul>
      </article>
    )
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>{dayjs(article['to-be-announce']).format('YYYY年M月D日')}発表：頑張った記録</title>
        <meta name="description" content="毎週火曜日に行う、何かを頑張る人たちの進捗報告会で発表したことのアーカイブです。" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>{dayjs(article['to-be-announce']).format('YYYY年M月D日')}</h1>
        <article>
          <header>
            <h2 className={styles.description}>やったこと</h2>
          </header>
          <div>
          {article.report.map(({task}) => card(task, 'report'))}
          </div>
        </article>
        <article>
          <header>
            <h2 className={styles.description}>やること</h2>
          </header>
          <div className={styles.taskList}>
          {article.schedule.map(({task}) => card(task, 'schedule'))}
          </div>
        </article>
      </main>
      <footer className={styles.footer}>
        <Link href={`/`}>
          <a>一覧に戻る</a>
        </Link>
      </footer>
    </div>
  )
}

export default Article


// 静的生成のためのパスを指定します
export const getStaticPaths = async () => {
  const data = await client.get({ endpoint: "challenge" });

  const paths = data.contents.map((content) => `/challenge/${content.id}`);
  return { paths, fallback: false };
};

// データをテンプレートに受け渡す部分の処理を記述します
export const getStaticProps = async (context) => {
  const id = context.params.id;
  const data = await client.get({ endpoint: "challenge", contentId: id });

  return {
    props: {
      article: data,
    },
  };
};