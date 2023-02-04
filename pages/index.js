import Head from 'next/head'
import Image from 'next/image'
import Card from '@/components/home/Card';
import { useState } from 'react';
import { Inter } from '@next/font/google'

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [policy, setPolicy] = useState('');
  const [results, setResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  
  // const results = [
  //   {
  //       "What data is being collected?": "Personal Information, Communication Information, Social Information, Technical Information, Log data, Usage data, Device information, Cookies, Analytics, Online Tracking and Do Not Track Signals",
  //   },
  //   {
  //       "When is the data collected?": "When you create an account to use our Services, communicate with us, interact with our Social Media Pages, visit, use, and interact with the Services",
  //   },
  //   {
  //       "How can I opt-out?": "You can set your browser to accept all cookies, to reject all cookies, or to notify you whenever a cookie is offered so that you can decide each time whether to accept it"
  //   }
  // ];

  const textHandler = (event) => {
    setPolicy(event.target.value);
  }
  
  const generateResults = async (event) => {
    event.preventDefault();
    console.log('loading');
    setLoading(true);
    // results.map( (result) => {
    //   console.log(result);
    // })
    // results.map( (Object.entries(result)))
  
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
    // console.log(json.data);
    // console.log(JSON.parse(json.data));
    // const data = JSON.parse(JSON.parse(json));
    const data = JSON.parse(JSON.parse(json.data));
    // console.log(parsed);
    // console.log(`parsed data is type: ${typeof(parsed)}`);
    setResults(data);
    // console.log(typeof(results));
    // console.log(JSON.stringify(json));
    // console.log(`json response: ${JSON.parse(json)}`);
    // console.log(`from client ${json.data}`);
    // setResults(json.data.choices);
    // const data = JSON.parse(json.data);
    console.log('results loaded');
    // console.log(data);
    // console.log(typeof(data));

    // const tempData = [];
    // for (let d in data) {
    //   tempData.push(d);
    // }
    // console.log(tempData);
    // setResults(tempData);
    // setResults(data);
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
      <main>
        <div className="flex flex-col justify-center items-center my-32">
          <h1 className="text-5xl">Demystify any privacy policy with AnyInfo</h1>
          <p className="text-lg mt-8">AnyInfo attempts to demystify privacy policies to tell you what data is being collected, how it's being used, and how you can opt-out.</p>
          {/* <p className="mt-4">Paste your privacy policy below:</p> */}
            <div className="flex flex-col mt-8">
              <label htmlFor='policy'>Paste your privacy policy below:</label>
              <textarea value={policy} onChange={textHandler} id='policy' rows='5'></textarea>
            </div>
            <button onClick={generateResults}>Analyze policy</button>
          {showResults && (
            <div>
              {results.map( (result) => (
                <Card key={result.q} question={result.q} answer={result.a}/>
              ))}
            </div>
          )}
        </div>
      </main>
    </>
  )
}
