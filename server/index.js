const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const moment = require('moment');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = 3001;
const MONGODB_URI = process.env.MONGODB_URI;

// Middleware
app.use(bodyParser.json());
app.use(cors({
  origin: ["https://jade-pasca-057156.netlify.app/"],
  methods: ["POST", "GET"],
  credentials: true
}));

// Connect to MongoDB
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => console.log('Connected to MongoDB'));

const gameSchema = new mongoose.Schema({
  player1Name: String,
  player2Name: String,
  player1Wins: Number,
  player2Wins: Number,
  matchDate: { type: Date, default: Date.now }
});

const Game = mongoose.model('Game', gameSchema);

app.get('/', (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  console.log('ENDPOINT: /')
  res.json("Connected")
})

app.get('/games', async (req, res) => {
  try {
    res.setHeader("Access-Control-Allow-Origin", "*");
    const games = await Game.find().sort({ matchDate: -1 });
    res.json(games);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

app.post('/games', async (req, res) => {
  try {
    res.setHeader("Access-Control-Allow-Origin", "*");
    const { player1Name, player2Name, player1Wins, player2Wins } = req.body;
    const newGame = new Game({
      player1Name,
      player2Name,
      player1Wins,
      player2Wins,
    });

    await newGame.save();

    res.status(201).json({ 
        message: 'Game data saved successfully',
        data: newGame
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
