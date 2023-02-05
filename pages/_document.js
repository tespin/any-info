import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en" className="min-h-full">
      <Head />
      <body className="bg-gradient-to-br from-green-700 to-purple-500 bg-no-repeat">
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
