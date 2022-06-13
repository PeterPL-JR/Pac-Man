var logged = false;
var level = null;

const playerPositionsX = {
    "27": 13,
    "33": 16
};

const ghostsTargets = {
    "27": [[1, 1], [25, 1], [6, 11], [20, 11]],
    "33": [[1, 1], [31, 1], [6, 11], [26, 11]]
};

const paddlePositions = {
    
};

const tileSize = 50;
var playerX;
var playerY;

var ghostBeginX;
var ghostBeginY;

function init() {
    for (var i = 0; i < 4; i++) onAllTheRightFaces[movingKeys[i]] = createImage("player_" + dirs[i] + ".png");
    beginImage = onAllTheRightFaces["D"];

    for (var color of ghostsColors) {
        spectreIntervals[color] = null;
        spectreTimes[color] = 0;
    }

    // Load Images
    fullPlayerImage = createImage("player_full.png");
    coinImage = createImage("coin.png");
    powerImage = createImage("power.png");
    getSpectreFaces();

    serverGet("connect.php", {query: "get-level"}, function(text) {
        var levelNumber = parseInt(text);
        if(isNaN(levelNumber)) levelNumber = 1;
        else {
            logged = true;
            getId("level-name").innerHTML = "Level " + levelNumber;
        }
        level = levelNumber;

        connectMap(levelNumber, function (array) {
            // Size Variables
            mapWidth = array['width'];
            mapHeight = array['height'];

            var content = getId("content");
            content.style.width = (mapWidth * tileSize) + "px";
            content.style.height = (mapHeight * tileSize) + "px";

            // Set Player Position
            playerX = playerPositionsX[`${mapWidth}`] * tileSize;
            playerY = 11 * tileSize;

            // Set Ghosts Begin Position 
            ghostBeginX = playerPositionsX[`${mapWidth}`] * tileSize;
            ghostBeginY = 5 * tileSize;
    
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
    
            createMapImages(levelNumber, function () {
                document.body.onkeydown = function (event) {
                    var key = event.key.toUpperCase();
                    if (controlling && !pre && !winner && !over && !preWinner && movingKeys.indexOf(key) != -1) {
                        nextMove = key;
                    }
                }
                createCoins();
                draw();
            });
        });
    });
    updateHealth();
    updatePoints();

    // Start Game
    var counter = 0;
    var preInterval =setInterval(function() {
        counter++;
        if(counter == 3) {
            preRenderGhosts = true;
        }
        if(counter >= 5) {
            clearInterval(preInterval);
            pre = false;
        }
    }, 1000);
}

function createCoins() {
    // Create Coins on the map
    for (var y = 0; y < mapHeight; y++) {
        for (var x = 0; x < mapWidth; x++) {
            if (tiles[x][y].power) gamePowers.push([x, y]);
            if (tiles[x][y].solid || tiles[x][y].block || tiles[x][y].power) continue;
            gameCoins.push([x, y]);
        }
    }
}

function createGhosts() {
    var targets = ghostsTargets[`${mapWidth}`];

    for (var i = 0; i < ghostsColors.length; i++) {
        var startX = (ghostBeginX / tileSize - 2) * tileSize + i * tileSize;
        var startY = 5 * tileSize;

        if (i == 0) {
            startX = ghostBeginX;
            startY = 3 * tileSize;
        }

        var ghost = new Ghost(ghostsColors[i], startX, startY, targets[i][0], targets[i][1], beginTimes[i]);
        ghosts.push(ghost);
    }
}

function createMapImages(levelIndex, onload) {
    serverGet("connect.php", { query: "tiles" }, function (text) {
        var links = JSON.parse(text);
        mapImages = [];
        winnerImages = [];

        for (var link of links) {
            var image = createImage("tiles/level" + levelIndex + "/" + link);
            mapImages.push(image);

            var winnerImage = createImage("tiles/winner/" + link);
            winnerImages.push(winnerImage);
        }
        onload();
    });
}