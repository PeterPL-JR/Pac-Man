var elem = getId("game-canvas");
var canvas = elem.getContext("2d");

var content = getId("content");
var healthPointsDiv = getId("health-points");
var pointsDiv = getId("points");
var gameOverDiv = getId("game-over");

var tiles = [];
const ghosts = [];

var gameCoins = [];
var gamePowers = [];
var yourCoins = 0;

// Player Data
const speed = 2.5;
const eatTime = 16;

const spectreSpeed = 1;
const deadSpeed = 10;
var pacmans = 3;
var points = 0;
var destroyedSpectres = 0;

// Points Data
const pointsForCoin = 10;
const pointsForPower = 50;

// Movement Data
var xDir = 0;
var yDir = 0;

var nextMove = null;
var secondsInterval = null;

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
const totalSpectreTime = 11;

var time = 0;
var secondsTime = 0;
var controlling = true;
var beginImage;

var fullPlayerImage;
var playerNowImage;
var coinImage;
var powerImage;

var pre = true;
var preRenderGhosts = false;

var preWinner = false;
var winner = false;
var over = false;
var playerDead = false;
var winnerColors = false;

// Screen & Map Data
var mapWidth;
var mapHeight;

var width;
var height;

var mapPixels;
var mapImages;
var winnerImages;

// Spectre Variables
var spectreFaces1 = [];
var spectreFaces2 = [];
var deadFaces = [];

var spectreEndFaces1 = [];
var spectreEndFaces2 = [];

var spectreIntervals = [];
var spectreTimes = [];

