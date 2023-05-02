/* eslint-disable @next/next/no-sync-scripts */
import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <script
            defer
            src='https://unpkg.com/@webcomponents/webcomponentsjs@2.1.3/webcomponents-bundle.js'
          ></script>
          <script
            defer
            src='https://unpkg.com/@statuspage/status-widget/dist/index.js'
          ></script>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
