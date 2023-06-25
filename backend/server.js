const express = require('express');
const app = express();
const mongoose = require("mongoose"); 
const cors = require('cors');
const signUpRouter = require('./models/routes/signUpRoute');

const allowedOrigins = ['http://localhost:8080', 'http://localhost:3000'];

app.use(cors({
    origin: allowedOrigins,
    credentials: true,
    methods: ['GET', 'POST'], // Add the allowed HTTP methods
    allowedHeaders: ['Content-Type'], // Add the allowed headers
  }));

app.use(express.json());
// app.use('/', require('./routes/loginRoute'));

app.use(signUpRouter);

app.get('/home', (req, res) => {
    res.send('home page ');
})

app.get('/test', (req, res) => {
    res.send('hello');
});

//connect to mongoose
mongoose.connect('mongodb+srv://juliabreeden1018:m0ng0dbtim3@cluster0.7k6qhck.mongodb.net/')
//require route 
app.listen(3000, function() {
    console.log('express serving running on 3000')
})