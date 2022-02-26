const express = require("express");
const socket = require("socket.io");
 

const app = express(); //My application will be intialize and server ready
app.use(express.static("frontend"));
let port = process.env.PORT || 5000;
let server = app.listen(port,()=>{
    console.log("Listening to port "+port);    
});

let io = socket(server);
io.on("connection",(socket)=>{
    console.log("made socket connection");

    //Received data
    socket.on("beginPath",(data)=>{
        // Transfer data to all connected computer
        io.sockets.emit("beginPath",data);
    });
    socket.on("drawStroke",(data)=>{
        // Transfer data to all connected computer
        io.sockets.emit("drawStroke",data);
    });

    socket.on("UndoRedo",(data)=>{
        // Transfer data to all connected computer
        io.sockets.emit("UndoRedo",data);
    });


})
