var labirynt = [];
var html = [];
var gotowy = false;
const kolor = "rgb(37, 15, 161)";

var gra = function(e) {
    if(gotowy) {
        var style = getComputedStyle(html[playerX][playerY]);
        if (e.keyCode == 37) {
            if(style.getPropertyValue("border-left-width") == "0px") {
                html[playerX][playerY].innerHTML = '';
                playerY--;
                if(html[playerX][playerY].innerHTML == 'f') {
                    wygrana();
                }
                html[playerX][playerY].innerHTML = "♦";
            }
        }
        if (e.keyCode == 38) {
            if(style.getPropertyValue("border-top-width") == "0px") {
                html[playerX][playerY].innerHTML = '';
                playerX--;
                if(html[playerX][playerY].innerHTML == 'f') {
                    wygrana();
                }
                html[playerX][playerY].innerHTML = "♦";
            }
        }
        if (e.keyCode == 39) {
            if(style.getPropertyValue("border-right-width") == "0px") {
                html[playerX][playerY].innerHTML = '';
                playerY++;
                if(html[playerX][playerY].innerHTML == 'f') {
                    wygrana();
                }
                html[playerX][playerY].innerHTML = "♦";
            }
        }
        if (e.keyCode == 40) {
            if(style.getPropertyValue("border-bottom-width") == "0px") {
                html[playerX][playerY].innerHTML = '';
                playerX++;
                if(html[playerX][playerY].innerHTML == 'f') {
                    wygrana();
                }
                html[playerX][playerY].innerHTML = "♦";
            }
        }
    }
};
var box;
var f = function(e) {
    if(e.key.toLowerCase() == "n") {
        box.remove();
    }
    else if(e.key.toLowerCase() == "y") {
        box.remove();
        load();
    }
}

window.onload = load;

function load() {
    document.removeEventListener('keydown', f)
    var tab = document.getElementById("labirynt");
    tab.innerHTML = "";
    for(var i = 0; i < 12; i++) {
        labirynt[i] = [];
        html[i] = [];
        var tr = document.createElement("tr");
        tab.appendChild(tr);
        for(var j = 0; j < 24; j++) {
            var komorka = document.createElement("td");
            komorka.id = "komorka";
            tr.appendChild(komorka);
            labirynt[i][j] = "";
            html[i][j] = komorka;
        }
    }

    stworz();
}
var x, y;
var playerX, playerY;
function stworz() {
    x = Math.floor(Math.random() * html.length);
    y = Math.floor(Math.random() * html[x].length);

    playerX = x;
    playerY = y;

    html[x][y].innerHTML = 's';
    html[x][y].style.backgroundColor = kolor;
    labirynt[x][y] = 's'
    
    lab();

    document.addEventListener("keydown", gra)
}

function lab() {
    setTimeout(function() {
        if( (labirynt[x + 1] && labirynt[x + 1][y] == "") || 
            (labirynt[x - 1] && labirynt[x - 1][y] == "") || 
            labirynt[x][y + 1] == "" || 
            labirynt[x][y - 1] == "") {
            idz();
            lab();
        }
        else {
            if(!cofnij()) {
                html[playerX][playerY].innerHTML = "♦";
                gotowy = true;
                var finx = Math.floor(Math.random() * html.length);
                var finy = Math.floor(Math.random() * html[x].length);
                html[finx][finy].innerHTML = "f";
            }
            else
                lab();
        }
        
    }, 10)
}

function komorka(x, y, kierunek) {
    html[x][y].innerHTML = kierunek;
    labirynt[x][y] = kierunek;
    html[x][y].style.backgroundColor = kolor;
    if(kierunek == 'a') {
        html[x - 1][y].style.borderBottom = "none";
        html[x][y].style.borderTop = "none"
    }
    if(kierunek == 'b') {
        html[x + 1][y].style.borderTop = "none"
        html[x][y].style.borderBottom = "none"

    }
    if(kierunek == 'c') {
        html[x][y - 1].style.borderRight = "none"
        html[x][y - 1].style.width = parseInt(html[x][y - 1].style.width) + 5 + "px";
        html[x][y].style.borderLeft = "none"
        html[x][y].style.width = parseInt(html[x][y].style.width) + 5 + "px";
    }
    if(kierunek == 'd') {
        html[x][y + 1].style.borderLeft = "none"
        html[x][y + 1].style.width = parseInt(html[x][y + 1].style.width) + 5 + "px";
        html[x][y].style.borderRight = "none"
        html[x][y].style.width = parseInt(html[x][y].style.width) + 5 + "px";
    }
    
}

function cofnij() {
    var k = html[x][y].innerHTML;
    if(k == 's'){
        return false;
    }
    html[x][y].innerHTML = "";
    switch(k) {
        case 'a':
            x--;
            break;
        case 'b':
            x++;
            break;
        case 'c':
            y--;
            break;
        case 'd':
            y++;
            break;            
    }
    return true;
}

function idz() {
    var rand = Math.random();

        if(rand < 0.25) {
            if(html[x + 1] != undefined && labirynt[x + 1][y] == "") {
                x++;
                komorka(x, y, "a");
            }
        }
        else if (rand < 0.5) {
            if(html[x - 1] != undefined && labirynt[x - 1][y] == "") {
                x--;
                komorka(x, y, "b");
            }
        }
        else if (rand < 0.75){
            if(html[x][y + 1] != undefined && labirynt[x][y + 1] == "") {
                y++;
                komorka(x, y, "c");
            }
        }
        else {
            if(html[x][y - 1] != undefined && labirynt[x][y - 1] == "") {
                y--;
                komorka(x, y, "d");
            }
        }
}

function wygrana() {
    box = document.createElement("div");
    document.removeEventListener("keydown", f)
    box.id = "wygrana";
    box.innerHTML = "Wygrales!<br>Zagrac ponownie? (Y/N)";
    document.body.appendChild(box);    
    
    document.addEventListener("keydown", f)
    gotowy = false;
}