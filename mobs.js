const _mode_random = 0;
const _mode_target = 1;
const _mode_begin = 2;

const ghostsColors = [
    "red", "blue", "orange", "pink"
];
const speeds = [
    2, 2, 2, 2
];
const beginTimes = [
    0, 5, 10, 15
];

const ghostsMoves = [
    [0, -1], [0, 1],
    [-1, 0], [1, 0]
];

const dirs = [
    "up", "down",
    "left", "right"
];

class Ghost {
    constructor(color, xStart, yStart, xTarget, yTarget, beginTime) {
        this.x = xStart;
        this.y = yStart;
        this.beginTime = beginTime;
        this.beforeStart = true;

        this.spectre = false;
        this.dead = false;
        this.deadWay = null;

        this.xDir = 0;
        this.yDir = 0;

        // Begin Variables
        this.xStart = xStart;
        this.yStart = yStart;

        this.xTarget = xTarget;
        this.yTarget = yTarget;

        this.moveIndex = 3;
        this.time = 0;
        this.firstTarget = false;
        this.way = findWay(this, this.xTarget, this.yTarget);
        this.mode = _mode_target;

        this.color = color;
        this.init();
    }
    init() {
        var name = this.color + "_ghost_";
        this.speed = speeds[ghostsColors.indexOf(this.color)];
        this.mainSpeed = this.speed;

        this.faces1 = [];
        this.faces2 = [];

        for (var dir of dirs) {
            var image1 = "ghosts/" + name + dir + "_1.png";
            var image2 = "ghosts/move/" + name + dir + "_2.png";

            this.faces1.push(createImage(image1));
            this.faces2.push(createImage(image2));
        }
        this.face = this.faces1[1];
    }

    destroy() {
        var index = ghostsColors.indexOf(this.color);
        ghosts[index] = new Ghost(this.color, ghostBeginX, ghostBeginY, this.xTarget, this.yTarget, this.beginTime);
    }

    update() {
        this.time++;
        this.updateTexture();
        if (secondsTime < this.beginTime || pre || playerDead || over || preWinner) return;

        // Set Speed on Dead
        if (this.dead && this.speed != deadSpeed && (this.x + this.y) % tileSize == 0) this.speed = deadSpeed;

        // Destroy Ghost
        if (this.dead && this.x == ghostBeginX && this.y == ghostBeginY) this.destroy();

        if (!this.dead && (this.y == playerY && commonPixels(playerX, this.x, tileSize, tileSize) || this.x == playerX && commonPixels(playerY, this.y, tileSize, tileSize))) {
            if (this.spectre) {
                destroyedSpectres++;

                // Points scored by player
                var scoredPoints = 100;
                for (var i = 0; i < destroyedSpectres; i++) scoredPoints *= 2;
                points += scoredPoints;
                updatePoints();

                spectreTimes[this.color] = 0;
                clearInterval(spectreIntervals[this.color]);
                spectreIntervals[this.color] = null;

                this.x = Math.round(this.x / tileSize) * tileSize;
                this.y = Math.round(this.y / tileSize) * tileSize;

                var beginX = ghostBeginX / tileSize;
                var beginY = ghostBeginY / tileSize;

                this.xDir = 0;
                this.yDir = 0;

                this.dead = true;
                this.spectre = false;
                this.way = findWay(this, beginX, beginY);
                this.mode = _mode_target;
            } else {
                losePoint();
            }
        }

        if ((this.x + this.y) % tileSize == 0) {
            // Control Spectre Mode
            if (this.spectre && this.speed == this.mainSpeed) this.speed = spectreSpeed;
            if (!this.spectre && this.speed == spectreSpeed) this.speed = this.mainSpeed;

            if (this.firstTarget && this.mode == _mode_random && this.way == null) {
                var random = getRandom(0, 11);

                if (random == 11 && !this.spectre) {
                    this.way = findWay(this, playerX / tileSize, playerY / tileSize);
                    this.mode = _mode_target;
                }
            }

            if (this.mode == _mode_target || this.mode == _mode_target) this.goToTarget();
            else if (this.mode == _mode_random) this.goRandom();
        }

        if ((this.x + this.y) % tileSize == 0) {
            var moveX = this.x / tileSize + this.xDir;
            var moveY = this.y / tileSize + this.yDir;

            if (tiles[moveX] && tiles[moveX][moveY] && !tiles[moveX][moveY].solid) {
                this.move();
            } else {
                this.xDir = -this.xDir;
                this.yDir = -this.yDir
                if (!this.dead) {
                    this.mode = _mode_random;
                }
            }
        } else {
            this.move();
        }
    }

    goRandom() {
        var rightMoves = [];

        for (var move of ghostsMoves) {
            var x = this.x / tileSize + move[0];
            var y = this.y / tileSize + move[1];

            if (tiles[x] && tiles[x][y] && !tiles[x][y].solid) {
                rightMoves.push(move);
            }
        }

        var thisMove;
        if (rightMoves.length >= 2) {
            var move1 = JSON.stringify(absMove(rightMoves[0]));
            var move2 = JSON.stringify(absMove(rightMoves[1]));
        }

        if (rightMoves.length == 2 && move1 == move2) {
            thisMove = [this.xDir, this.yDir];
        } else {
            thisMove = rightMoves[getRandom(0, rightMoves.length - 1)];
        }
        this.xDir = thisMove[0];
        this.yDir = thisMove[1];
    }

