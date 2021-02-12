import { useRef, useEffect } from 'react';
import styled from 'styled-components';
import { stream } from 'uni-config';

const playerOptions = {
  maxAudioLag: .5, // default: .25, maximum enqueued audio length in seconds
  videoBufferSize: 512 * 1024, // default: 512 * 1024, size in bytes for the video decode buffer
  audioBufferSize: 128 * 1024, // default: 128 * 1024, size in bytes for the audio decode buffer
};

const Canvas = styled.canvas`
  width: 100%;
  height: 100%;
  background: #111;
`;

const Stream = () => {
  const node = useRef(null);
  const player = useRef(null);

  useEffect(() => {
    const loadPlayer = async() => {
      const { Player } = await import('jsmpeg-fast-player');
      const { current: canvas } = node;

      // Already unmounted
      if (!canvas) return;

      const url = `ws://${document.location.hostname}:${stream.port}/`;
      player.current = new Player(url, { ...playerOptions, canvas });
    };

    loadPlayer();

    return () => {
      player.current?.destroy();
      player.current = null;
    };
  }, []);

  return <Canvas ref={node} />;
};

export default Stream;
