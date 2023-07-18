const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const utilisateurModel = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  motDePasse: {
    type: String,
    required: true,
  },
  prenom: {
    type: String,
    required: true,
  },
  nom: {
    type: String,
    required: true,
  },
});

// Fonction de hachage du mot de passe avant de le sauvegarder
utilisateurModel.pre('save', async function (next) {
  const user = this;
  if (!user.isModified('motDePasse')) return next();

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(user.motDePasse, salt);
  user.motDePasse = hash;

  next();
});

// Méthode pour comparer le mot de passe lors de la connexion
utilisateurModel.methods.comparePassword = async function (motDePasse) {
  return await bcrypt.compare(motDePasse, this.motDePasse);
};

const Utilisateur = mongoose.model('User', utilisateurModel);

module.exports = Utilisateur;
