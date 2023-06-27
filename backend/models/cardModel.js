const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  species: String,
  date: String,
  location: String,
  birdWas: String,
  difficulty: String,
  _id: Number,
});

const CardModel = mongoose.model('Card', cardSchema);

module.exports = CardModel;