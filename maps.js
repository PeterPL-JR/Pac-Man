function getMap(path, onload) {
    var image = new Image();
    image.src = "images/maps/" + path;
    var pixels = [];

    image.onload = function () {
        var memoryCanvas = document.createElement("canvas");
        var memory = memoryCanvas.getContext("2d");

        const width = image.width;
        const height = image.height;

        memoryCanvas.width = width;
        memoryCanvas.height = height;
        memory.drawImage(image, 0, 0);

        for (var x = 0; x < width; x++) {
            pixels[x] = [];
            for (var y = 0; y < height; y++) {
                pixels[x][y] = getColor(memory.getImageData(x, y, 1, 1).data);
            }
        }

        if (onload != null) {
            onload(pixels);
        }
    }
}

function connectMap(index, onload) {
    serverGet("connect.php", {query: "map", index: index}, function(text) {
        var array = JSON.parse(text);
        onload(array);
    })
}

function getColor(data) {
    if (data[0] == 1) data[0] = 0;
    return {
        r: data[0],
        g: data[1],
        b: data[2]
    };
}

function getColorRGB(color) {
    return `rgb(${color.r},${color.g},${color.b})`;
}

function createImage(src) {
    var randId = "image" + getRandom(100, 999);

    var img = document.createElement("img");
    img.src = "images/" + src;
    img.style.transform = "rotateZ(90deg)";
    img.id = randId;
    document.body.appendChild(img);

    var elem = document.getElementById(randId);
    img.remove();
    return elem;
}

function createMapTiles(pixels, mapWidth, mapHeight) {
    var tiles = [];

    for(var x = 0; x < mapWidth; x++) {
        tiles[x] = [];
        for(var y = 0; y < mapHeight; y++) {
            var block = (pixels[x][y] == -11); 
            var index = pixels[x][y];
            if(index == -11) index = 13;
            
            tiles[x][y] = { 
                tile: index,
                solid: (index != 13),
                block: block
            };
        }
    }
    return tiles;
}