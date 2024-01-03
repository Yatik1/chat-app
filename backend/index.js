const express = require('express')

const app = express()

app.get('/' , (req,res) => {
    res.send('APi is running on this server ! ')
})

app.listen(5000 , () => {
    console.log('server is on !')
})