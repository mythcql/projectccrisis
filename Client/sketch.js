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

//document.addEventListener

const socket = io.connect('/')
let info = "yum"
socket.emit("JOINGAME", info)
