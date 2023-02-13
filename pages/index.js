import Head from 'next/head'
import Card from '@/components/home/Card';
import { initContent, charLimit } from '@/public/utilities/utils';
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
});

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [content, setContent] = useState(initContent);
  const [showResults, setShowResults] = useState(false);
  
  /* placeholder data */
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


  const textHandler = useCallback(
    text => {
      setContent(text);
    },
    []
  );
  
  const generateResults = async (event) => {
    event.preventDefault();
    setResults([]);
    setLoading(true);

    // call to api with stringified content
    const res = await fetch('/api/demystify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        content 
      })
    });

    if (res.status !== 200) {
      throw new Error(`Request failed with status ${res.status}`);
    }

    if (!res.ok) {
      throw new Error(res.status);
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
        <div className="flex flex-col md:justify-start lg:justify-center items-center">
          <div className="flex flex-col md:justify-start lg:justify-center items-center md:w-full lg:w-screen md:text-left xs:px-8 lg:text-center my-28 text-white">
            <div className="flex flex-col md:justify-start md:items-start lg:justify-center lg:items-center md:w-full md:text-left lg:text-center lg:w-1/3">
              <h1 className={`font-calluna text-6xl`}>Demystify any privacy policy with AnyInfo</h1>
              <p className="text-lg mt-8">AnyInfo attempts to demystify privacy policies to tell you what data is being collected, how it&apos;s being used, and how you can opt-out.</p>
            </div>
            <div className="flex flex-col mt-10 md:w-full lg:w-5/12">
              <div className="flex flex-row justify-between">
                <label className= "text-left opacity-60" htmlFor='policy'>Copy and paste your privacy policy below:</label>
                <p className="text-sm mt-1">{charLimit-content.length} characters</p>
              </div>
              <textarea className={`bg-transparent border-white ${content.length < charLimit ? 'border-white' : 'border-red-700' } rounded mt-2 focus:outline-none focus:ring ${content.length < charLimit ? 'focus:ring-white' : 'focus:ring-red-700' } ${loading && 'opacity-60'}`} value={content} onChange={event => textHandler(event.target.value)} id='policy' rows='5' disabled={loading}></textarea>
            </div>
            <div className="flex md:justify-start lg:justify-center md:items-start lg:items-center md:w-full lg:w-screen">
              <button className={`bg-gradient-to-br from-[#3AAE62] to-[#9F4CC7] focus:outline-none focus:ring  focus:ring-white mt-5 px-0.5 py-0.5 rounded  ${content.length >= charLimit ? 'opacity-60' : ''}`} disabled={loading || content.length >= charLimit} onClick={generateResults}>
                  <div className={`bg-black ${(!loading && content.length < charLimit) && 'hover:bg-gradient-to-br'} ${(!loading && content.length < charLimit) && 'hover:text-black'} from-[#3AAE62] to-[#9F4CC7] px-16 py-3 rounded`}>
                { loading 
                  ? <div className="w-6 h-6 rounded-full animate-spin border-2 border-solid border-white border-t-transparent"></div>
                  : 'Analyze policy'
                }
                  </div>
              </button>
            </div>
            {showResults && (
              <div className="flex xs:flex-col sm:flex-row justify-between mt-10 md:w-full lg:w-5/12">
                {results.map( (result) => (
                  <Card key={result.q} question={result.q} answer={result.a}/>
                  ))}
              </div>
            )}
              <div className="flex flex-col justify-center lg:w-5/12 mt-12">
                <p className="text-white mt-8">made by <a href="https://twitter.com/tristan_virtual" className="underline underline-offset-4 hover:text-black">tristan espinoza</a>
                </p>
                <p className="mt-8"><span className="font-bold">note:</span> requests may occasional hang due to function execution limits. if it takes longer than 10 seconds, please refresh the page and try again. &apos;otherwise, if you receive a different error or have suggestions, feel free to open up an issue on <a href="https://www.github.com/tespin/any-info" className="underline underline-offset-4 hover:text-black">github</a>! </p>
              </div>
            </div>
        </div>
      </main>
    </>
  )
}
