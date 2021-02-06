import styled from 'styled-components';
import Slanted from '../../Slanted';

const Container = styled(Slanted)`
  max-width: 300px;
  position: absolute;
  left: 50%;
  top: 50px;
  transform: translate(-50%, 0);
  color: #ff0;
`;

const Message = ({ className, text }) => (
  <Container className={className} background="#00f">{text}</Container>
);

export default Message;
