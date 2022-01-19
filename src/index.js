import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import styles from './styles.js';
import _ from 'lodash';
import GameController from './GameController'

function ReactRoot() {
  // reactive width since we'll be updating it on window resize 
  const [width, setWidth] = useState(window.innerWidth);
  const height = 720;

  // use lodash's throttle helper to improve preformance
  window.addEventListener('resize', _.throttle(() => {
    setWidth(window.innerWidth);
  }, 100), {
    passive: true 
  });

  return (
    <div style={styles.root}>
      <div style={styles.header}>
        <h1 style={styles.ellipseText}>
          Half of a space turtle game?
        </h1>
      </div>
      <div style={styles.column}>
        {/* <button
          onClick={clearCanvas}
          style={styles.button}
        >
          Reset Game
        </button> */}
        <div style={{ ...styles.canvasWrapper, width: width + 2, height: height + 2 }}>
          <canvas
            id="myDrawing"
            width={width}
            height={height}
          />
        </div>
        {/*
        TODO: add some game options here?
        <div style={{ ...styles.row, ...styles.spacer }}>
          {moveArray.map((key) => (
            <button
              key={key}
              onClick={() => turtle[key]()}
              style={styles.button}
            >
              {key}
            </button>
          ))}
        </div> */}

      </div>
    </div>
  );
}
// react insertion
const wrapper = document.getElementById('react-entry');
wrapper ? ReactDOM.render(<ReactRoot />, wrapper) : false;

// canvas preparation
const canvas = document.getElementById('myDrawing');

if (!(canvas && canvas.getContext)) { // does the browser support 'canvas'?
  alert('You need a browser which supports the HTML5 canvas!');
}

const game = new GameController(canvas);

game.beginLoop();