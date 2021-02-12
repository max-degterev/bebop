import styled from 'styled-components';

const Container = styled.ul`
  margin: 5px 0 0;
  padding: 0;
  list-style-type: none;
`;

const Row = styled.li`
  padding: 0;
  line-height: 1;
  white-space: break-spaces;
  color: ${({ response }) => (response ? '#079' : '#0b0')};
`;

const Command = ({ className, item: { command, response } }) => (
  <Container className={className}>
    <Row>&gt; {command}</Row>
    <Row response>&lt; {response}</Row>
  </Container>
);

export default Command;
