function setup(){
    let mainDiv = getId("mainDiv");
    var lvl = 1;
    for(var i = 0; i<2; i++)
    {
        for(var j = 0; j<4; j++)
        {
            let div = document.createElement("div");
            mainDiv.appendChild(div);
            if(lvl == 1)
            {
                div.className = "levelActive";
                div.innerHTML = lvl;
                div.setAttribute("onclick", `startLevel(${lvl});`);
            }
            else
            {
                div.className = "levelDisabled";
                let img = document.createElement("img");
                img.src = "images/locked.png";
                img.className = "locked";
                // div.innerHTML = lvl;
                div.appendChild(img);
            }
            lvl++;
        }
    }
}

function startLevel(index) {
    serverGet("connect.php", { query: "set-level", level: index}, function(text) {
        window.location.href = "index.html";
    });
}

setup();