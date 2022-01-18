import Rocket from './Rocket'
import Sprite from './Sprite'
import { randint } from './utils'

const HEIGHT = 20;

class Enemy extends Sprite {
  constructor(ctx) {
    // TODO: make sure they aren't rendered off the sides of the canvas
    super(ctx, randint(0, ctx.canvas.width ) , ctx.canvas.height + HEIGHT);
  }

  /**
   * called by the game loop to animate the object
   * 
   * (this brings me back to my pygame days in 
   * high school...)
   */
  animate() {
    // apply velocity
    this.y -= 5;

    console.log(this.y);

    this.ctx.beginPath();
    this.ctx.moveTo(this.x, this.y);
    this.ctx.lineTo(this.x - 10, this.y + 25);
    this.ctx.lineTo(this.x + 10, this.y + 25);
    this.ctx.fillStyle = 'red'
    this.ctx.fill();

    if (this.y < 0) {
      this.y = 0
    }
  }
}

export default Enemy;