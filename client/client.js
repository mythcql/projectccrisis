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



/////Login & Permissions/////
function login(username, password){
    sendToServer("loginRequest", "loginCredentials", [username, password])
};
//////////



class REGION{
    constructor(){
      this.grids = []
      this.color = "red"
      this.id = "IndoChina"
      this.adjacentRegions = {}
      
      this.lastCollected = Date.now()
      
    }
    
    addSquare(mouseTile){
      this.grids.push(mouseTile)
      SJW2.allTiles[mouseTile] = this.id
    }
    
    draw(){
      ctx.fillStyle = "rgba(240, 100, 100, 1)"
      this.grids.forEach((e)=>{
        ctx.fillRect(e[0]*regionTileSize,e[1]*regionTileSize,regionTileSize,regionTileSize)})
    }
    builderClick(){
      console.log(this.id+" was clicked")
    }
  }
  
  class WORLD{
    constructor(){
    this.allTiles = {};
    this.regions = {}
    };

    createRegion(){
      let region = new REGION();
      this.regions["IndoChina"] = region;
  };
  }

  SJW2 = new WORLD()
  SJW2.createRegion()




/////
let mapViewMode = "editRegions"

let buildRegion = "IndoChina"
let zoomFactor = 1;
let regionTileSize = 20*zoomFactor;
let mouseTile = 0;
let mouseX = 0
let mouseY = 0
let mouseIsPressed = false
document.addEventListener("mousedown",()=>{mouseIsPressed=true})
document.addEventListener("mouseup",()=>{mouseIsPressed=false})

onmousemove = (mouseData)=>{mouseX=mouseData.clientX;mouseY=mouseData.clientY},()=>{regionsDraw()}
setInterval(()=>{regionsDraw()})

function regionsDraw(){
    if(mapViewMode == "editRegions"){
        resetRect(mouseTile[0]*regionTileSize, mouseTile[1]*regionTileSize, regionTileSize, regionTileSize)
        mouseTile = [Math.floor(mouseX/regionTileSize), Math.floor(mouseY/regionTileSize)];

        ctx.fillStyle = "rgba(240, 240, 240, 0.5)";
        ctx.fillRect(mouseTile[0]*regionTileSize, mouseTile[1]*regionTileSize, regionTileSize, regionTileSize);

        if(mouseIsPressed == true){
          SJW2.regions[buildRegion].addSquare(mouseTile);
          renderWorld();
      };
    }
    else if(mapViewMode == "viewRegions"){

    };
    //must add the region hovering effect
};


function resetRect(co1, co2, co3, co4){
    ctx.clearRect(co1, co2, co3, co4)
    if(SJW2.allTiles[mouseTile]){
    ctx.fillStyle = "rgba(240, 100, 100, 1)"
    ctx.fillRect(co1, co2, co3, co4)
    };
};

function addTileToRegion(){
    sendToServer("worldTileRegionSet", "variableModify", [1, "dictChange", "worldTiles", [[mouseTile[0]+","+mouseTile[1]], buildRegion]]);
    sendToServer("regionTileSet", "variableModify", [3, "arrayAdd", "regions", JSON.stringify[buildRegion], "regionTiles", [mouseTile[0]+","+mouseTile[1]]]);
};

function renderWorld(){
    SJW2.regions.IndoChina.draw()
};