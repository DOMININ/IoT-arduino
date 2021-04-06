import React from 'react';
import socket from '@socket/socket';

const Diod = () => {
  const setDiodOn = () => {
    socket.emit('lights', { status: '1' });
  };

  const setDiodOff = () => {
    socket.emit('lights', { status: '0' });
  };

  return (
    <>
      <button onClick={setDiodOn}>Вкл</button>
      <button onClick={setDiodOff}>Выкл</button>
    </>
  );
};

export default Diod;
