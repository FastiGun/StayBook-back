const express = require('express');
const userRoutes = require('./routes/userRoutes');
const reservationRoutes = require('./routes/reservationRoutes');

const app = express();

// Middleware pour parser le corps des requêtes en JSON
app.use(express.json());

// Routes pour les utilisateurs
app.use('/api/users', userRoutes);

// Routes pour les réservations
app.use('/api/reservations', reservationRoutes);

// Middleware d'erreur pour gérer les erreurs
app.use((err, req, res) => {
  console.error(err);
  res.status(500).json({ message: 'Erreur serveur à la requête : ', req});
});

// Démarrage du serveur
app.listen(3000, () => {
  console.log('Serveur en écoute sur le port 3000');
});

