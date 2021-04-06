import React, { useState } from 'react';
import socket from '@socket/socket';

const Sonar = () => {
  const [range, setRange] = useState(0);

  socket.on('data', (data) => {
    setRange(data);
  });

  return <p>{range}</p>;
};

export default Sonar;
