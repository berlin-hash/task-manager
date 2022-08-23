const express = require('express');
// const res = require('express/lib/response');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const app = express();
app.use(express.json());
const port = 8080;
dotenv.config({path: './config.env'})

//import schema
const Todo = require('./model/todoSchema')

app.use(cors());

app.use(express.json())
app.use(require('./routes/route'))

const middleware = (req, res, next) => {
    console.log("my middleware");
    next(); //if my condition is valid proceed to next
}



app.get('/about',middleware, (req, res)=>{
    res.send('Hello from About page');
})


const DB = process.env.DATABASE;
const PORT = process.env.PORT;

//Database connection
mongoose.connect(DB).then(() => {
    console.log("connection successful");
}).catch((err) => console.log("connection error"))

app.listen(PORT, (req, res)=>{
    console.log(`Server listening on ${PORT}`);
})