import styled from 'styled-components';
import Layout from '../components/Layout';
import Title from '../components/Title';
import Link from '../components/Link';

const Container = styled.div`
  max-width: 960px;
  margin: 0 auto;
  padding: 30px;
`;

const Error404 = () => (
  <Layout>
    <Container>
      <Title>Error 404</Title>
      <h2>Error 404</h2>
      <p>
        This page doesn&apos;t exist. You can navigate back to the <Link href="/">home page</Link>.
      </p>
    </Container>
  </Layout>
);

export default Error404;
