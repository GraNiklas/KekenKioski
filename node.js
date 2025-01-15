// Express.js palvelin
const path = require('path')
const express = require('express')
const cors = require('cors');

const corsOptions = {
    origin: 'https://keken-kioski.onrender.com', // Allow requests from this origin
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'], // Allow these headers
  };
  const PORT = process.env.PORT || 3000;
  const fs = require('fs').promises
  
  const app = express();
  
  const henkilokunta = require('./henkilokunta.json')
  const yritysEsittely = require('./yritysEsittely.json')
  const yhteystiedot = require('./yhteystiedot.json')
  
app.use(cors(corsOptions));

app.get('/api/henkilo',(req, res) => {
    res.json(henkilokunta);
    })

app.get('/api/yritys',(req, res) => {
    res.json(yritysEsittely);
    })

app.get('/api/yhteystiedot',(req, res) => {
    res.json(yhteystiedot);
    })

app.get('/api/getpin',async (req, res) => {
    try {
        const savedPin = await fs.readFile('./pin.txt','utf-8')    
        res.send(savedPin)
    } 
    catch (error) {
        console.error('Error reading file: ', error)
        res.status(500).send('internal server error')
        }
    })

const polku = path.join(__dirname, './public')

app.use(express.static(polku))

app.listen(PORT,()=>{
    console.log('Server is up on port: ' + PORT);
})