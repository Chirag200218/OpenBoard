let canvas  =  document.querySelector("canvas");
canvas.width = window.innerWidth;
canvas.height= window.innerHeight;

//for changing color of pencil
let pencilColor = document.querySelectorAll(".pencil-color"); //All available color
let pencilWidthElem = document.querySelector(".pencil-width");
let eraserWidthElem = document.querySelector(".eraser-width");
let penColor=  "red";
let eraserColor = "white";
let penWidth = pencilWidthElem.value;
let eraserWidth = eraserWidthElem.value;

//Download
let download = document.querySelector(".Download");

//UndoRedo 
let undo = document.querySelector(".undo");
let redo = document.querySelector(".redo");
let UndoRedoTracker =[]; //represnt Data 
let track = 0; //Represent which action 

let mouseDown = false; 
//API
let tool=  canvas.getContext("2d");

tool.strokeStyle = penColor; //By default  
tool.lineWidth = penWidth;
 
//mouse down ->start new path
//mousemove - path fill 

canvas.addEventListener("mousedown",(e)=>{
    mouseDown = true;
    // tool.beginPath();
    // tool.moveTo(e.clientX,e.clientY);
    
    let data = {
        x: e.clientX,
        y: e.clientY
    }
    socket.emit("beginPath",data);
})

canvas.addEventListener("mousemove",(e)=>{
  
    if(mouseDown==true){
        let data ={
            x: e.clientX,
            y: e.clientY,
            color: eraserFlag?eraserColor:penColor,
            width:eraserFlag?eraserWidth:penWidth
        }
        socket.emit("drawStroke",data);

    }
})
canvas.addEventListener("mouseup",(e)=>{
    mouseDown = false;

    let url = canvas.toDataURL();
    UndoRedoTracker.push(url);
    track = UndoRedoTracker.length-1; 
})

function  beginPath(strokeObj){
    tool.beginPath();
    tool.moveTo(strokeObj.x,strokeObj.y);
}

function drawStroke(strokeObj){
    tool.strokeStyle = strokeObj.color;
    tool.lineWidth= strokeObj.width;
    tool.lineTo(strokeObj.x,strokeObj.y);
    tool.stroke();
}


// 
pencilColor.forEach((color)=>{
    color.addEventListener("click",(e)=>{
        console.log("ihh0");
        let col = color.classList[0];
        penColor = col;
        tool.strokeStyle = penColor;
    })
})
pencilWidthElem.addEventListener("change",(e)=>{
    penWidth = pencilWidthElem.value;
    console.log(penWidth);
    tool.lineWidth = penWidth;
})

eraserWidthElem.addEventListener("change",(e)=>{
    eraserWidth = eraserWidthElem.value;
    tool.lineWidth = eraserWidth;
})
eraser.addEventListener("click",(e)=>{
    if(eraserFlag){
        tool.strokeStyle = "white";
        tool.lineWidth= eraserWidth;
    }else{
        tool.strokeStyle = penColor;
        tool.lineWidth= penWidth;
    }
    
})


download.addEventListener("click",(e)=>{
    let url = canvas.toDataURL();
    let a = document.createElement("a");
    a.href= url;
    a.download ="board.jpg";
    a.click();
})

undo.addEventListener("click",(e)=>{
    if(track>0){
        track--;
    }
    //action perform
    let obj ={
        trackValue: track,
        UndoRedoTracker
    }
    // undoRedo(obj);
    socket.emit("UndoRedo",obj);
})

redo.addEventListener("click",(e)=>{
    if(track<UndoRedoTracker.length-1){
        track++;
    }
    let obj ={
        trackValue: track,
        UndoRedoTracker
    }
    socket.emit("UndoRedo",obj);
})
function undoRedo(trackObj){
    track = trackObj.trackValue;
    UndoRedoTracker = trackObj.UndoRedoTracker;
    
    let url = UndoRedoTracker[track];

    let img =new Image();
    img.src = url;
    img.onload=(e)=>{
        tool.drawImage(img,0,0,canvas.width,canvas.height);
    }
}

socket.on("beginPath",(data)=>{
    //data -> data from server
    //Now transfer to all connected computer
    beginPath(data);
})
socket.on("drawStroke",(data)=>{
    //data -> data from server
    //Now transfer to all connected computer
    drawStroke(data);
})
socket.on("UndoRedo",(data)=>{
    // Transfer data to all connected computer
    undoRedo(data);
})