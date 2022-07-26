import Document, {
  DocumentContext,
  Html,
  Head,
  Main,
  NextScript,
} from 'next/document'
import { ServerStyleSheet } from 'styled-components'

export default class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const sheet = new ServerStyleSheet()
    const originalRenderPage = ctx.renderPage

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            sheet.collectStyles(<App {...props} />),
        })

      const initialProps = await Document.getInitialProps(ctx)
      return {
        ...initialProps,
        styles: [initialProps.styles, sheet.getStyleElement()],
      }
    } finally {
      sheet.seal()
    }
  }

  render() {
    return (
      <Html>
        <Head>
          <meta name="title" content="Giveth Info Dashboard" />
          <meta
            name="description"
            content="Analyze Giveth platform to understand how to help more for-good projects with zero added fees."
          />

          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://giveth-info.vercel.app/" />
          <meta property="og:title" content="Giveth Info Dashboard" />
          <meta
            property="og:description"
            content="Analyze Giveth platform to understand how to help more for-good projects with zero added fees."
          />
          <meta
            property="og:image"
            content="https://giveth.mypinata.cloud/ipfs/QmQ9sfdevs9vS7czBXBfDaRRPhU8a6T5gXxF3NDGSnQe1c"
          />

          <meta property="twitter:card" content="summary_large_image" />
          <meta
            property="twitter:url"
            content="https://giveth-info.vercel.app/"
          />
          <meta property="twitter:title" content="Giveth Info Dashboard" />
          <meta
            property="twitter:description"
            content="Analyze Giveth platform to understand how to help more for-good projects with zero added fees."
          />
          <meta
            property="twitter:image"
            content="https://giveth.mypinata.cloud/ipfs/QmQ9sfdevs9vS7czBXBfDaRRPhU8a6T5gXxF3NDGSnQe1c"
          />
          <meta name="twitter:card" content="summary_large_image" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
