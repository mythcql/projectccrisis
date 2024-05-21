/////Server Setup/////
//node -e "$(cat server.js)" -i
console.log("Opening...");
const fs = require('fs');
const express = require('express');
var app = express();
server = app.listen(3333);
var socket = require('socket.io');
const{stringify} = require('querystring');
var io = socket(server);
app.use(express.static('client'));
app.use(express.json());
app.post('/responder', (req, res) => {
    console.log('Got body:', req.body);
    responder.process1(req.body,res);
});
console.log("Server has opened: "+Date.now());

io.sockets.on('connection', newConnection);
function newConnection(socket){
    socket.onAny((packetName, packetType, packet)=>{receiveFromClient(packetName, packetType, packet, socket)});
    SJW2.connectedClients[socket.id] = "noLogin";
    console.log("New Client Connected: " + socket.id);
};
//////////



/////Server-Client Communication/////
function receiveFromClient(packetName, packetType, packet, client){
    console.log("Recieved Packet Named: " + packetName + ", from Client: " + client.id + ", Permission Level: " + SJW2.connectedClients[client.id]);
    if(packetType == "loginCredentials"){
        //packet (username, passsword)
        if (SJW2.validLogins[(packet[0]+ ", " + packet[1])]){
            SJW2.connectedClients[client.id] = SJW2.validLogins[(packet[0] + ", " + packet[1])];
            console.log(client.id + " Login Success, New Permission Level: " + SJW2.connectedClients[client.id]);
        }
        else{
            console.log("invalid login");
        }
    }
    if(packetType == "variableRequest"){
        //packet (lengthOfPath, path1, path2, path(length))
        var variablePath = SJW2;
        let depth = 1;
        while (depth < ((packet[0])+1)){
            variablePath = (variablePath[packet[depth]]);
            depth++;
        };

        var variablePathPermission = SJW2[packet[1]][packet[2]]
        console.log(packet)
        var clientPermission = (SJW2.connectedClients[client.id]);

        console.log(variablePathPermission.permissions);
        console.log(clientPermission);
        console.log(variablePathPermission.permissions[clientPermission]);


        if ((variablePathPermission.permissions[SJW2.connectedClients[client.id]] == 4)){
            sendToSpecificClient(client.id, (packetName), JSON.stringify(variablePath));
        }
        else if((variablePathPermission.permissions[SJW2.connectedClients[client.id]] == 2)){
            sendToSpecificClient(client.id, (packetName), "partial permission thing that hasnt been finished");
        }
        else if((variablePathPermission.permissions[SJW2.connectedClients[client.id]] == 0)){
            sendToSpecificClient(client.id, (packetName), "access denied, permission not granted");
        }
        else{
            console.log("no permission thingie");
        };
    }

    if(packetType == "variableModify"){
        //packet (lengthOfPath, modificationType, path1, path2, path(length), (mods))
        var variablePath = SJW2;
        let depth = 2;
        while (depth < ((packet[0])+2)){
            variablePath = (variablePath[packet[depth]]);
            depth++;
        };

        if(packet[1] == "varChange"){
            //modifications (newValue)
            [variablePath] = packet[(packet[0])+1];
        }
        if(packet[1] == "arrayAdd"){
            //modifications (newValue)
            [variablePath] =+ packet[(packet[0])+1];
        }
        if(packet[1] == "dictChange"){
            //modifications (newValue, dictKey)
            variablePath[(packet[(packet[0])+2])[1]] = (packet[(packet[0])+2])[0];
        }
        else{
        };
    }
    else{
    };
};

function sendToSpecificClient(clientID, packetName, packet){
    io.to(clientID).emit(packetName, packet);
};
//////////



/////Basic Class Creators/////
class WORLD{
    //modify permission level: admin
    //view permission level: overlord, all directors, all chairs, all spectators
    constructor(saveFile, loginInfo){
        this.saveFile = saveFile;
        this.worldID = 0o0;
        this.nations = {};
        this.regions = {};
        this.idToName = {};
        this.worldTiles = {};
        this.validLogins = loginInfo;
        this.connectedClients = {};
    };
    createNation(nationID, color){
        let nation = new NATION(nationID, color);
        this.nations[nationID] = nation;
    };
    createRegion(regionID, controlScores, resourceType, isCity){
        let region = new REGION(regionID, controlScores, resourceType, isCity);
        this.regions[regionID] = region;
    };
};

