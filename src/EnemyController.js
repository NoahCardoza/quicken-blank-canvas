import Enemy from './sprites/Enemy';
import { chance } from './utils/math';
import { renderAndReduceChildSprites } from './utils/animation';

export default (game) => ({
  enemies: [],
  tick() {
    if (chance(1)) {
      this.enemies.push(new Enemy(game));
    }

    this.enemies = this.enemies.reduce(renderAndReduceChildSprites, []);
  },
});
