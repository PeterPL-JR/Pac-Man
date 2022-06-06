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
    updateHealth();
    updatePoints();

    // Time Interval
    setInterval(function () {
        secondsTime++;
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
    var targets = [
        [1, 1], [25, 1], [6, 11], [20, 11]
    ];

    for (var i = 0; i < ghostsColors.length; i++) {
        var startX = 11 * tileSize + i * tileSize;
        var startY = 5 * tileSize;

        if (i == 0) {
            startX = 13 * tileSize;
            startY = 3 * tileSize;
        }

        var ghost = new Ghost(ghostsColors[i], startX, startY, targets[i][0], targets[i][1], beginTimes[i]);
        ghosts.push(ghost);
        // break;
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