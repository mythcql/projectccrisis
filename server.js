console.log("Opening...");
const fs = require('fs');
const express = require('express');
var app = express();
server = app.listen(3333);
var socket = require('socket.io');
const { stringify } = require('querystring');
var io = socket(server);
app.use(express.static('client'));
app.use(express.json());
app.post('/responder', (req, res) => {
    console.log('Got body:', req.body);
    responder.process1(req.body,res);
});
console.log("Server has opened: "+Date.now());

io.sockets.on('connection', newConnection);
// io.sockets.on("GETINFO", (variable)=>{console.log("gay")})
// io.sockets.on("GETINFO", (variable)=>{getInfo(variable,socket)})

function newConnection(socket){
	//socket.on("JOINGAME",(e)=>{joinGame(e,socket)}); //runs the join game function
    //io.socket.on is recieving info from client
    //io.to(socket.id).emit is sending info to a client
    socket.onAny((packetName, packetType, packet)=>{receiveFromClient(packetName, packetType, packet, socket)})
};

//function joinGame(e, socket){}

//////////////////
//put the savefile loader thing here
///////////////////////////////////////////////////

////////////color lightener/darkener/////////////////////
const pSBC=(p,c0,c1,l)=>{
    let r,g,b,P,f,t,h,i=parseInt,m=Math.round,a=typeof(c1)=="string";
    if(typeof(p)!="number"||p<-1||p>1||typeof(c0)!="string"||(c0[0]!='r'&&c0[0]!='#')||(c1&&!a))return null;
    if(!this.pSBCr)this.pSBCr=(d)=>{
        let n=d.length,x={};
        if(n>9){
            [r,g,b,a]=d=d.split(","),n=d.length;
            if(n<3||n>4)return null;
            x.r=i(r[3]=="a"?r.slice(5):r.slice(4)),x.g=i(g),x.b=i(b),x.a=a?parseFloat(a):-1
        }else{
            if(n==8||n==6||n<4)return null;
            if(n<6)d="#"+d[1]+d[1]+d[2]+d[2]+d[3]+d[3]+(n>4?d[4]+d[4]:"");
            d=i(d.slice(1),16);
            if(n==9||n==5)x.r=d>>24&255,x.g=d>>16&255,x.b=d>>8&255,x.a=m((d&255)/0.255)/1000;
            else x.r=d>>16,x.g=d>>8&255,x.b=d&255,x.a=-1
        }return x};
    h=c0.length>9,h=a?c1.length>9?true:c1=="c"?!h:false:h,f=this.pSBCr(c0),P=p<0,t=c1&&c1!="c"?this.pSBCr(c1):P?{r:0,g:0,b:0,a:-1}:{r:255,g:255,b:255,a:-1},p=P?p*-1:p,P=1-p;
    if(!f||!t)return null;
    if(l)r=m(P*f.r+p*t.r),g=m(P*f.g+p*t.g),b=m(P*f.b+p*t.b);
    else r=m((P*f.r**2+p*t.r**2)**0.5),g=m((P*f.g**2+p*t.g**2)**0.5),b=m((P*f.b**2+p*t.b**2)**0.5);
    a=f.a,t=t.a,f=a>=0||t>=0,a=f?a<0?t:t<0?a:a*P+t*p:0;
    if(h)return"rgb"+(f?"a(":"(")+r+","+g+","+b+(f?","+m(a*1000)/1000:"")+")";
    else return"#"+(4294967296+r*16777216+g*65536+b*256+(f?m(a*255):0)).toString(16).slice(1,f?undefined:-2)
}
///////////////////////////////////////

class WORLD{
    constructor(saveFile){
        this.saveFile = saveFile;
        this.worldID = 0o0;
        this.nations = {};
        this.regions = {};
        this.idToName = {};
        this.worldTiles = {}
    };
    createNation(nationID, color){
        let nation = new NATION(nationID, color);
        this.nations[nationID] = nation;
    };
    createRegion(regionID, controlScores, resourceType, isCity){
        let region = new REGION(regionID, controlScores, resourceType, isCity);
        this.regions[regionID] = region;
    };
}

