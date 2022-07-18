const socket =(app)=>{
    const server = http.createServer(app);
    const io = new Server(server,{
        cors:{
            origin: env.SOCKET_URL,
            methods:["GET", "POST"],
        },
    })
    
    io.on("connection", (socket) => { //Whenever someone is trying to connect in the chat...
        console.log(`User connected: ${socket.id}`) //When someone is connected it will be show in the console
    
        socket.on("join_room", (data) => { //data is the info that is passed from the client .... ex: RoomID    &&  join_room is the name of the event
            socket.join(data)  //Join is a socket method to create the room
            console.log(`User with ID: ${socket.id} joined room: ${data}`)
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
}

module.exports={
    socket
}