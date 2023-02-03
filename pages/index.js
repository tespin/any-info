import Head from 'next/head'
import Image from 'next/image'
import Card from '@/components/home/Card';
import { useState } from 'react';
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [policy, setPolicy] = useState('');
  const [results, setResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  
  const textHandler = (event) => {
    setPolicy(event.target.value);
  }
  
  const generateResults = async (event) => {
    event.preventDefault();
    setLoading(true);
  
    const res = await fetch('/api/demystify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        policy 
      })
    });

    if (!res.ok) {
      throw new Error(res.statusText);
    }

    const json = await res.json();
    // setResults(json.data.choices);
    const parsed = JSON.parse(json.data);
    // console.log(parsed.choices[0]);
    // console.log(json.data.id);
    setLoading(false);
    setShowResults(true);

    // if error, result returns { data: error: message}
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
        {showResults && (
          <div>
            {results.map( ({q, a}) => (
              <Card key={q} question={q} answer={a}/>
            ))}
          </div>
        )}
      </main>
    </>
  )
}
