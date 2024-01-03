const express = require('express')
const dotenv = require('dotenv')
const {chats} = require('./data/data')

const app = express()
dotenv.config()

const PORT = process.env.PORT

app.get('/' , (req,res) => {
    res.send('APi is running on this server ! ')
})

app.get('/api/chat' , (req,res) => {
    res.send(chats)
})
 
app.get('/api/chat/:id' , (req,res) => {
    // console.log(req.params.id)
    const chatById = chats.find(c => c._id === req.params.id);
    res.send(chatById)
})

app.listen(PORT , () => {
    console.log(`Server is on PORT ${PORT}`)
})