function draw() {
    requestAnimationFrame(draw);

    if (secondsInterval == null && !pre) {
        // Time Interval
        secondsInterval = setInterval(function () {
            secondsTime++;
        }, 1000);
    }

    var spectresSum = 0;
    for (var ghost of ghosts) {
        if (ghost.spectre) spectresSum++;
    }
    if (spectresSum == 0) destroyedSpectres = 0;

    if (!pre) time++;
    controlling = (playerX < 0 || playerX + tileSize > width) ? false : true;

    if ((playerX + playerY) % 50 == 0) {
        if (nextMove != null) {
            var array = allTheRightMoves[nextMove];

            var xBufferDir = array[0];
            var yBufferDir = array[1];

            var tileX = playerX / tileSize + xBufferDir;
            var tileY = playerY / tileSize + yBufferDir;

            if (!(tiles[tileX][tileY].solid || tileX == (ghostBeginX / tileSize) && tileY == 4)) {
                xDir = xBufferDir;
                yDir = yBufferDir;

                playerNowImage = onAllTheRightFaces[nextMove];
                nextMove = null;
            }
        }
    }

    if (!winner && !over && !playerDead && !preWinner && !winner) {
        playerX += speed * xDir;
        playerY += speed * yDir;
    }

    if ((playerX + playerY) % 50 == 0) {
        var tileX = playerX / tileSize + xDir;
        var tileY = playerY / tileSize + yDir;

        if (tiles[tileX] && tiles[tileX][tileY] && (tiles[tileX][tileY].solid || tileX == (ghostBeginX / tileSize) && tileY == 4)) {
            xDir = 0;
            yDir = 0;
        }
    }

    // Render Tiles
    for (var x = 0; x < mapWidth; x++) {
        for (var y = 0; y < mapHeight; y++) {
            var index = tiles[x][y].tile;
            var imagesArray = winnerColors ? winnerImages : mapImages;
            canvas.drawImage(imagesArray[index], x * tileSize, y * tileSize);
        }
    }
    canvas.fillStyle = "#ffafa4";
    canvas.fillRect(ghostBeginX - 12, 4 * tileSize + 20, 74, 9);

    // Render Coins
    for (var coin of gameCoins) {
        canvas.drawImage(coinImage, coin[0] * tileSize, coin[1] * tileSize);
    }
    // Render Powers
    for (var power of gamePowers) {
        canvas.drawImage(powerImage, power[0] * tileSize, power[1] * tileSize);
    }

    // Render Ghosts
    if (!winner && !over && preRenderGhosts) {
        for (var ghost of ghosts) {
            ghost.update();
            canvas.drawImage(ghost.face, ghost.x, ghost.y);
            // break;
        }
    }

    var playerImage = (xDir == 0 && yDir == 0) ? fullPlayerImage : playerNowImage;
    var renderingImage = time % eatTime >= (eatTime * (4 / 9)) ? playerImage : fullPlayerImage;

    if (preWinner || winner || over || playerDead) renderingImage = fullPlayerImage;
    if (!winner && !over) canvas.drawImage(renderingImage, playerX, playerY);

    updateTitles();

    if ((playerX + playerY) % 50 == 0) {
        var coinIndex = gameCoins.findIndex(function (obj) {
            return (obj[0] == playerX / tileSize) && (obj[1] == playerY / tileSize);
        });
        var powerIndex = gamePowers.findIndex(function (obj) {
            return (obj[0] == playerX / tileSize) && (obj[1] == playerY / tileSize);
        });

        // Take a Coin
        if (coinIndex != -1) {
            gameCoins.splice(coinIndex, 1);
            yourCoins++;
            points += pointsForCoin;
            updatePoints();

            // If Player wins a game
            if (gameCoins.length == 0) {
                winGame();
            }
        }
        // Take a Power
        if (powerIndex != -1) {
            gamePowers.splice(powerIndex, 1);
            points += pointsForPower;
            updatePoints();
            setSpectreMode();
        }
    }

    // Print
    if (time == 1) {

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

function updateHealth() {
    // Player Health Points
    healthPointsDiv.innerHTML = "";
    for (var i = 0; i < pacmans - 1; i++) {
        var img = document.createElement("img");
        img.src = "images/player_left.png";
        img.className = "health-point";
        healthPointsDiv.appendChild(img);
    }
}

function updatePoints() {
    pointsDiv.innerHTML = points;
}

function updateTitles() {
    // Start Game Text
    if (pre) {
        canvas.fillStyle = "yellow";
        canvas.font = "bold 42px Verdana";
        canvas.fillText("READY!", ghostBeginX - 60, 392);
    }

    // Winner Text
    if (winner) {
        canvas.fillStyle = "yellow";
        canvas.font = "bold 45px Verdana";
        canvas.fillText("VICTORY!", ghostBeginX - 90, 392);
    }

    // Game Over Text
    if (over) {
        canvas.fillStyle = "red";
        canvas.font = "bold 42px Verdana";
        canvas.fillText("GAME OVER", ghostBeginX - 105, 392);
    }
}

function setSpectreMode() {
    for (var ghost of ghosts) {
        setSpectre(ghost);
    }
}

function setSpectre(ghost) {
    clearInterval(spectreIntervals[ghost.color]);
    spectreTimes[ghost.color] = 0;
    ghost.spectre = true;

    spectreIntervals[ghost.color] = setInterval(function () {
        spectreTimes[ghost.color]++;

        if (spectreTimes[ghost.color] > totalSpectreTime) {
            clearInterval(spectreIntervals[ghost.color]);
            spectreIntervals[ghost.color] = null;
            spectreTimes[ghost.color] = 0;
            ghost.spectre = false;
        }
    }, 1000);
}

function winGame() {
    preWinner = true;
    xDir = 0;
    yDir = 0;

    var counter = 0;
    var interval = null;

    setTimeout(function () {
        winner = true;
        points += (pacmans - 1) * 500;
        updatePoints();

        interval = setInterval(function () {
            winnerColors = counter % 2 == 0;
            counter++;
            if (counter >= 6) {
                clearInterval(interval);

                setTimeout(function () {
                    serverGet("connect.php", { query: "save-score", points: points, level: level }, function (text) {
                        if (logged) {
                            serverGet("connect.php", { query: "unlock", level: level + 1 }, function (text) {
                                window.location.href = "welcome.php";
                            });
                        } else {
                            window.location.href = "";
                        }
                    });
                }, 1000);
            }
        }, 250);
    }, 1000);
}

function losePoint() {
    playerDead = true;
    setTimeout(function () {
        pacmans--;
        secondsTime = 0;
        playerDead = false;
        updateHealth();

        ghosts.splice(0, 4);
        createGhosts();

        playerX = playerPositionsX[`${mapWidth}`] * tileSize;
        playerY = 11 * tileSize;

        xDir = 0;
        yDir = 0;

        if (pacmans <= 0) {
            gameOver();
        }
    }, 1000);
}

function gameOver() {
    over = true;
    xDir = 0;
    yDir = 0;

    setTimeout(function () {
        window.location.href = logged ? "welcome.php" : "";
    }, 2000);
}

function rightCursorPos(x, y) {
    return x > 530 && x < 810 && y > 355 && y < 390;
}