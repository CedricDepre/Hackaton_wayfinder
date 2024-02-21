let pad = ["h1.1", "h2.1","h2.2", "forum"]
const setup = () => {


    let menuChoice = document.getElementById("menu").value;

    let btnstart = document.getElementById("startButton")
    btnstart.addEventListener("click", startPathFinding)

    let index = 0;

    const updateMenu = () => {
        menuChoice = document.getElementById("menu").value;
        fotoKader.setAttribute("src","#" + menuChoice)
    }

    const padStart = () => {
        fotoKader.setAttribute("src","#" + pad[0])
        setArrow(pad[0],pad[1])

    }

    const padVolgende = () => {
        if (index !== pad.length -1) {
            index++;
            if(index !== pad.lenght -2){
                setArrow(pad[index],pad[index+1])
            }

        }else{
            hideArrow();
        }
        fotoKader.setAttribute("src","#" + pad[index])
    }

    const padVorige = () => {
        if (index !== 0) {
            index--;
            setArrow(pad[index],pad[index+1])
        }
        fotoKader.setAttribute("src","#" + pad[index])
    }

    const hideArrow = () =>{
        var pijl = document.getElementById('pijl');
        pijl.style.display = 'none';
    }

    const setArrow = (locatie1, locatie2) => {
        var loc0 = locatie1.replace(".","_").replace("h","H")
        var loc1 = locatie2.replace(".","_").replace("h","H")

        var arrowDetails = getArrowDetails(loc0,loc1)

        var pijl = document.getElementById('pijl');


// De eerste drie waardes instellen als positie
        var posX = arrowDetails[0];
        var posY = arrowDetails[1];
        var posZ = arrowDetails[2];
        pijl.setAttribute('position', posX + ' ' + posY + ' ' + posZ);

// De laatste drie waardes instellen als rotatie
        var rotX = arrowDetails[3];
        var rotY = arrowDetails[4];
        var rotZ = arrowDetails[5];
        pijl.setAttribute('rotation', rotX + ' ' + rotY + ' ' + rotZ);
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