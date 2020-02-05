import React from 'react';

const css = {
  container: {
    display: 'inline-block',
    height: '10px',
    width: '10px',
    margin: 0,
    padding: 0,
    border: '1px solid white',
    borderColor: 'white',
  },
  containerDesignPhase: {
    borderColor: '#ccc',
  }
};

const Box = ({
  row,
  col,
  value,
  designPhase,
  populateBox,
}) => {
  return (
    <div
      style={{
        ...css.container,
        ...(designPhase && css.containerDesignPhase),
        ...(value && {backgroundColor: 'black'}),
      }}
      onClick={() => designPhase && populateBox(row, col, !value)}
    />
  );
};

export default Box;
