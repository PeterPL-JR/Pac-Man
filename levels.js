function request(){
    var lvl;
    serverGet("connect.php", {query: "unlocked-levels"}, function(text) {
        lvl = parseInt(text);
        setup(lvl);
    });
}

function setup(lvl) {
    let mainDiv = getId("mainDiv");

    for(var i = 1; i <= 6; i++) {
        let div = document.createElement("div");
        mainDiv.appendChild(div);
        if(i <= lvl)
        {
            div.className = "levelActive";
            div.innerHTML = i;
            div.setAttribute("onclick", `startLevel(${i});`);
        }
        else
        {
            div.className = "levelDisabled";
            let img = document.createElement("img");
            img.src = "images/locked.png";
            img.className = "locked";
            div.appendChild(img);
        }
    }
}

function startLevel(index) {
    serverGet("connect.php", { query: "set-level", level: index}, function(text) {
        window.location.href = "index.html";
    });
}

request();