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
    constructor(color, xStart, yStart) {
        this.x = xStart;
        this.y = yStart;

        this.color = color;
        this.init();
    }
    init() {
        var name = this.color + "_ghost_";
        this.speed = speeds[ghostsColors.indexOf(this.color)];

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

        if((this.x + this.y) % tileSize == 0) {
            var rightMoves = [];
            
            for(var move of ghostsMoves) {
                var x = this.x / tileSize + move[0];
                var y = this.y / tileSize + move[1];

                if(tiles[x] && tiles[x][y] && !tiles[x][y].solid) {
                    rightMoves.push(move);
                }
            }

            if((rightMoves.length == 2 && Math.abs(rightMoves[0][0]) == Math.abs(rightMoves[1][0]) && Math.abs(rightMoves[0][1]) == Math.abs(rightMoves[1][1]))) {
                
            }
            var thisMove = rightMoves[getRandom(0, rightMoves.length - 1)];
            this.xDir = thisMove[0];
            this.yDir = thisMove[1];
        }

        this.x += this.speed * this.xDir;
        this.y += this.speed * this.yDir;
    }
}

function findWay(ghost) {
    var queue = [];

    // Create 0-1 Map
    var map = [];
    for(var x = 0; x < mapWidth; x++) {
        map[x] = [];
        for(var y = 0; y < mapHeight; y++) {
            map[x][y] = tiles[x][y].solid ? 1 : 0;
        }
    }

    // Position Variables
    var ghostX = ghost.x / tileSize;
    var ghostY = ghost.y / tileSize;

    var playerPosX = playerX / tileSize;
    var playerPosY = playerY / tileSize;

    var ghostPos = [ghostX, ghostY];
    var playerPos = [playerPosX, playerPosY];

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
                
                for(var j = 1; j < poses.length; j++) {
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