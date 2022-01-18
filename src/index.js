import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import styles from './styles.js';
import Turtle from './Turtle.js';
import Enemy from './Enemy.js';
import _ from 'lodash';
import setupKeybindings from './keybindings'
import { chance, randint } from './utils'


const turtle = new Turtle();
const rockets = [];
const moveArray = ['shiftLeft', 'shiftRight', 'shiftUp', 'shiftDown'];

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
        <button
          onClick={clearCanvas}
          style={styles.button}
        >
          Reset Game
        </button>
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

// =====================================================================================
//                                  GRAPHICS
// =====================================================================================

// canvas preparation
const canvas = document.getElementById('myDrawing');

if (canvas && canvas.getContext) { // does the browser support 'canvas'?
  turtle.canvas = canvas
  turtle.ctx = canvas.getContext('2d'); // get drawing context
} else {
  alert('You need a browser which supports the HTML5 canvas!');
}

function clearCanvas() {
  if (canvas && canvas.getContext) {
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
    turtle.x = 360;
    turtle.y = 200;
  }
}

const enemies = []

const registerKeybindings = setupKeybindings(turtle);
const gameLoop = () => {
  const context = canvas.getContext('2d');
  context.clearRect(0, 0, canvas.width, canvas.height);
  
  registerKeybindings()

  turtle.animate()

  if (chance(1)) {
    enemies.push(new Enemy(context))
  }

  enemies.map(enemy => enemy.animate());
  
  requestAnimationFrame(gameLoop)
}

gameLoop()
