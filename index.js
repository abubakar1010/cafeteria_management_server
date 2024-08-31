const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
require('dotenv').config()
const app = express();
const port = process.env.PROT || 5000;

app.use(cors())
app.use(express.json())
// app.use(cookieParser())




const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.a2ulpwj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();


    const menuCollection = client.db('cafeteria-management').collection('menu')
    const reviewsCollection = client.db('cafeteria-management').collection('reviews')
    const cartsCollection = client.db('cafeteria-management').collection('carts')

    // find all menu from menu collection

    app.get('/menu', async(req, res) => {

        const result = await menuCollection.find().toArray()
        res.send(result)
    })


    //find all reviews from reviews collection

    app.get('/reviews', async(req, res) => {

        const result = await reviewsCollection.find().toArray()
        res.send(result)
    })


    // insert cart details on cart collection

    app.post("/carts", async( req, res) => {
      const data = req.body;
      const result = await cartsCollection.insertOne(data);
      res.send(result)
    })

    // get cart data 

    app.get("/carts", async( req, res) => {
      const email = req.query.email;
      const query = {email: email}
      const result = await cartsCollection.find(query).toArray()
      res.send(result)
    })


    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);













app.get('/', async(req, res) => {
    res.send(`cafeteria management server is running on prot ${port}`)
})

app.listen(port,() => { 
    console.log(`cafeteria management server is running on prot ${port}`)
    
})