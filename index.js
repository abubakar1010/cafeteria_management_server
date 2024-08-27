const express = require('express');
const cors = require('cors');
// const jwt = require('jsonwebtoken');
// const cookieParser = require('cookie-parser');
require('dotenv').config()
const app = express();
const port = process.env.PROT || 5000;

app.use(cors())
app.use(express.json())
// app.use(cookieParser())


app.get('/', async(req, res) => {
    res.send(`cafeteria management server is running on prot ${port}`)
})

app.listen(port,() => { 
    console.log(`cafeteria management server is running on prot ${port}`)
    
})