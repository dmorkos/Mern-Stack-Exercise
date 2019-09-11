const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose'); // will help us connect to our db database 

require('dotenv').config(); // so that we can have our environment cariabls in the dotenv file

/* creating our express server  */
const app = express();
const port = process.env.PORT || 5000; // port the server will be on 
app.use(cors());
app.use(express.json()); // allow us to parse JSON because our server will be reciveing and resnding JSON 

/* Connecting to mongoDB */
const uri = process.env.ATLAS_URI;  // ATLAS_URI is an environmnet variable
mongoose.connect(uri, {useNewUrlParser: true, useCreateIndex: true}
    );
 const connection = mongoose.connection;
 connection.once('open', ()=> {
     console.log("MongoDB database connection established ")
 })
const exercisesRouter = require('./routes/exercises');
const usersRouter = require('./routes/users');

app.use('./exercises', exercisesRouter);
app.use('./users', usersRouter);


// This is what starts the server, listening on a certain port
app.listen(port , () =>{
    console.log(`Server is running on port: ${port}`)
})