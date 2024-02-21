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
        locatieOption = document.querySelector(`option[value='${pad[index]}']`)
        locatieSpan.textContent = locatieOption.textContent
    }

    const padVolgende = () => {
        if (index !== pad.length -1) {
            index++;
        }
        fotoKader.setAttribute("src","#" + pad[index])
        locatieOption = document.querySelector(`option[value='${pad[index]}']`)
        locatieSpan.textContent = locatieOption.textContent
    }

    const padVorige = () => {
        if (index !== 0) {
            index--;
        }
        fotoKader.setAttribute("src","#" + pad[index])
        locatieOption = document.querySelector(`option[value='${pad[index]}']`)
        locatieSpan.textContent = locatieOption.textContent
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
