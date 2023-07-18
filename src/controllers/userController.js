const Utilisateur = require('../models/userModel');
const jwt = require('jsonwebtoken');

// eslint-disable-next-line no-undef
const jwtSecret = process.env.SECRET_KEY_JWT;

// Fonction pour créer un nouvel utilisateur
const createUtilisateur = async (req, res) => {
    try {
        const { email, motDePasse, prenom, nom } = req.body;

        const utilisateur = new Utilisateur({
            email,
            motDePasse,
            prenom,
            nom
        });
        await utilisateur.save();
        res.status(201).json({ message: 'Utilisateur créé avec succès', utilisateur });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la création de l\'utilisateur', error });
    }
};

const getAllUtilisateurs = async (req, res) => {
    try {
        const utilisateurs = await Utilisateur.find();
        res.json({ utilisateurs });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération des utilisateurs', error });
    }
}

// Fonction pour récupérer les informations d'un utilisateur
const getUtilisateur = async (req, res) => {
    try {
        const userId = req.params.id;
        const utilisateur = await Utilisateur.findById(userId);
        if (!utilisateur) {
            return res.status(404).json({ message: 'Utilisateur introuvable' });
        }
        res.json({ utilisateur });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération de l\'utilisateur', error });
    }
};

// Fonction pour modifier les informations d'un utilisateur
const updateUtilisateur = async (req, res) => {
    try {
        const userId = req.params.id;
        const { motDePasse, prenom, nom } = req.body;
        const utilisateur = await Utilisateur.findByIdAndUpdate(userId, {
            motDePasse,
            prenom,
            nom
        });
        if (!utilisateur) {
            return res.status(404).json({ message: 'Utilisateur introuvable' });
        }
        await utilisateur.save();
        res.status(200).json({ message: 'Utilisateur modifié avec succès' });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la modification de l\'utilisateur', error });
    }
}

const deleteUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const utilisateur = await Utilisateur.findByIdAndDelete(userId);
        if (!utilisateur) {
            return res.status(404).json({ message: 'Utilisateur introuvable' });
        }
        res.status(200).json({ message: 'Utilisateur supprimé avec succès' });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la suppression de l\'utilisateur', error });
    }
}

const login = async (req, res) => {
    try {
      // Vérification des informations d'identification de l'utilisateur
      const { email, password } = req.body;
      const user = await Utilisateur.findOne({ email });
  
      if (!user) {
        return res.status(401).json({ message: 'Email invalide' });
      }
  
      // Vérification du mot de passe
      const isMatch = await user.comparePassword(password);
      if (!isMatch) {
        return res.status(401).json({ message: 'Mot de passe incorrect' });
      }
  
      // Génération du token JWT
      const token = jwt.sign({ userId: user._id }, jwtSecret, { expiresIn: '24h' });
  
      res.json({ token });
    } catch (error) {
      res.status(500).json({ message: 'Erreur lors de la connexion', error });
    }
  };

module.exports = {
    createUtilisateur,
    getAllUtilisateurs,
    getUtilisateur,
    updateUtilisateur,
    deleteUser,
    login
};
