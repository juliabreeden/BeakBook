const express = require('express');
const router = express.Router();
const CardModel = require('../cardModel');
const cookieParser = require('cookie-parser');

router.post('/createCard', (req, res) => {
    const userId = req.cookies.userId;
    const species = req.body.species;
    const date = req.body.date;
    const location = req.body.location;
    const birdWas = req.body.birdWas;
    const difficulty = req.body.difficulty;

    const newCard = new CardModel({
        userId,
        species,
        date,
        location,
        birdWas,
        difficulty
    });
    newCard.save()
    .then(() => {
        console.log('Card saved to the database');
        res.sendStatus(200); // Send success status
    })
    .catch(error => {
        console.error('Error saving card:', error);
        res.sendStatus(500); // Send error status
    });

});

module.exports = router;