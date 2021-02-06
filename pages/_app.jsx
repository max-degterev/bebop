import '@fontsource/roboto/latin.css';
import { useEffect } from 'react';
import Head from 'next/head';
import { createGlobalStyle } from 'styled-components';
import { Normalize } from 'styled-normalize';
import Title from '../components/Title';

const GlobalStyle = createGlobalStyle`
  html, body, #__next {
    height: 100%;
    font: 300 16px/1.4 Roboto, sans-serif;
    background: #000;
    color: #fff;
    user-select: none;
  }

  a {
    &,
    &:hover,
    &:visited {
      color: #fff;
    }
  }

  h1,
  h2,
  h3 {
    font-weight: 400;
  }

  *,
  *:before,
  *:after {
    box-sizing: border-box;
    user-select: none;
  }
`;

const App = ({ Component, pageProps }) => {
  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) jssStyles.parentElement.removeChild(jssStyles);
  }, []);

  return (
    <>
      <Title />
      <Head>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#000000" />
        <meta name="apple-mobile-web-app-title" content="Bebop" />
        <meta name="application-name" content="Bebop" />
        <meta name="msapplication-TileColor" content="#000000" />
        <meta name="theme-color" content="#000000" />
      </Head>
      <Normalize />
      <GlobalStyle />
      <Component {...pageProps} />
    </>
  );
};

export default App;
