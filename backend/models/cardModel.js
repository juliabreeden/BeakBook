const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  species: String,
  date: String,
  birdWas: String,
  difficulty: String,
  userId: Number,
});

const CardModel = mongoose.model('Card', cardSchema);

module.exports = CardModel;