class REGION{
    constructor(regionID, controlScores, intelScores, resourceType, isCity){
        this.regionID = regionID; //stores unique region id
        this.controlScores = controlScores; //stores info on the control state of the region (controlled, contested, in battle, etc)
        this.intelScores = intelScores; //stores the level of viewing permissions for each nation (dependent of diplomatic relationship, region control, region proximity, etc)
        this.resourceType = resourceType; //stores the resource present in region
        this.isCity = isCity; //stores whether or not the region has a city
        this.regionTiles = [];
    };

    addTileToRegion(x,y){

    };
};


class NATION{
    constructor(nationID, color){
        this.nationID = nationID; //stores unique nation id
        this.colorCtrl5 = color; //stores default color
        this.colorCtrl4 = pSBC(0.3, this.colorCtrl5); 
        this.colorCtrl6 = pSBC(-0.3, this.colorCtrl5);
        this.units = {};
    };

    createUnit( type, level, location){
        let unit = new UNIT(this.nationID, type, level, location);
        this.units[unitID] = unit;
    };
};

class UNIT{
    constructor(unitID, owner, type, level, location){
        this.unitID = unitID; //10 bit binary number, stores unique unit id
        this.owner = owner; //4 bit binary number, stores the nation id of owner
        this.type = type; //2 bit binary number, stores the type of unit
        this.level = level; //5 bit binary number, stores the level of unit
        this.location = location; //8 bit binary number, stores the region id of location
    };
};

////
let SJW2 = new WORLD("HJCC2ndSinoJapWarV1.json");
SJW2.createNation("China", "#2c358a");
SJW2.createNation("Japan", "#cf1717");
SJW2.createRegion("JapanIsl", {"China":1, "Japan":5}, {"China":1, "Japan":4}, "factory", true)
SJW2.createRegion("KoreaPen", {"China":1, "Japan":5}, {"China":1, "Japan":4}, "farm", true)
SJW2.createRegion("Manchuria", {"China":1, "Japan":5}, {"China":2, "Japan":4}, "farm", false)
SJW2.createRegion("NorthChina", {"China":2, "Japan":4}, {"China":2, "Japan":4}, "factory", false)
SJW2.createRegion("WestChina", {"China":3, "Japan":3}, {"China":3, "Japan":3}, "factory", true)
SJW2.createRegion("SouthChina", {"China":4, "Japan":2}, {"China":4, "Japan":2}, "farm", true)
SJW2.createRegion("EastChina", {"China":5, "Japan":1}, {"China":4, "Japan":1},"factory", false)
SJW2.createRegion("IndoChina", {"China":3, "Japan":3}, {"China":3, "Japan":3}, "farm", false)



//////client info request thing
function receiveFromClient(packetName, packetType, packet, client){
    console.log("Recieved Packet Named: " + packetName + ", from Client: " + client.id);
    if(packetType == "loginCredentials"){

    }
    if(packetType == "variableRequest"){
        ///packet (lengthOfPath, path1, path2, path(length))
        var returnPacket = SJW2
        let depth = 0
        while (depth < (packet[0]+1)){
            returnPacket = (returnPacket[packet[depth]]);
            depth++;
        };

        sendToSpecificClient(client.id, (packetName), JSON.stringify(returnPacket));
        return;
    }
    if(packetType == "variableModify"){
        //packet (lengthOfPath, modificationType, path1, path2, path(length), (mods))
        var variablePath = SJW2
        let depth = 0
        while (depth < (packet[0]+2)){
            variablePath = (returnPacket[packet[depth]]);
            depth++;
        };

        decodedMods = decodeMods(packet[1], packet[packet[0]+1]);

        if(packet[1] == "varChange"){
            variablePath = decodedMods;
            return;
        }
        if(packet[1] == "arrayAdd"){
            variablePath =+ decodedMods;
            return;
        }
        if(packet[1] == "dictChange"){
            variablePath[decodedMods[0]] = decodedMods[1];
            return;
        }
        else{
            return;
        };
    }
    else{
        return
    };
};

  function sendToSpecificClient(clientID, packetName, packet){
    io.to(clientID).emit(packetName, packet)
  };