import React from 'react';

function ScratchFrame({ userId }) {
  return (
    <iframe
      src={`/index.html?user=${userId}`} // scratch-guiのbuildにパラメータ渡す
      width="480"
      height="360"
      style={{ border: '1px solid #ccc', margin: '5px' }}
      allow="camera; microphone"
    />
  );
}

export default ScratchFrame;
