import styled from 'styled-components';

const Container = styled.article`
  margin: 10px;
  position: absolute;
  right: 0;
  top: 15px;
  font-size: 12px;
`;

const Spectators = ({ className, count }) => (
  <Container className={className}>Online: {count}</Container>
);

export default Spectators;
