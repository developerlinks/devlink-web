import { AppProps } from 'next/app';
import Router from 'next/router';
import nProgress from 'nprogress';

import '@/styles/globals.css';
import '@/styles/nprogress.css';
import '@/styles/normalize.css'

Router.events.on('routeChangeStart', nProgress.start);
Router.events.on('routeChangeError', nProgress.done);
Router.events.on('routeChangeComplete', nProgress.done);

/**
 * ? `Layout` component is called in every page using `np` snippets. If you have consistent layout across all page, you can add it here too
 */

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
