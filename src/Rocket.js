// =======================================================
//      Rocket functions
// =======================================================


class Rocket {
  constructor(ctx, x, y) {
    this.ctx = ctx
    this.x = x
    this.y = y
  }

  /**
   * renders the rocket on the canvas
   * 
   * @returns if the rocket should be rendered in the next frame
   */
  animate() {
    this.y += 10;
    this.ctx.fillRect(this.x, this.y, 5, 5);
    
    if (this.y > this.ctx.canvas.height) {
      return false
    }

    // TODO: collision detection

    return true
  }

}

export default Rocket;