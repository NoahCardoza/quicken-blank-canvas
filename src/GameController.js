import KeyboardController, { KEYS } from './KeyboardController'
import Turtle from './Turtle.js';
import EnemyController from './EnemyController.js';


class GameController {
  constructor(canvas) {
    this.canvas = canvas;
    this.running = false // used later with an end condition has been met
    
    this.turtle = new Turtle(this.canvas.getContext('2d'));

    this.enemies = EnemyController(this)
    
    this.keybindings = KeyboardController({
      [KEYS.UP]: {
        execute: () => {
          this.turtle.shiftUp();
        }
      },
      [KEYS.DOWN]: {
        execute: () => {
          this.turtle.shiftDown();
        }
      },
      [KEYS.LEFT]: {
        execute: () => {
          this.turtle.shiftLeft();
        }
      },
      [KEYS.RIGHT]: {
        execute: () => {
          this.turtle.shiftRight();
        }
      },
      [KEYS.SPACEBAR]: {
        throttle: 200,
        execute: () => {
          this.turtle.spawnRocket()
        }
      }
    })
  }

  tick() {
    const context = this.canvas.getContext('2d');

    context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    this.keybindings.tick();

    this.turtle.animate();

    this.enemies.tick();
    
    if (this.running) {
      requestAnimationFrame(this.tick.bind(this))
    }
  }

  beginLoop() {
    this.running = true;
    this.tick();
  }

  stopLoop() {
    this.running = false;
  }
}

export default GameController