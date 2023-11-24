import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en" className="dark text-white">
      <Head />
      <title>Interior Designer.AI</title>
      <body>
        <div className="blob-cont">
          <div className="yellow blob"></div>
          <div className="red blob"></div>
          <div className="green blob"></div>
        </div>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
