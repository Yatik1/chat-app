const express = require('express')
const dotenv = require('dotenv')
const connectDB = require('./db/db')
const userRoutes = require('./routes/userRoutes')
const chatRoutes = require('./routes/chatRoutes')
const messageRoutes = require("./routes/messageRoutes")

const { notFound, errorHandler } = require('./middleware/errorMiddleware')


const app = express()
app.use(express.json())

dotenv.config()

connectDB()

const PORT = process.env.PORT || 5000

app.get('/' , (req,res) => {
    res.send('APi is running on this server ! ')
})

app.use('/user' , userRoutes)
app.use('/chat' , chatRoutes)
app.use('/message' ,messageRoutes)

app.use(notFound)
app.use(errorHandler)

const server = app.listen(PORT , () => {
    console.log(`Server is on PORT ${PORT}`)
})

const io = require('socket.io')(server , {
    pingTimeout:60000,
    cors: {
        origin : "https://chazily.vercel.app/"
    },
})

io.on("connection" , (socket) => {
    console.log("connected to socket.io");

    socket.on("setup" , (userData) => {
        socket.join(userData._id)
        socket.emit("connected")
    })

    socket.on("join chat" , (room) => {
        socket.join(room)
        console.log("User Joined Room " + room);
    })

    socket.on("typing" , (room) => socket.in(room).emit("typing"))
    socket.on("stop typing" , (room) => socket.in(room).emit("stop typing"))

    socket.on("new message" , (newMessageRecieved) => {
        var chat = newMessageRecieved.chat

        if(!chat.users) return console.log("chat.users not defined");
        chat.users.forEach((user) => {
            if(user._id == newMessageRecieved.sender._id) return;

            socket.in(user._id).emit("message recieved" , newMessageRecieved)
        })
    })

    socket.off("setup", () => {
        console.log("USER DISCONNECTED");
        socket.leave(userData._id);
      })

})