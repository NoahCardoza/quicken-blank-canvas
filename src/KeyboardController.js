export const KEYS = {
  UP: 'ArrowUp',
  DOWN: 'ArrowDown',
  LEFT: 'ArrowLeft',
  RIGHT: 'ArrowRight',
  SPACEBAR: 'Space',
};

/**
 * This function sets up all the logic to handle the keyboard events
 * @constructor
 * @param {Object} keybindings - an object defineing callbacks to be executed
 *                               when a specified key is clicked
 * @example
 *   {
 *      [KEYS.UP]: { // the key in question
 *        throttle: 0, // (optional) time in ms to throttle the key if held of clicked rapidly
 *        execute: () => {}, // a callback to be executed when the key is pressed
 *      },
 *      ...
 *    }
 * @returns {Function} a callback function to be run in the event loop
 */
const KeyboardController = (keybindings) => {
  // initiate the config with the needed properties
  const config = Object.keys(keybindings)
    .reduce((col, key) => ({
      ...col,
      [key]: {
        pressed: false,
        throttle: 0,
        lastExceuted: 0,
        ...keybindings[key],
      },
    }), {});

  // little hack since JavaScript will only report one key at a time
  document.addEventListener('keydown', (event) => {
    if (config[event.code]) {
      config[event.code].pressed = true;
    }
  });

  document.addEventListener('keyup', (event) => {
    if (config[event.code]) {
      config[event.code].pressed = false;
    }
  });

  return {
    // callback to run in the event loop
    tick: () => {
      Object.keys(config).forEach((key) => {
        const controller = config[key];
        if (controller.pressed) {
          // small bit of code to throttle certian keys
          // _.throttle would allow functions to be triggered
          // after the keys were lifted up
          if (controller.throttle > 0) {
            if (controller.lastExceuted > Date.now() - controller.throttle) {
              return;
            }
          }
          controller.lastExceuted = Date.now();
          controller.execute();
        }
        if (config[key].pressed) {
          config[key].execute();
        }
      });
    },
  };
};

export default KeyboardController;