    goToTarget() {
        if (this.way != null) {

            var moveX = this.way[0][0];
            var moveY = this.way[0][1];

            this.xDir = moveX;
            this.yDir = moveY;
            this.way.shift();

            if (this.way.length <= 0) {
                if (!this.firstTarget) {
                    this.firstTarget = true;
                }
                this.way = null;
                this.mode = _mode_random;
            }
        }
    }

    updateTexture() {
        var moveIndex = -1;

        for (var i = 0; i < ghostsMoves.length; i++) {
            if (this.xDir == ghostsMoves[i][0] && this.yDir == ghostsMoves[i][1]) moveIndex = i;
        }
        if (moveIndex != -1) this.moveIndex = moveIndex;

        var facesArray1 = this.spectre ? spectreFaces1 : this.faces1;
        var facesArray2 = this.spectre ? spectreFaces2 : this.faces2;

        if (this.spectre && spectreTimes[this.color] >= totalSpectreTime - 2 && (this.time % 46) >= 23) {
            facesArray1 = spectreEndFaces1;
            facesArray2 = spectreEndFaces2;
        }
        if (this.dead) this.face = deadFaces[this.moveIndex];
        else this.face = (this.time % 40) >= 20 ? facesArray1[this.moveIndex] : facesArray2[this.moveIndex];
    }

    move() {
        if (!winner) {
            this.x += this.speed * this.xDir;
            this.y += this.speed * this.yDir;
        }
    }
}

function findWay(ghost, xPos, yPos) {
    var queue = [];

    // Create 0-1 Map
    var map = [];
    for (var x = 0; x < mapWidth; x++) {
        map[x] = [];
        for (var y = 0; y < mapHeight; y++) {
            map[x][y] = tiles[x][y].solid ? 1 : 0;
        }
    }

    xPos = Math.round(xPos);
    yPos = Math.round(yPos);

    // Position Variables
    var ghostX = Math.round(ghost.x / tileSize);
    var ghostY = Math.round(ghost.y / tileSize);

    var ghostPos = [ghostX, ghostY];
    var playerPos = [xPos, yPos];

    map[ghostPos[0]][ghostPos[1]] = 1;
    queue.push([ghostPos]);

    // Algorithm Code
    while (queue.length > 0) {
        var path = queue.shift();
        var pos = path[path.length - 1];
        var dir = [
            [pos[0] + 1, pos[1]],
            [pos[0], pos[1] + 1],
            [pos[0] - 1, pos[1]],
            [pos[0], pos[1] - 1]
        ];

        for (var i = 0; i < dir.length; i++) {
            if (dir[i][0] == playerPos[0] && dir[i][1] == playerPos[1]) {
                var poses = path.concat([playerPos]);
                var moves = [];

                for (var j = 1; j < poses.length; j++) {
                    var now = poses[j];
                    var previous = poses[j - 1];

                    var x = now[0] - previous[0];
                    var y = now[1] - previous[1];
                    moves.push([x, y]);
                }
                return moves;
            }

            if (dir[i][0] < 0 || dir[i][0] >= map.length || dir[i][1] < 0 || dir[i][1] >= map[0].length || map[dir[i][0]][dir[i][1]] != 0) {
                continue;
            }

            map[dir[i][0]][dir[i][1]] = 1;
            queue.push(path.concat([dir[i]]));
        }
    }
}

function getSpectreFaces() {
    for (var dir of dirs) {
        var image1 = "spectre_" + dir + "_1.png";
        var image2 = "spectre_" + dir + "_2.png";
        var deadImage = "eyes_" + dir + ".png";

        var imageEnd1 = "spectre_end_" + dir + "_1.png";
        var imageEnd2 = "spectre_end_" + dir + "_2.png";

        spectreFaces1.push(createImage(image1));
        spectreFaces2.push(createImage(image2));
        deadFaces.push(createImage(deadImage));

        spectreEndFaces1.push(createImage(imageEnd1));
        spectreEndFaces2.push(createImage(imageEnd2));
    }
}

function absMove(move) {
    var xMove = Math.abs(move[0]);
    var yMove = Math.abs(move[1]);
    return [xMove, yMove];
}

function commonPixels(firstCoord, secondCoord, firstSize, secondSize) {
    var firstPoints = [];
    var secondPoints = [];

    for (var first = firstCoord + 1; first < firstCoord + firstSize; first++) {
        firstPoints.push(first);
    }
    for (var second = secondCoord + 1; second < secondCoord + secondSize; second++) {
        secondPoints.push(second);
    }

    for (var first of firstPoints) {
        for (var second of secondPoints) {
            if (first == second) return true;
        }
    }
    return false;
}