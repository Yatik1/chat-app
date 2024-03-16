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

const PORT = process.env.PORT

app.get('/' , (req,res) => {
    res.send('APi is running on this server ! ')
})

app.use('/api/user' , userRoutes)
app.use('/api/chat' , chatRoutes)
app.use('/api/message' ,messageRoutes)

app.use(notFound)
app.use(errorHandler)

app.listen(PORT , () => {
    console.log(`Server is on PORT ${PORT}`)
})