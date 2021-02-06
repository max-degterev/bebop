import styled from 'styled-components';

const Main = styled.main`
  min-height: 100%;
`;

const Layout = ({ className, children }) => (
  <Main className={className}>
    {children}
  </Main>
);

export default Layout;
