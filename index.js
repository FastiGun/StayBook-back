const express = require('express');
const app = express();
const userRoutes = require('./src/routes/userRoutes');
const reservationRoutes = require('./src/routes/reservationsRoutes');
require('dotenv').config();
const cors = require('cors');
const connectDB = require('./src/config/db');

connectDB();

// Middleware pour parser le corps des requêtes en JSON
app.use(express.json());

app.use(cors());

// Routes pour les utilisateurs
app.use('/api/users', userRoutes);

// Routes pour les réservations
app.use('/api/reservations', reservationRoutes);

// Middleware d'erreur pour gérer les erreurs
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: 'Erreur serveur à la requête : ', req});
});

// Démarrage du serveur
app.listen(3001, () => {
  console.log('Serveur en écoute sur le port 3001');
});

