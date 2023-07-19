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
    type: String,
    required: true,
  },
  dateDepart: {
    type: String,
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
