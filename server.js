const express = require('express');
const app = express();
const mongoose = require("mongoose");

app.use(express.json());

//connect to mongoose

//require route 

app.listen(3001, function() {
    console.log('express serving running on 3001')
})