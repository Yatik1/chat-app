const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
// const {chats} = require('./data/data')
const connectDB = require('./db/db')
const userRoutes = require('./routes/userRoutes')


const app = express()
app.use(express.json())

app.use(cors())
dotenv.config()

connectDB()

const PORT = process.env.PORT

app.get('/' , (req,res) => {
    res.send('APi is running on this server ! ')
})

app.use('/api/user' , userRoutes)

app.listen(PORT , () => {
    console.log(`Server is on PORT ${PORT}`)
})