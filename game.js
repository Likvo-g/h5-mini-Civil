const canvas = document.getElementById('gameCanvas'); // find gameCanvas so that you can draw on it
const ctx = canvas.getContext('2d'); // basically initialize the canvas ct
import { sideLength, distance, xGridSize, yGridSize} from './rsc/config.js'; // import the config file

// bond functions to the window object so that they can be called from the HTML file 
window.startGame = startGame;
window.pauseGame = pauseGame;
window.resetGame = resetGame;

class Hex {
    constructor(sideLength, color, x, y, col, row) {
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
        // unique identifier for the hexagon. from [0,0] to [xGridSize-1, yGridSize-1]
        this.id = [col, row]; // unique identifier for the hexagon
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

function getHexById(id) {
    return window.map[id[0] * yGridSize + id[1]]; // assuming id is [col, row]
}

function initMap() {
    window.map = [];
    for (let i = 0; i < xGridSize; i++) {
        for (let j = 0; j < yGridSize; j++) {
            window.map.push(new Hex(sideLength, 'gray', sideLength + i * 1.5 * sideLength, (j + 1) * distance - distance / 2 * (i & 1), i, j));
        }
    }
}

// main game logic
canvas.addEventListener('click', (event) => {
    // rect is the canvas bounding position relative to the viewport
    const rect = canvas.getBoundingClientRect();
    // mouseX and mouseY are the coordinates of the mouse click relative to the canvas
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    // Find the clicked hex
    for (let hex of window.map) {
        // Calculate distance from mouse to hex center
        const dx = mouseX - hex.x;
        const dy = mouseY - hex.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < hex.sideLength) {
            hex.color = 'blue'; // Example: change color on click
            renderMap();
            break;
        }
    }
});

function startGame() {
    initMap();
    renderMap();
    renderMap();
}

function pauseGame() {
}

function resetGame() {
    for (let hex of window.map) {
        hex.color = 'gray'; // Reset color to default
    }
    renderMap(); // redraw the map with reset colors
}
