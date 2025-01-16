// Express.js server
const path = require('path');
const express = require('express');
const cors = require('cors');
const fs = require('fs').promises;

const PORT = process.env.PORT || 3000;

const app = express();

// Load JSON files
const henkilokunta = require('./henkilokunta.json');
const yritysEsittely = require('./yritysEsittely.json');
const yhteystiedot = require('./yhteystiedot.json');

// CORS Options
const corsOptions = {
    origin: 'https://keken-kioski.onrender.com', // Allow this origin
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allowed HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
};

// Use CORS Middleware
app.use(cors(corsOptions));

// Handle JSON responses
app.get('https://kekenkioski.onrender.com/api/henkilo', (req, res) => {
    res.json(henkilokunta);
});

app.get('https://kekenkioski.onrender.com/api/yritys', (req, res) => {
    res.json(yritysEsittely);
});

app.get('https://kekenkioski.onrender.com/api/yhteystiedot', (req, res) => {
    res.json(yhteystiedot);
});

app.get('https://kekenkioski.onrender.com/api/getpin', async (req, res) => {
    try {
        const savedPin = await fs.readFile('./pin.txt', 'utf-8');
        res.send(savedPin);
    } catch (error) {
        console.error('Error reading file: ', error);
        res.status(500).send('Internal server error');
    }
});

// Serve static files
const polku = path.join(__dirname, './public');
app.use(express.static(polku));

// Handle Pre-flight Requests (OPTIONS)
app.options('*', cors(corsOptions));

// Start Server
app.listen(PORT, () => {
    console.log('Server is up on port: ' + PORT);
});
