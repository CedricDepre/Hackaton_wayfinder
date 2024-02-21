let pad = []
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
