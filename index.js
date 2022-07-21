const express = require('express');
const cors = require('cors');
const apiRouter = require('./routes/api');
const env = require('./utils/home');
const bodyParser = require('body-parser');
const ip = require('ip');
const http = require('http');
const {Server} = require('socket.io');

const app = express();

app.use(bodyParser.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }))
app.use(bodyParser.urlencoded({limit: '50mb'}));
app.use(bodyParser({limit: '50mb'}));

app.use(cors());
app.use(express.json());
app.use(env.ROOT_API, apiRouter);
const server = http.createServer(app);

const io = new Server(server,{
    cors:{
        origin: env.SOCKET_URL,
        methods:["GET", "POST"],
    },
})

var users =[];
var userId="";
io.on("connection", (socket) => { 

    console.log(`User connected: ${socket.id}`) 

    socket.on("user", ({id}) => {  
        userId = id;
       
        users.indexOf(id) === -1 ?  users.push(id): console.log("usuario existe");
            socket.emit("active-users", users)
            console.log(users)
    })

    socket.on("join_room", (room) => {
        socket.join(room)  
        socket.emit("active-room", room)
        console.log(`User with ID: ${socket.id} joined room: ${room}`)
    })

    socket.on("send_message", (data) => { 
        socket.to(data.room).emit("receive_message", data) 
    })

    socket.on("typing", ({username, room}) => {
        socket.to(room).emit("user-isTyping", {username, room})
    })

    socket.on("notTyping", ({username, room}) => {
        socket.to(room).emit("user-isNotTyping", {username, room})
    })

    socket.on("disconnect", () => {  
        console.log("User disconnected", socket.id)
        let index = users.findIndex(function(el){
            return el.id == userId; // or el.nombre=='T NORTE';
        });
        console.log(index);
    })

    // ver los usuarios conectados
    // io.on('connection', (socket) => {
    //     var total=io.engine.clientsCount;
    //     socket.emit('getCount',total)
    //     console.log(total)
    //  });
}) 


server.listen(env.PORT, () => {
    console.log(`Server running on port ${env.PORT}`)
});

