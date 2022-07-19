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

io.on("connection", (socket) => { //Whenever someone is trying to connect in the chat...
    console.log(`User connected: ${socket.id}`) //When someone is connected it will be show in the console

    socket.on("join_room", (room) => { //data is the info that is passed from the client .... ex: RoomID    &&  join_room is the name of the event
        socket.join(room)  //Join is a socket method to create the room
        // console.log(`User with ID: ${socket.id} joined room: ${data}`)
        socket.emit("active-room", room) //
    })

    socket.on("send_message", (data) => {  //Event to send the message
        socket.to(data.room).emit("receive_message", data) // The user only receive the message if they are in the same room
    })

    socket.on("typing", ({username, room}) => {
        socket.to(room).emit("user-isTyping", {username, room})
        // console.log("The user is typing this: " + data)
    })

    socket.on("notTyping", ({username, room}) => {
        socket.to(room).emit("user-isNotTyping", {username, room})
        // console.log("The user is typing this: " + data)
    })

    socket.on("disconnect", () => {  //Whenever someone is trying to disconnect from the chat...
        console.log("User disconnected", socket.id)//When someone is disconnected it will be show in the console
    })
}) 


server.listen(env.PORT, () => {
    console.log(`Server running on port ${env.PORT}`)
});

