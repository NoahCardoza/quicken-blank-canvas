export const randint = (max, min) => Math.floor(Math.random() * (max - min) + min);
export const chance = (percentage) => randint(0, 100) <= percentage;
   