class REGION{
    //full modify permission level: admin, overlord
    //full view permission level: all directors, all chairs, all spectators
    constructor(regionID, controlScores, intelScores, resourceType, isCity){
        this.regionID = regionID; //stores unique region id
        this.controlScores = controlScores; //stores info on the control state of the region (controlled, contested, in battle, etc)
        this.intelScores = intelScores; //stores the level of viewing permissions for each nation (dependent of diplomatic relationship, region control, region proximity, etc)
        this.resourceType = resourceType; //stores the resource present in region
        this.isCity = isCity; //stores whether or not the region has a city
        this.regionTiles = [];
        this.occupingUnits = [];
        this.adjacentRegions = [];
        this.permissions = {};
    };
};


class NATION{
    //full modify permission level: admin, overlord, nation director
    //full view permission level: admin, overlord, all directors, nation chair, nation spectator
    //conditional view permission level: all chairs, all spectators
    constructor(nationID, color){
        this.nationID = nationID; //stores unique nation id
        this.colorCtrl5 = color; //stores default color
        this.colorCtrl4 = pSBC(0.3, this.colorCtrl5); 
        this.colorCtrl6 = pSBC(-0.3, this.colorCtrl5);
        this.units = {};
        this.permissions = {["admin"]:4, ["overlord"]:4, ["director" + ", " + nationID]:4, ["director"]:3, ["chair" + ", " + nationID]:3, ["spectator" + ", " + nationID]:3, ["chair"]:1, ["spectator"]:1, ["noLogin"]:0};
    };

    createUnit(type, level, location){
        let unit = new UNIT(this.nationID, type, level, location);
        this.units[unitID] = unit;
    };
};

class UNIT{
    //full modify permission level: admin, overlord, nation director
    //full view permission level: all directors, nation chair, nation spectator
    //conditional view permission level: all chairs, all spectators
    constructor(unitID, owner, type, level, location){
        this.unitID = unitID; //stores unique unit id
        this.owner = owner; //stores the nation id of owner
        this.type = type; //stores the type of unit
        this.level = level; //stores the level of unit
        this.location = location; //stores the region id of location
        this.permissions = [owner].permissions
        [location].occupingUnits = this.unitID;
    };
};
//////////



/////Color Modifier/////
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
//////////



/////Temp Save///// 
let SJW2 = new WORLD("HJCC2ndSinoJapWarV1.json", {
    "admin, adminPassTemp":"admin",
    "overlord, overlordPassTemp":"overlord",
    "chineseDirector, chinaDirPassTemp":("director", "China"), 
    "japaneseDirector, japanDirPassTemp":("director", "Japan"), 
    "chineseChair, chinaChaPassTemp":("chair", "China"), 
    "japaneseChair, japanChaPassTemp":("chair", "Japan"), 
    "chinaSpectator, chinaSpecPassTemp":("spectator", "China"), 
    "japanSpectator, japanSpecPassTemp":("spectator", "Japan")
    }
);

SJW2.createNation("China", "#2c358a");
SJW2.createNation("Japan", "#cf1717");
SJW2.createRegion("JapanIsl", {"China":1, "Japan":5}, {"China":1, "Japan":4}, "factory", true);
SJW2.createRegion("KoreaPen", {"China":1, "Japan":5}, {"China":1, "Japan":4}, "farm", true);
SJW2.createRegion("Manchuria", {"China":1, "Japan":5}, {"China":2, "Japan":4}, "farm", false);
SJW2.createRegion("NorthChina", {"China":2, "Japan":4}, {"China":2, "Japan":4}, "factory", false);
SJW2.createRegion("WestChina", {"China":3, "Japan":3}, {"China":3, "Japan":3}, "factory", true);
SJW2.createRegion("SouthChina", {"China":4, "Japan":2}, {"China":4, "Japan":2}, "farm", true);
SJW2.createRegion("EastChina", {"China":5, "Japan":1}, {"China":4, "Japan":1},"factory", false);
SJW2.createRegion("IndoChina", {"China":3, "Japan":3}, {"China":3, "Japan":3}, "farm", false);
///////////