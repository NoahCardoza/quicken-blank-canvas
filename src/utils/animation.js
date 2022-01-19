/**
 * A reducer to animate a destroy child sprites no longer needed
 * @param {Array} sprites the collection of sprites being kept
 * @param {Sprite} sprite the sprite to animate and evaluate
 * @returns {Array} an array of sprites kept for the next game tick
 */
// eslint-disable-next-line import/prefer-default-export
export const renderAndReduceChildSprites = (sprites, sprite) => {
  if (sprite.animate()) {
    return [...sprites, sprite];
  }
  return sprites;
};
