const Reservation = require('../models/reservationModel');

// Fonction pour créer une nouvelle réservation
const createReservation = async (req, res) => {
  try {
    const { nomLocataire, prenomLocataire, dateArrivee, dateDepart, nombrePersonne, dureeLocation } = req.body;

    const existingReservation = await Reservation.findOne({
      $or: [
        {
          $and: [
            { dateArrivee: { $lt: dateDepart } },
            { dateDepart: { $gt: dateArrivee } }
          ]
        },
        {
          $and: [
            { dateArrivee: { $eq: dateDepart } },
            { dateDepart: { $eq: dateArrivee } }
          ]
        }
      ]
    });
    
    if (existingReservation) {
      return res.status(409).json({ message: 'Il y a déjà une réservation pour ces dates' });
    }

    const reservation = new Reservation({
      nomLocataire,
      prenomLocataire,
      dateArrivee,
      dateDepart,
      nombrePersonne,
      dureeLocation
    });

    await reservation.save();
    res.status(201).json({ message: 'Réservation créée avec succès : ', reservation });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la création de la réservation : ', error });
  }
};

// Fonction pour récupérer les informations d'une réservation
const getReservation = async (req, res) => {
  try {
    const reservationId = req.params.id;
    const reservation = await Reservation.findById(reservationId);
    if (!reservation) {
      return res.status(404).json({ message: 'Réservation introuvable' });
    }
    res.json({ reservation });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération de la réservation : ', error });
  }
};

const getAllReservation = async (req, res) => {
  try {
    const reservations = await Reservation.find();
    res.json({ reservations });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération des réservations : ', error });
  }
}

// Fonction pour récupérer une réservation par ses dates d'arrivée et de départ
const getReservationByDates = async (req, res) => {
    try {
      const { dateArrivee, dateDepart } = req.body;
      const reservation = await Reservation.findOne({
        dateArrivee: { $lte: dateDepart },
        dateDepart: { $gte: dateArrivee },
      });
      if (!reservation) {
        return res.status(404).json({ message: 'Réservation introuvable pour ces dates' });
      }
      res.json({ reservation });
    } catch (error) {
      res.status(500).json({ message: 'Erreur lors de la récupération de la réservation', error });
    }
  };

  const getReservationByDay = async (req, res) => {
    try {
      const { date } = req.params;
      const reservation = await Reservation.findOne({
        dateArrivee: { $lte: date },
        dateDepart: { $gte: date },
      });
      if (!reservation) {
        return res.status(404).json({ message: 'Aucune réservation pour cette journée' });
      }
      res.json({ reservation });
    } catch (error) {
      res.status(500).json({ message: 'Erreur lors de la récupération de la réservation', error });
    }
  };

// Fonction pour modifier les informations d'une réservation
const updateReservation = async (req, res) => {
  try {
    const reservationId = req.params.id;
    const { nomLocataire, prenomLocataire, dateArrivee, dateDepart, nombrePersonne, dureeLocation } = req.body;

    const reservation = await Reservation.findByIdAndUpdate(reservationId, {
      nomLocataire,
      prenomLocataire,
      dateArrivee,
      dateDepart,
      nombrePersonne,
      dureeLocation
    });

    if (!reservation) {
      return res.status(404).json({ message: 'Réservation introuvable' });
    }

    res.status(200).json({ message: 'Réservation modifiée avec succès :', reservation });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la modification de la réservation : ', error });
  }
};

const deleteReservation = async (req, res) => {
  try {
    const reservationId = req.params.id;
    const reservation = await Reservation.findByIdAndDelete(reservationId);
    if (!reservation) {
      return res.status(404).json({ message: 'Réservation introuvable' });
    }
    res.status(200).json({ message: 'Réservation supprimée avec succès' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la suppression de la réservation : ', error });
  }
}

module.exports = {
  createReservation,
  getAllReservation,
  getReservation,
  getReservationByDates,
  getReservationByDay,
  updateReservation,
  deleteReservation
};
