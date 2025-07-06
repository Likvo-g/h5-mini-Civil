export const sideLength = 15;
export const distance = sideLength * Math.cos(Math.PI / 6) * 2;
export const yGridSize = Math.floor(600 / distance); // 800 is the height of the canvas, adjust as needed
export const xGridSize = Math.floor(800 / (sideLength * 1.5)); // 800 is the width of the canvas, adjust as needed