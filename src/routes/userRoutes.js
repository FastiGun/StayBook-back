const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Route pour créer un nouvel utilisateur
router.post('', userController.createUtilisateur);

router.get('', userController.getAllUtilisateurs);

// Route pour récupérer les informations d'un utilisateur
router.get('/:id', userController.getUtilisateur);

// Route pour modifier les informations d'un utilisateur
router.put('/:id', userController.updateUtilisateur);

// Route pour supprimer un utilisateur
router.delete('/:id', userController.deleteUser);

module.exports = router;
