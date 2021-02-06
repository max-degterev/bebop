import styled from 'styled-components';

import { IoMusicalNotes as MusicIcon } from 'react-icons/io5';
import { RiLightbulbFlashFill as LightsIcon } from 'react-icons/ri';
import { AiFillSound as SoundIcon } from 'react-icons/ai';

const StatusMusic = styled(MusicIcon)`
  color: #fff;
`;
const StatusLights = styled(LightsIcon)`
  margin-left: 2px;
  color: #fff;
`;
const StatusSound = styled(SoundIcon)`
  margin-left: 5px;
  color: #fff;
`;

const Container = styled.article`
  margin: 10px;
  display: flex;
  position: absolute;
  left: 0;
  top: 0;
`;

const Peripherals = ({ className, playing, lights, horn }) => (
  <Container className={className}>
    {playing && <StatusMusic />}
    {lights && <StatusLights />}
    {horn && <StatusSound />}
  </Container>
);

export default Peripherals;
