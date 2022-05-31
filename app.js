var elem = getId("game-canvas");
var canvas = elem.getContext("2d");

const tileSize = 50;
var tiles = [];
const ghosts = [];

var gameCoins = [];
var yourCoins = 0;

// Player Data
var playerColor = "yellow";
const speed = 2.5;
const eatTime = 16;

// Movement Data
var xDir = 0;
var yDir = 0;

var playerX = 13 * tileSize;
var playerY = 11 * tileSize;
var nextMove = null;

const movingKeys = [
    "W", "S", "A", "D"
];

const allTheRightMoves = {
    "W": [0, -1],
    "S": [0, 1],
    "A": [-1, 0],
    "D": [1, 0]
};

const onAllTheRightFaces = {};

var time = 0;
var controlling = true;
var beginImage;

var fullPlayerImage;
var playerNowImage;
var coinImage;

var winner = false;
var over = false;

// Screen & Map Data
var mapWidth;
var mapHeight;

var width;
var height;

var mapPixels;
var mapImages;

// Classes
class Coin {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

function init() {
    for (var i = 0; i < 4; i++) onAllTheRightFaces[movingKeys[i]] = createImage("player_" + dirs[i] + ".png");
    beginImage = onAllTheRightFaces["D"];

    // Load Images
    fullPlayerImage = createImage("player_full.png");
    coinImage = createImage("coin.png");

    connectMap(1, function (array) {
        // Size Variables
        mapWidth = array['width'];
        mapHeight = array['height'];

        width = mapWidth * tileSize;
        height = mapHeight * tileSize;

        // Canvas Size
        elem.width = width;
        elem.height = height;

        elem.style.width = width + "px";
        elem.style.height = height + "px";

        canvas.fillStyle = "black";
        canvas.fillRect(0, 0, width, height);

        tiles = createMapTiles(array['map'], mapWidth, mapHeight);
        createGhosts();

        createMapImages(function () {
            document.body.onkeydown = function (event) {
                var key = event.key.toUpperCase();
                if (controlling && !winner && !over && movingKeys.indexOf(key) != -1) {
                    nextMove = key;
                }
            }
            createCoins();
            draw();
        });
    });
}

function draw() {
    requestAnimationFrame(draw);

    time++;
    controlling = (playerX < 0 || playerX + tileSize > width) ? false : true;

    if ((playerX + playerY) % 50 == 0) {
        if (nextMove != null) {
            var array = allTheRightMoves[nextMove];

            var xBufferDir = array[0];
            var yBufferDir = array[1];

            var tileX = playerX / tileSize + xBufferDir;
            var tileY = playerY / tileSize + yBufferDir;

            if (!tiles[tileX][tileY].solid) {
                xDir = xBufferDir;
                yDir = yBufferDir;

                playerNowImage = onAllTheRightFaces[nextMove];
                nextMove = null;
            }
        }
    }

    if (!winner && !over) {
        playerX += speed * xDir;
        playerY += speed * yDir;
    }

    if ((playerX + playerY) % 50 == 0) {
        var tileX = playerX / tileSize + xDir;
        var tileY = playerY / tileSize + yDir;

        if (tiles[tileX] && tiles[tileX][tileY] && tiles[tileX][tileY].solid) {
            xDir = 0;
            yDir = 0;
        }
    }

    for (var x = 0; x < mapWidth; x++) {
        for (var y = 0; y < mapHeight; y++) {

            var index = tiles[x][y].tile;
            canvas.drawImage(mapImages[index], x * tileSize, y * tileSize);
        }
    }

    for (var coin of gameCoins) {
        canvas.drawImage(coinImage, coin.x * tileSize, coin.y * tileSize);
    }

    var playerImage = (xDir == 0 && yDir == 0) ? fullPlayerImage : playerNowImage;
    var renderingImage = time % eatTime >= (eatTime * (4 / 9)) ? playerImage : fullPlayerImage;

    if (winner || over) renderingImage = fullPlayerImage;
    canvas.drawImage(renderingImage, playerX, playerY);

    if ((playerX + playerY) % 50 == 0) {
        var index = gameCoins.findIndex(function (obj) {
            return (obj.x == playerX / tileSize) && (obj.y == playerY / tileSize);
        });
        if (index != -1) {
            gameCoins.splice(index, 1);
            yourCoins++;

            // If Player wins a game
            if (gameCoins.length == 0) {
                winGame();
            }
        }
    }

    // Render Ghosts
    for(var ghost of ghosts) {
        ghost.update();
        canvas.drawImage(ghost.face, ghost.x, ghost.y);
        // break;
    } 

    // Print
    if(time == 1) {
        
    }

    // Player out of Bounds 
    if (playerX > width) {
        playerX = -tileSize;
        xDir = 1;
    }
    if (playerX + tileSize < 0) {
        playerX = width;
        xDir = -1;
    }

    if (playerY > height) {
        playerY = -tileSize;
        yDir = 1;
    }
    if (playerY + tileSize < 0) {
        playerY = height;
        yDir = -1;
    }
}

function createCoins() {
    // Create Coins on the map
    for (var y = 0; y < mapHeight; y++) {
        for (var x = 0; x < mapWidth; x++) {
            if (tiles[x][y].solid || tiles[x][y].block) continue;
            gameCoins.push(new Coin(x, y));
        }
    }
}

function createGhosts() {
    for(var i = 0; i < ghostsColors.length; i++) {
        do {
            var randX = getRandom(0, mapWidth - 1);
            var randY = getRandom(0, mapHeight - 1);
        } while(tiles[randX][randY].solid);

        ghosts.push(new Ghost(ghostsColors[i], randX * tileSize, randY * tileSize));
    }
}

function createMapImages(onload) {
    serverGet("connect.php", { query: "tiles" }, function (text) {
        var links = JSON.parse(text);
        mapImages = [];

        for (var link of links) {
            var image = createImage("tiles/" + link);
            mapImages.push(image);
        }
        onload();
    });
}

function winGame() {
    winner = true;
}