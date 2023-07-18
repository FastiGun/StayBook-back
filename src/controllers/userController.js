const Utilisateur = require('../models/userModel');

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

module.exports = {
    createUtilisateur,
    getUtilisateur,
    updateUtilisateur,
    deleteUser
};
