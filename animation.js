function spawn(){
    let pacman1 = document.createElement("img");
    let pacman2 = document.createElement("img");
    pacman1.src = "images/pacman1.png";
    pacman2.src = "images/pacman2.png";
    pacman1.className = "pacman";
    pacman2.className = "pacman";
    pacman1.id = "pacman1";
    pacman2.id = "pacman2";
    pacman1.style.setProperty("margin-top", "30px");
    pacman2.style.setProperty("margin-top", "750px");
    pacman2.style.setProperty("margin-left", "1750px");
    document.body.appendChild(pacman1);
    document.body.appendChild(pacman2);
    loop();
}
spawn();

function loop()
{
    var pacman1 = document.getElementById("pacman1");
    var pacman2 = document.getElementById("pacman2");
    var pacman1Pos = pacman1.offsetLeft;
    var pacman2Pos = pacman2.offsetLeft;
    var opacity = 0;
    let interval = setInterval(function(){
        if(pacman1Pos >= 1750 && pacman2Pos <= 0)
        {
            pacman1.remove();
            pacman2.remove();
            clearInterval(interval);
            spawn();
        }
        else
        {
            pacman1Pos += 1;
            pacman2Pos -= 1;
            pacman1.style.setProperty("margin-left", `${pacman1Pos}px`);
            pacman2.style.setProperty("margin-left", `${pacman2Pos}px`);
            if(pacman1Pos >= 1500 && pacman2Pos <= 250)
            {
                opacity > 0?opacity -= 0.005:"";
                pacman1.style.opacity = opacity;
                pacman2.style.opacity = opacity;
            }
            else
            {
                opacity <= 1?opacity += 0.005:"";
                pacman1.style.opacity = opacity;
                pacman2.style.opacity = opacity;
            }
        }
    }, 5);
}