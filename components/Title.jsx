import Head from 'next/head';

const defaultTitle = 'bebop';

const Title = ({ children }) => (
  <Head>
    <title>{children ? `${children} • ${defaultTitle}` : defaultTitle}</title>
  </Head>
);

export default Title;
