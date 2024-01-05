const mongoose = require('mongoose')

const connectDB = async () => {
    try {
        const database = await mongoose.connect(process.env.MONGO_URI);

        console.log(`Database connected : ${database.connection.host}`)

    } catch (error) {
        console.log('Error' , error)
        process.exit()
    }
}

module.exports = connectDB;