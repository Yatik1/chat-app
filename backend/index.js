const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const connectDB = require('./db/db')
const userRoutes = require('./routes/userRoutes')
const { notFound, errorHandler } = require('./middleware/errorMiddleware')


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

app.use(notFound)
app.use(errorHandler)

app.listen(PORT , () => {
    console.log(`Server is on PORT ${PORT}`)
})