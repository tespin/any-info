import Head from 'next/head'
import Image from 'next/image'
import { useState } from 'react';
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  const [policy, setPolicy] = useState('');
  const [results, setResults] = useState([]);
  
  const textHandler = (event) => {
    console.log(event.target.value);
    setPolicy(event.target.value);
  }
  
  const generateResults = async (event) => {
    event.preventDefault();
  
    const res = await fetch('/api/demystify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ policy })
    });

    const json = await res.json();
    console.log(json);
    // const json = await res.json();
    // console.log(json.data);
  }

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
            <textarea value={policy} onChange={textHandler} id='policy' rows='5'></textarea>
          </div>
          <button onClick={generateResults}>Analyze policy</button>
        </form>
      </main>
    </>
  )
}
