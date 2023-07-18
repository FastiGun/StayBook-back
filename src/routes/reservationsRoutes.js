const express = require('express');
const router = express.Router();
const reservationController = require('../controllers/reservationController');

// Route pour créer une nouvelle réservation
router.post('', reservationController.createReservation);

// Route pour récupérer toutes les réservations
router.get('', reservationController.getReservation);

// Route pour récupérer une réservation pour un jour
router.get('/:date', reservationController.getReservationByDay);

// Route pour récupérer une réservation pour une plage de dates
router.get('/:dateArrivee/:dateDepart', reservationController.getReservationByDates);

// Route pour mettre à jour une réservation
router.put('/:id', reservationController.updateReservation);

// Route pour supprimer une réservation
router.delete('/:id', reservationController.deleteReservation);

module.exports = router;
