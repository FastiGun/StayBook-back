const mongoose = require('mongoose');

const reservationModel = new mongoose.Schema({
  prenomLocataire: {
    type: String,
    required: true,
  },
  nomLocataire: {
    type: String,
    required: true,
  },
  dateArrivee: {
    type: Date,
    required: true,
  },
  dateDepart: {
    type: Date,
    required: true,
  },
  nombrePersonne: {
    type: Number,
    required: true,
  },
  dureeLocation: {
    type: Number,
    required: true,
  },
});

const Reservation = mongoose.model('Reservation', reservationModel);

module.exports = Reservation;
