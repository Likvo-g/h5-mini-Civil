const canvas = document.getElementById('gameCanvas'); // find gameCanvas so that you can draw on it
const ctx = canvas.getContext('2d'); // basically initialize the canvas ct
import { sideLength, distance, xGridSize, yGridSize} from './rsc/config.js'; // import the config file

class Hex {
    constructor(sideLength, color, x, y) {
        // basic properties of the hexagon
        this.sideLength = sideLength;
        this.color = color;
        this.x = x;
        this.y = y;
        // additional properties of the hecagon
        this.terrain = 'plain'; // default terrain type
        this.owner = null;
        this.unit = null;
        this.building = null;
        this.resource = null; // 'gold', 'wood', etc.
        this.city = null; // a string, if the hexagon hasnt a city, it is null

        /* id isnt temporarily acompatible with the current game logic
        this.id = ; // unique identifier for the hexagon
        */
    }
    
    // renders the hexagon on the canvas
    draw() {
        ctx.beginPath();
        for (let i = 0; i < 6; i++) {
            if (i == 0) ctx.moveTo(this.x + this.sideLength, this.y);
            else {
                ctx.lineTo(
                    this.x + this.sideLength * Math.cos((Math.PI / 3) * i),
                    this.y + this.sideLength * Math.sin((Math.PI / 3) * i)
                );
            }
        }
        
        ctx.closePath();
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 2;
        ctx.stroke();
    }
}

function renderMap() {
    for (let hex of window.map) {
        hex.draw();
    }
}

function initMap() {
    window.map = [];
    for (let i = 0; i < xGridSize; i++) {
        for (let j = 0; j < yGridSize; j++) {
            window.map.push(new Hex(sideLength, 'gray', sideLength + i * 1.5 * sideLength, (j + 1) * distance - distance / 2 * (i & 1)));
        }
    }
}

// main game logic
initMap();
renderMap();