/**
 * This should probably by called "Spaceship" unless you know of any
 * turtles that shoot blocks... 
 *
 * A lot of this file should be abstracted to a general "animateable object" class
 * but in the interest of time, that's not a high priority
 */

const MAX_VELOCITY = 3;

/**
 * Makes sure objects don't move too fast
 * @param {int} velocity the x/y velocity of an object on the canvas
 * @returns a bounded number (MAX_VELOCITY) either positive or negative
 */
const constainVelocity = (velocity) => {
  if(Math.abs(MAX_VELOCITY) > MAX_VELOCITY) {
    return Math.sign(velocity) * MAX_VELOCITY;
  }
  return velocity;
}

// while I usually don't like using classes
// I do find them uesul when dealing with animations
class Turtle {
  constructor(ctx) {
    this.ctx = ctx

    // position
    this.x = 360;
    this.y = 200;

    // velocity
    this.vx = 0;
    this.vy = 0;

    this.angle = 0;
    this.penDown = true;
    this.penColor = '#000000';
    this.lineWidth = 2;
  }

  logPenStatus() {
    console.log(`x=${this.x}; y=${this.y}; angle = ${this.angle}; penDown = ${this.penDown}`);
  };

  /**
   * makes sure we don't go off the edge of the canvas
   * 
   * TODO: calculate the height/eidth of the sprite
   *       in some cases parts of hte ibject will go off the screen
   */
  constraingToBounds() {
    if (this.x < 0) {
      this.x = 0
    }
    if (this.y < 0) {
      this.y = 0
    }
    if (this.x > this.ctx.canvas.width) {
      this.x = this.ctx.canvas.width
    }
    if (this.y > this.ctx.canvas.height) {
      this.y = this.ctx.canvas.height
    }
  }

  /**
   * called by the game loop to animate the object
   * 
   * (this brings me back to my pygame days in 
   * high school...)
   */
  animate() {
    // apply velocity
    this.x += this.vx;
    this.y += this.vy;

    this.constraingToBounds()

    this.ctx.beginPath();
    this.ctx.moveTo(this.x, this.y);
    this.ctx.lineTo(this.x - 10, this.y - 25);
    this.ctx.lineTo(this.x + 10, this.y - 25);
    this.ctx.fill();

    // manage velocity
    this.vx *= .9
    this.vy *= .9
    
    if (Math.abs(this.vx) < .1) {
      this.vx = 0
    }

    if (Math.abs(this.vy) < .1) {
      this.vy = 0
    }
  }

  // reposition turtle
    shiftLeft(speed = 1) {
      this.vx = constainVelocity(this.vx - speed)
  };
    shiftRight(speed = 1) {
    this.vx = constainVelocity(this.vx + speed);
  };
    shiftUp(speed = 1) {
    this.vy = constainVelocity(this.vy - speed);
  };
    shiftDown(speed = 1) {
    this.vy = constainVelocity(this.vy + speed);
  };
}

export default Turtle