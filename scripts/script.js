let pad = ["h1.1", "h2.2","h3.3", "forum"]
const setup = () => {
    let menuChoice = document.getElementById("menu").value;

    let btnstart = document.getElementById("startButton")
    btnstart.addEventListener("click", startPathFinding)

    let index = 0;

    let progress = document.getElementById("progress")
    progress.max = pad.length - 1




    const updateMenu = () => {
        menuChoice = document.getElementById("menu").value;
        fotoKader.setAttribute("src","#" + menuChoice)
    }

    const padStart = () => {
        index = 0
        fotoKader.setAttribute("src","#" + pad[0])
    }

    const padVolgende = () => {
        if (index !== pad.length -1) {
            index++;
        }
        fotoKader.setAttribute("src","#" + pad[index])
        progress.value = index
    }

    const padVorige = () => {
        if (index !== 0) {
            index--;
        }
        fotoKader.setAttribute("src","#" + pad[index])
        progress.value = index
    }

    let volgendeButton = document.getElementById("volgendeButton");
    let vorigeButton = document.getElementById("vorigeButton");
    let startButton = document.getElementById("startButton");
    let fotoKader = document.getElementById("image-360");
    let menuveld = document.getElementById("menu");
    menuveld.addEventListener("change", updateMenu);
    startButton.addEventListener("click", padStart);
    volgendeButton.addEventListener("click", padVolgende);
    vorigeButton.addEventListener("click", padVorige);
}
const startPathFinding = () => {
    let start = document.getElementById("vanButton").value
    let eind = document.getElementById("naarButton").value

    const startRoom = Room.fromString(start)
    const eindRoom = Room.fromString(eind)


    const path = findShortestPath(startRoom,eindRoom)
    let ids = []
    for (val of path){
        ids.push(val.replace("_",".").toLowerCase())
    }
    pad = ids
}

window.addEventListener("load", setup);