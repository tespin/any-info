import Head from 'next/head'
import Image from 'next/image'
import Card from '@/components/home/Card';
import { useState, useCallback, useEffect } from 'react';

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

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [content, setContent] = useState('');
  const [showResults, setShowResults] = useState(false);
  
  // const data = [
  //   {
  //       "q": "What data is being collected?", 
  //       "a": "Personal Information, Communication Information, Social Information, Technical Information, Log data, Usage data, Device information, Cookies, Analytics, Online Tracking and Do Not Track Signals"
  //   },
  //   {
  //       "q": "When is the data collected?",
  //       "a": "When you create an account to use our Services, communicate with us, interact with our Social Media Pages, visit, use, and interact with the Services"
  //   },
  //   {
  //       "q": "How can I opt-out?",
  //       "a": "You can set your browser to accept all cookies, to reject all cookies, or to notify you whenever a cookie is offered so that you can decide each time whether to accept it"
  //   }
  // ];

  // const textHandler = (event) => {
  //   setPolicy(event.target.value);
  // }
  const limit = 15000;

  const textHandler = useCallback(
    text => {
      setContent(text.slice(0, limit));
    },
    [limit, setContent]
  );

  // useEffect(() => {
  //   textHandler(content);
  // }, [content])
  
  const generateResults = async (event) => {
    event.preventDefault();
    setResults([]);
    setLoading(true);
    console.log(content);
  
    const res = await fetch('/api/demystify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        content 
      })
    });

    if (!res.ok) {
      throw new Error(res.statusText);
    }

    const json = await res.json();
    const data = JSON.parse(JSON.parse(json.data));

    setResults(data);
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
          <div className="flex flex-col justify-center items-center w-screen text-center my-28 text-white ">
            <div className="flex flex-col justify-center items-center w-1/3">
              <h1 className={`font-calluna text-6xl`}>Demystify any privacy policy with AnyInfo</h1>
              <p className="text-lg mt-8 max-w-2xl">AnyInfo attempts to demystify privacy policies to tell you what data is being collected, how it's being used, and how you can opt-out.</p>
            </div>
            {/* <p className="mt-4">Paste your privacy policy below:</p> */}
            <div className="flex flex-col mt-10 w-5/12">
              <label className= "text-left opacity-60" htmlFor='policy'>Copy and paste your privacy policy below:</label>
              {/* <textarea className="bg-transparent border-white rounded mt-2 focus:outline-none focus:ring  focus:ring-white" value={policy} onChange={textHandler} id='policy' rows='5'></textarea> */}
              <textarea className="bg-transparent border-white rounded mt-2 focus:outline-none focus:ring  focus:ring-white" value={content} onChange={event => textHandler(event.target.value)} id='policy' rows='5'></textarea>
              <p>{content.length} / {limit}</p>
            </div>
            <div>
            <button className="bg-gradient-to-br from-[#3AAE62] to-[#9F4CC7] focus:outline-none focus:ring  focus:ring-white mt-5 px-0.5 py-0.5 rounded" disabled={loading} onClick={generateResults}>
                <div className={`bg-black ${!loading && 'hover:bg-gradient-to-br'} hover:text-black from-[#3AAE62] to-[#9F4CC7] px-16 py-3 rounded`}>
              { loading 
                ? <div className="w-6 h-6 rounded-full animate-spin border-2 border-solid border-white border-t-transparent"></div>
                : 'Analyze policy'
              }
                </div>
            </button>
            </div>
            {showResults && (
              <div className="flex flex-row justify-between mt-10 w-5/12">
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
