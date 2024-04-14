console.log("opening")
const fs = require('fs');
const express = require('express');
var app = express();
server = app.listen(3333);
var socket = require('socket.io');
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
	socket.on("JOINGAME",(e)=>{joinGame(e,socket)}); //runs the join game function
    //io.socket.on is recieving info from client
    //io.to(socket.id).emit is sending info to a client
    socket.on("GETINFO", (variable)=>{getInfo(variable,socket)})
};

function joinGame(e, socket){
    console.log(e, socket.id);
};

//////////////////
//put the savefile loader thing here
///////////////////////////////////////////////////
class WORLD{
    constructor(saveFile){
        this.saveFile = saveFile;
        this.worldID = 0o0;
        this.nations = {};
        this.regions = {};
        this.idToName = {};
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
    constructor(regionID, controlScores, resourceType, isCity){
        this.regionID = regionID; //8 bit binary number, stores unique region id
        this.controlScores = controlScores; //Dict of 3 bit binary numbers for each nation, stores info on the control state of the region (controlled, contested, in battle, etc)
        this.resourceType = resourceType; //2 bit binary number, stores the resource present in region
        this.isCity = isCity; //2 bit binary number, stores whether or not the region has a city
    };
    
    invade(controlScoreChange){
        this.controlScores = controlScoreChange; //5 bit binary number, updates the control score after an event
    };
};

class NATION{
    constructor(nationID, color){
        this.nationID = nationID; //4 bit binary number, stores unique nation id
        this.color = color; //4 bit binary number, stores unique color id
        this.units = {};
    };

    createUnit( type, level, location){
        let unit = new UNITS(this.nationID, type, level, location);
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
SJW2.createNation("China", "yellow");
SJW2.createNation("Japan", "red");
SJW2.createRegion("JapanIsl", {"China":1, "Japan":5}, "factory", true)
SJW2.createRegion("KoreaPen", {"China":1, "Japan":5}, "farm", true)
SJW2.createRegion("Manchuria", {"China":1, "Japan":5}, "farm", false)
SJW2.createRegion("NorthChina", {"China":2, "Japan":4}, "factory", false)
SJW2.createRegion("WestChina", {"China":3, "Japan":3}, "factory", true)
SJW2.createRegion("SouthChina", {"China":4, "Japan":2}, "farm", true)
SJW2.createRegion("EastChina", {"China":5, "Japan":1}, "factory", false)
SJW2.createRegion("IndoChina", {"China":3, "Japan":3}, "farm", false)