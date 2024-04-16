let myCanvas = document.getElementById("myCanvas")
let ctx = myCanvas.getContext("2d")
let Height = window.innerWidth >window.innerHeight?window.innerHeight:window.innerWidth
let Width = window.innerWidth >window.innerHeight?window.innerWidth:window.innerHeight
myCanvas.style.top = 0
myCanvas.style.left = 0
myCanvas.style.zIndex = 5
myCanvas.width = Width
WidthM = Width/2
myCanvas.height = Height
HeightM = Height/2
myCanvas.style.position = "absolute"

const socket = io.connect('/')
let info = "yum"
socket.emit("JOINGAME", info)

socket.on("SENDINFO", (gotInfo)=>{console.log(gotInfo)});
socket.emit("GETINFO", Shanghai.controlScores);

////////////////////////////////////////////////////////
//world.worldTiles
//world.regions
//
let zoomFactor = 1;
let regionTileSize = 30*zoomFactor;
let mouseTile= [0,0];
let mouseRegion;

function draw(){
    mouseTile = [Math.floor(mouseX/regionTileSize),Math.floor(mouseY/regionTileSize)];
    mouseRegion = world.worldTiles[mouseTile[0]+","+mouseTile[1]];

    if(mouseIsPressed){
        if(world.regions[mouseRegion]){
            world.regions[mouseRegion].clicked
        };
    };
};