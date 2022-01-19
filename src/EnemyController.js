import Enemy from './Enemy.js';
import { chance } from './utils/math'
import { renderAndReduceChildSprites } from './utils/animation'

export default (game) => {
  return {
    enemies: [],
    tick() {
      if (chance(1)) {
        this.enemies.push(new Enemy(game))
      }

      this.enemies = this.enemies.reduce(renderAndReduceChildSprites, []);
   }
 } 
}