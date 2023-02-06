import Head from 'next/head'
import Image from 'next/image'
import Card from '@/components/home/Card';
import { useState } from 'react';

import localFont from '@next/font/local';
const calluna = localFont({ 
  src: '../public/fonts/Calluna-Regular.otf',
  variable: '--font-calluna'  
});

import { Plus_Jakarta_Sans }  from '@next/font/google';
const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-jakarta-sans'
})

// import { Inter } from '@next/font/google'

// const inter = Inter({ subsets: ['latin'] });

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
    const data = JSON.parse(JSON.parse(json.data));

    setResults(data);
    console.log('results loaded');
    setLoading(false);
    setShowResults(true);
  }

  return (
    <>
      <Head>
        <title>AnyInfo</title>
        <meta name="description" content="Web app for demystifying privacy policies." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="font-jakarta">
        <div className="flex flex-col justify-center items-center">
          <div className="flex flex-col justify-center items-center text-center my-32 text-white max-w-xl">
            <h1 className={`font-calluna text-6xl`}>Demystify any privacy policy with AnyInfo</h1>
            <p className="text-lg mt-8 max-w-2xl">AnyInfo attempts to demystify privacy policies to tell you what data is being collected, how it's being used, and how you can opt-out.</p>
            {/* <p className="mt-4">Paste your privacy policy below:</p> */}
              <div className="flex flex-col mt-12 w-96">
                <label className= "opacity-60" htmlFor='policy'>Paste your privacy policy below:</label>
                <textarea className="bg-transparent border-white rounded mt-2 focus:outline-none focus:ring  focus:ring-white" value={policy} onChange={textHandler} id='policy' rows='5'></textarea>
              </div>
              <div>
              <button className="bg-gradient-to-br from-[#3AAE62] to-[#9F4CC7] focus:outline-none focus:ring  focus:ring-white mt-6 px-0.5 py-3 rounded  ">
                <span className="bg-black hover:bg-gradient-to-br hover:text-black from-[#3AAE62] to-[#9F4CC7] px-10 py-3 rounded">Analyze policy</span>
              </button>
              {/* <div className="bg-gradient-to-br from-[#3AAE62] to-[#9F4CC7] mt-4 p-0.5 rounded">
                <button className="bg-black hover:bg-gradient-to-br from-[#3AAE62] to-[#9F4CC7] hover:text-black h-full w-full px-10 py-2.5 rounded" onClick={generateResults}>
                  <span>Analyze policy</span>
                </button>
              </div> */}
              </div>
            {showResults && (
              <div>
                {results.map( (result) => (
                  <Card key={result.q} question={result.q} answer={result.a}/>
                  ))}
              </div>
            )}
            </div>
        </div>
      </main>
    </>
  )
}
