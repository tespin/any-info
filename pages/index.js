import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Head>
        <title>AnyInfo</title>
        <meta name="description" content="Web app for demystifying privacy policies." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <h1>Demystify any privacy policy with AnyInfo</h1>
        <p>AnyInfo analyzes privacy policies to tell you what data is being collected, when, and how you can protect yourself.</p>
        <p>Paste your privacy policy below:</p>
        <form>
          <div>
            <label htmlFor='policy'>Privacy Policy</label>
            <textarea id='policy' rows='5'></textarea>
          </div>
          <button>Analyze policy</button>
        </form>
      </main>
    </>
  )
}
