const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');

// Route pour la connexion d'un user
router.post('/login', userController.login);

router.post('/verify', userController.verify);

router.use(authMiddleware);

// Route pour créer un nouvel utilisateur
router.post('', userController.createUtilisateur);

// Route pour récupérer les informations d'un utilisateur
router.get('', userController.getAllUtilisateurs);

// Route pour récupérer les informations d'un utilisateur
router.get('/:id', userController.getUtilisateur);

// Route pour modifier les informations d'un utilisateur
router.put('/:id', userController.updateUtilisateur);

// Route pour supprimer un utilisateur
router.delete('/:id', userController.deleteUser);


module.exports = router;
