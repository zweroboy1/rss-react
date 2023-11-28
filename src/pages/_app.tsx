import type { AppProps } from 'next/app';
import Head from 'next/head';
import '@/styles/globals.css';
export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <link rel="icon" type="image/svg+xml" href="/logo.svg" />
        <title>BeerBank by zweroboy1</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
}
