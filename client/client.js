/////Client Setup/////
let myCanvas = document.getElementById("myCanvas");
let ctx = myCanvas.getContext("2d");
let Height = window.innerWidth >window.innerHeight?window.innerHeight:window.innerWidth;
let Width = window.innerWidth >window.innerHeight?window.innerWidth:window.innerHeight;
myCanvas.style.top = 0;
myCanvas.style.left = 0;
myCanvas.style.zIndex = 5;
myCanvas.width = Width;
myCanvas.height = Height;
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


class region{
    constructor(){
      this.grids = []
      this.color = "red"
      this.id = "IndoChina"
      this.adjacentRegions = {}
      
      this.lastCollected = Date.now()
      
    }
    
    addSquare(x,y){
      this.grids.push([x,y])
      world.allTiles[x+","+y] = this.id
    }
    
    draw(){
      ctx.fillStyle = this.color
      if(mouseRegion == this.id){ctx.fillStyle = "rgba(240, 240, 240, 0.3)"}
      this.grids.forEach((e)=>{
        ctx.rect(e[0]*regionTileSize,e[1]*regionTileSize,regionTileSize,regionTileSize)
      })
    }
    builderClick(){
      console.log(this.id+" was clicked")
    }
  }
  
  class world{
    static allTiles = {};
    static regions = {"IndoChina":new region()};
  }


/////Login & Permissions/////
function login(username, password){
    sendToServer("loginRequest", "loginCredentials", [username, password])
};
//////////



/////
let zoomFactor = 1;
let regionTileSize = 20*zoomFactor;
let mouseTile= 0; //what tile the mouse is on
let mouseRegion; //what region the mouse is on
let buildRegion = world.regions.IndoChina

let img;

setInterval(()=>{createRegionsDraw()},10)

let mouseX = 0
let mouseY = 0
let mouseIsPressed = false
document.addEventListener("mousedown",()=>{mouseIsPressed=true})
document.addEventListener("mouseup",()=>{mouseIsPressed=false})
onmousemove = (mouseData)=>{mouseX=mouseData.clientX;mouseY=mouseData.clientY}

///for creating regionsc
function createRegionsDraw(){
    ctx.clearRect(mouseTile[0]*regionTileSize, mouseTile[1]*regionTileSize, regionTileSize, regionTileSize)
    mouseTile = [Math.floor(mouseX/regionTileSize),Math.floor(mouseY/regionTileSize)];
    mouseRegion = world.allTiles[mouseTile[0]+","+mouseTile[1]]

    if(mouseIsPressed){
        if(mouseRegion){
            mouseRegion.builderClick
        };
    };
   
    //buildRegion.draw() 
    ctx.fillStyle = "rgba(240, 240, 240, 0.5)";
    ctx.fillRect(mouseTile[0]*regionTileSize, mouseTile[1]*regionTileSize, regionTileSize, regionTileSize);
    
    if(mouseIsPressed){
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

    ctx.fillStyle = mouseRegion.hovercolor
    mouseRegion.grids.forEach((e)=>{
        ctx.rect(e[0]*regionTileSize,e[1]*regionTileSize,regionTileSize,regionTileSize)
    });

    if(mouseIsPressed){
        if(world.regions[mouseRegion]){
            world.regions[mouseRegion].viewerClick
        };
    };
};