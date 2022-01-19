class Sprite {
  constructor(ctx, x, y) {
    this.ctx = ctx;

    // position
    this.x = x;
    this.y = y;

    // velocity
    this.vx = 0;
    this.vy = 0;
  }
}

export default Sprite;
