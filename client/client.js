/////Client Setup/////
let myCanvas = document.getElementById("myCanvas");
let ctx = myCanvas.getContext("2d");
let Height = window.innerWidth >window.innerHeight?window.innerHeight:window.innerWidth;
let Width = window.innerWidth >window.innerHeight?window.innerWidth:window.innerHeight;
myCanvas.style.top = 0;
myCanvas.style.left = 0;
myCanvas.style.zIndex = 5;
myCanvas.width = Width;
WidthM = Width/2;
myCanvas.height = Height;
HeightM = Height/2;
myCanvas.style.position = "absolute";

const socket = io.connect('/');
socket.onAny((packetName, packet)=>{recievePacket(packetName, packet)});

function sendToServer(packetName, packetType, packet){
    socket.emit(packetName, packetType, packet)
}

function recievePacket(packetName, packet){
    console.log("Recieved packet named: " + packetName + ", Containing: " + packet)
}
//////////



/////Login & Permissions/////
function login(username, password){
    sendToServer("loginRequest", "loginCredentials", [username, password])
}



//////////



/////
let zoomFactor = 1;
let regionTileSize = 30*zoomFactor;
let mouseTile= [0,0]; //what tile the mouse is on
let mouseRegion; //what region the mouse is on
let buildRegion; //the region you are currently creating

let img;
function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  img = createImg('https://geology.com/world/china-provinces-map.gif');
  drawbackground()
};

function drawBackground() {
    background(220);
    image(img,0,0,900*scale,822*scale);
};

///for creating regions
function createRegionsDraw(){
    mouseTile = [Math.floor(mouseX/regionTileSize),Math.floor(mouseY/regionTileSize)];

    if(mouseIsPressed){
        if(mouseRegion){
            mouseRegion.builderClick
        };
    };
    currentRegion.draw()
        fill("rgba(240, 240, 240, 0.3)")
        rect(mouseTile[0]*sqsize,mouseTile[1]*sqsize,sqsize,sqsize)
    if(mousedown){
        addTileToRegion()
    };
};

function addTileToRegion(){
    sendToServer("worldTileRegionSet", "variableModify", [1, "dictChange", "worldTiles", [[mouseTile[0]+","+mouseTile[1]], buildRegion]]);
    sendToServer("regionTileSet", "variableModify", [3, "arrayAdd", "regions", JSON.stringify[buildRegion], "regionTiles", [mouseTile[0]+","+mouseTile[1]]]);
};

///for viewing regions
function viewMapDraw(){
    mouseTile = [Math.floor(mouseX/regionTileSize),Math.floor(mouseY/regionTileSize)];
    mouseRegion = sendToServer("mouseRegionRequest", "variableRequest", [3, "worldTiles", [mouseTile[0]+","+mouseTile[1]]]);

    fill(mouseRegion.hovercolor)
    mouseRegion.grids.forEach((e)=>{
        rect(e[0]*sqsize,e[1]*sqsize,sqsize,sqsize)
    });

    if(mouseIsPressed){
        if(world.regions[mouseRegion]){
            world.regions[mouseRegion].viewerClick
        };
    };
};