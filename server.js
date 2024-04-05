console.log("opening")
const fs = require('fs');
const express = require('express');
var app = express();
server = app.listen(3000);
var socket = require('socket.io');
var io = socket(server);
app.use(express.static('public'));
app.use(express.json());
app.post('/responder', (req, res) => {
    console.log('Got body:', req.body);
    responder.process1(req.body,res);
});
console.log("Server has opened: "+Date.now());

io.sockets.on('connection', newConnection);

function newConnection(socket){
	socket.on("JOINGAME",(e)=>{joinGame(e,socket)}); //runs the join game function
    //socket.on is recieving info from client
    //io.to(socket.id).emit is sending info to a client
};

function joinGame(e, socket){
    console.log(e, socket.id);
    console.log(e, socket)
};