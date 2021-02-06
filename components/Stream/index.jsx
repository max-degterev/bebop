import { useRef, useEffect } from 'react';
import styled from 'styled-components';
import { stream } from 'uni-config';

const Canvas = styled.canvas`
  width: 100%;
  height: 100%;
  background: #111;
`;

const playerOptions = {
  maxAudioLag: .5, // default: .25, maximum enqueued audio length in seconds
  videoBufferSize: 512 * 1024, // default: 512 * 1024, size in bytes for the video decode buffer
  audioBufferSize: 128 * 1024, // default: 128 * 1024, size in bytes for the audio decode buffer
};

const Stream = ({ started }) => {
  const node = useRef(null);
  const player = useRef(null);

  useEffect(() => {
    if (!started || player.current) return;

    const loadPlayer = async() => {
      const { Player } = await import('jsmpeg-fast-player');

      const url = `ws://${document.location.hostname}:${stream.port}/`;
      const canvas = node.current;

      player.current = new Player(url, { ...playerOptions, canvas });
    };

    loadPlayer();

    return () => {
      player.current?.destroy();
      player.current = null;
    };
  }, [started]);

  return <Canvas ref={node} />;
};

export default Stream;
