const express = require('express');
const router = express.Router();
const CardModel = require('../cardModel');
const User = require('../userModel');
const cookieParser = require('cookie-parser');
const session = require('express-session');



router.post('/createCard', async (req, res) => {
    console.log('cookies', req.cookies);
    try {
        const _id = Number(req.cookies.userId);
        const species = req.body.species;
        const date = req.body.date;
        const location = req.body.location;
        const birdWas = req.body.birdWas;
        const difficulty = req.body.difficulty;
  
      const newCard = new CardModel({
        species,
        date,
        location,
        birdWas,
        difficulty,
        _id
      });
  
      await newCard.save();
  
      console.log('Card saved to the database');
      res.sendStatus(200); // Send success status
    } catch (error) {
      console.error('Error saving card:', error);
      res.sendStatus(500); // Send error status
    }
  });

  module.exports = router;