const mongoose = require('mongoose');


require('dotenv').config();

// dotenv library help us to read the .env file 
// config method parses its contents into key-value pairs, which are then added to process.env.

const mongouri = process.env.MONGODB

// here process.env already has connection string where MONGODB  is the key and value has the connection string


const initializeDatabase = async () =>{
    await mongoose.connect(mongouri).then(()=>{
        console.log("Connected to database");
        
    })
    .catch((error)=>{
        console.log("An error has occurred while connecting to the database",error);
        
    })
}

module.exports = {initializeDatabase};