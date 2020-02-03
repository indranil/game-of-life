import React, { useState, useEffect } from 'react';

const Game = ({
  gridSize,
}) => {
  const [gridLife, setGridLife] = useState(null);

  useEffect(() => {

  }, []);

  return (
    <p>Grid is {gridSize.width} x {gridSize.height}</p>
  );
};

export default Game;
