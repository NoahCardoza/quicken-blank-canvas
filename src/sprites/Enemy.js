import Sprite from '@/sprites/Sprite';
import { randint } from '@/utils/math';

const HEIGHT = 20;

class Enemy extends Sprite {
  constructor(game) {
    // TODO: make sure they aren't rendered off the sides of the canvas
    super(game.canvas.getContext('2d'), randint(0, game.canvas.width), game.canvas.height + HEIGHT);
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

    this.ctx.beginPath();
    this.ctx.moveTo(this.x, this.y);
    this.ctx.lineTo(this.x - 10, this.y + 25);
    this.ctx.lineTo(this.x + 10, this.y + 25);
    this.ctx.fillStyle = 'red';
    this.ctx.fill();

    if (this.y < 0) {
      return false;
    }

    return true;
  }
}

export default Enemy;
