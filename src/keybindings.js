/**
 * This function sets up all the logic to handle the keyboard events
 * @param {*} turtle the main turtle object in the canvas
 * @returns a callback function to be run in the event loop
 */
const setupKeybindings = (turtle) => {
  const KEY = {
    UP: 'ArrowUp',
    DOWN: 'ArrowDown',
    LEFT: 'ArrowLeft',
    RIGHT: 'ArrowRight',
    SPACEBAR: 'Space',
  };

  const keybindings = {
    [KEY.UP]: {
      pressed: false,
      throttle: 0,
      lastExceuted: 0,
      execute() {
        turtle.shiftUp();
      }
    },
    [KEY.DOWN]: {
      pressed: false,
      throttle: 0,
      lastExceuted: 0,
      execute() {
        turtle.shiftDown();
      }
    },
    [KEY.LEFT]: {
      pressed: false,
      throttle: 0,
      lastExceuted: 0,
      execute() {
        turtle.shiftLeft();
      }
    },
    [KEY.RIGHT]: {
      pressed: false,
      throttle: 0,
      lastExceuted: 0,
      execute() {
        turtle.shiftRight();
      }
    },
    [KEY.SPACEBAR]: {
      pressed: false,
      throttle: 200,
      lastExceuted: 0,
      execute() {
        turtle.spawnRocket()
      }
    }
  };
  
  // little hack since JavaScript will only report one key at a time 
  document.addEventListener("keydown", (event) => {
    if(keybindings[event.code]){
      keybindings[event.code].pressed = true
    }
  })

  document.addEventListener("keyup", (event) => {
    if(keybindings[event.code]){
      keybindings[event.code].pressed = false
    }
  })

  // callback to run in the event loop
  return () => {
    Object.keys(keybindings).forEach(key => {
      const controller = keybindings[key];
      if (controller.pressed) {
        // small bit of code to throttle certian keys
        // _.throttle would allow functions to be triggered
        // after the keys were lifted up
        if (controller.throttle > 0) {
          console.log(controller.lastExceuted,  Date.now(),  controller.throttle);
          if (controller.lastExceuted > Date.now() - controller.throttle) {
            return
          }
        }
        controller.lastExceuted = Date.now()
        controller.execute()
      }
      keybindings[key].pressed && keybindings[key].execute()
    })
  }
}

export default setupKeybindings; 
