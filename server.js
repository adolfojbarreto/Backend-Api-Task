const express = require('express');
const mongoose = require('mongoose');
//const bodyParser = require('body-parser');
const path = require('path');
const config = require('config')

const actors = require('./routes/api/actors');
const movies = require('./routes/api/movies');
const users = require('./routes/api/users');


const app = express();

//Body parser
app.use(express.json());


// DB Config
const db = require('./config/keys').mongoURI

//Connect to Mongo
mongoose
	.connect(db,{
		useNewUrlParser: true,
		useCreateIndex: true
	})
	.then(() => console.log('Mongo DB Connected'))
	.catch(err => console.log(err));



//Use Routes
app.use('/host/api/actors',actors);
app.use('/host/api/movies',movies);
app.use('/host/api/user',users);




const port = process.env.PORT || 5000
app.listen(port,() => console.log(`Server Started on Port ${port}`))
