const ghostsColors = [
    "red", "blue", "orange", "pink"
];
const speeds = [
    2.5, 2, 2, 2.5
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
    constructor(color, xStart, yStart, xTarget, yTarget) {
        this.x = xStart;
        this.y = yStart;

        this.spectre = false;
        this.xDir = 0;
        this.yDir = 0;

        this.moveIndex = 3;
        this.time = 0;
        this.firstTarget = false;
        this.mode = "go-to-target";
        this.way = findWay(this, xTarget, yTarget);
        // this.firstTarget = true;
        // this.mode = "go-random";
        // this.way = null;

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

    update() {
        console.log(this.spectre);
        if ((this.x + this.y) % tileSize == 0) {
            // Control Spectre Mode
            if(this.spectre && this.speed == this.mainSpeed) this.speed = spectreSpeed;
            if(!this.spectre && this.speed == spectreSpeed) this.speed = this.mainSpeed;

            if (this.firstTarget && this.mode == "go-random" && this.way == null) {
                var random = getRandom(0, 11);

                if (random == 11) {
                    this.way = findWay(this, playerX / tileSize, playerY / tileSize);
                    this.mode = "go-to-target";
                }
            }

            if (this.mode == "go-to-target") this.goToTarget();
            else if (this.mode == "go-random") this.goRandom();

        }
        
        if((this.x + this.y) % tileSize == 0) {
            var moveX = this.x / tileSize + this.xDir;
            var moveY = this.y / tileSize + this.yDir;
            
            if(tiles[moveX] && tiles[moveX][moveY] && !tiles[moveX][moveY].solid) {
                this.move();
            } else {
                this.xDir = -this.xDir;
                this.yDir = -this.yDir
                this.mode = "go-random";
            }
        } else {
            this.move();
        }
        this.time++;
        this.updateTexture();
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
                this.mode = "go-random";
            }
        }
    }

    updateTexture() {
        var moveIndex = -1;

        for(var i = 0; i < ghostsMoves.length; i++) {
            if(this.xDir == ghostsMoves[i][0] && this.yDir == ghostsMoves[i][1]) moveIndex = i;
        }
        if(moveIndex != -1) this.moveIndex = moveIndex;
        
        var facesArray1 = this.spectre ? spectreFaces1 : this.faces1;
        var facesArray2 = this.spectre ? spectreFaces2 : this.faces2;
        this.face = (this.time % 40) >= 20 ? facesArray1[this.moveIndex] : facesArray2[this.moveIndex];
    }

    move() {
        if(!winner) {
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

    // Position Variables
    var ghostX = ghost.x / tileSize;
    var ghostY = ghost.y / tileSize;

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

        spectreFaces1.push(createImage(image1));
        spectreFaces2.push(createImage(image2));
    }
}

function absMove(move) {
    var xMove = Math.abs(move[0]);
    var yMove = Math.abs(move[1]);
    return [xMove, yMove];
}