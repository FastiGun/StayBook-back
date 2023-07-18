const jwt = require('jsonwebtoken');
require('dotenv').config();

// eslint-disable-next-line no-undef
const jwtSecret = process.env.SECRET_KEY_JWT;

const authMiddleware = (req, res, next) => {

  let token = "";

  try{
    token = req.header('Authorization').replace('Bearer ', '');
  } catch (error) {
    return res.status(401).json({ message: 'Token manquant, accès non autorisé' });
  }
  
  // Vérifier si le token existe
  if (!token) {
    return res.status(401).json({ message: 'Token manquant, accès non autorisé' });
  }

  try {
    // Vérifier et décoder le token
    const decoded = jwt.verify(token, jwtSecret);

    // Ajouter les informations du token à l'objet de requête pour une utilisation ultérieure
    req.user = decoded;

    // Passer au middleware suivant
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Token invalide, accès non autorisé' });
  }
};

module.exports = authMiddleware;
