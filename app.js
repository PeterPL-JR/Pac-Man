var elem = getId("game-canvas");
var canvas = elem.getContext("2d");

const tileSize = 50;
var tiles = [];

// Player Data
var playerColor = "yellow";
var playerRadius = 20;
const speed = 2;

var xDir = 1;
var yDir = 0;

var playerX = 0;
var playerY = 0;

const width = 1050;
const height = 450;

const mapWidth = width / tileSize;
const mapHeight = height / tileSize;

function init() {
    elem.width = width;
    elem.height = height;

    elem.style.width = width + "px";
    elem.style.height = height + "px";

    canvas.fillStyle = "black";
    canvas.fillRect(0, 0, width, height);

    for (var i = 0; i < mapWidth; i++) tiles[i] = [];

    for (var y = 0; y < mapHeight; y++) {
        for (var x = 0; x < mapWidth; x++) {
            tiles[x][y] = { color: `rgb(${x * 10},${y * 10},${x + y * 10})` };
        }
    }

    document.body.onkeydown = function (event) {
    }
    draw();
}

function draw() {
    requestAnimationFrame(draw);

    playerX += speed * xDir;
    playerY += speed * yDir;

    for (var y = 0; y < mapHeight; y++) {
        for (var x = 0; x < mapWidth; x++) {
            canvas.fillStyle = tiles[x][y].color;
            canvas.fillRect(x * tileSize, y * tileSize, tileSize, tileSize);
        }
    }

    var correctX = tileSize / 2 + playerX;
    var correctY = tileSize / 2 + playerY;

    canvas.fillStyle = playerColor;
    canvas.beginPath();
    canvas.arc(correctX, correctY, playerRadius, 0.25 * Math.PI, 1.25 * Math.PI, false);
    canvas.fill();

    canvas.beginPath();
    canvas.arc(correctX, correctY, playerRadius, 0.75 * Math.PI, 1.75 * Math.PI, false);
    canvas.fill();
}

function drawPlayer() {

}