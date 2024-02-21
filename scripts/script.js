let pad = []
let locatieOption = []
const setup = () => {
    let menuChoice = document.getElementById("vanButton").value;

    let btnstart = document.getElementById("startButton")
    btnstart.addEventListener("click", startPathFinding)

    let locatieSpan = document.getElementById("locatie")

    let index = 0;

    vanButton = document.getElementById("vanButton");
    locatieSpan.textContent = vanButton.options[vanButton.selectedIndex].textContent

    const updateMenu = () => {
        menuChoice = document.getElementById("vanButton").value;
        fotoKader.setAttribute("src","#" + menuChoice)

        vanButton = document.getElementById("vanButton");
        locatieOption = vanButton.options[vanButton.selectedIndex]
        locatieSpan.textContent = locatieOption.textContent
    }

    const padStart = () => {
        index = 0
        fotoKader.setAttribute("src","#" + pad[0])
        setArrow(pad[0],pad[1])

        locatieOption = document.querySelector(`option[value='${pad[index]}']`)
        locatieSpan.textContent = locatieOption.textContent
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
        locatieOption = document.querySelector(`option[value='${pad[index]}']`)
        locatieSpan.textContent = locatieOption.textContent
    }

    const padVorige = () => {
        if (index !== 0) {
            index--;
            setArrow(pad[index],pad[index+1])
        }
        fotoKader.setAttribute("src","#" + pad[index])
        locatieOption = document.querySelector(`option[value='${pad[index]}']`)
        locatieSpan.textContent = locatieOption.textContent
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
    let menuveld = document.getElementById("vanButton");
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

AFRAME.registerComponent('zoom-controls', {
    schema:{
        min:{type:"number", default: 20},
        max: {type:"number", default: 80}
    },
    init: function(){
        let self = this;
        let sceneEl = document.querySelector("a-scene");
        self.camera = sceneEl.querySelector("#camera");
        console.log('min: ', self.data.min);
        console.log('max: ', self.data.max);
        window.addEventListener("wheel", event =>{
            let amount = Math.sign(event.deltaY)*5 ;
            let fov = Number(self.camera.getAttribute('camera').fov);
            let adjust = amount + fov;
            if(adjust < self.data.min) {adjust = self.data.min;}
            if (adjust > self.data.max) {adjust = self.data.max;}
            console.log('zoom: ', adjust);
            self.camera.setAttribute('camera', 'fov', adjust);
        });
    }
});

window.addEventListener("load", setup);
