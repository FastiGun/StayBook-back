const mongoose = require('mongoose');

// eslint-disable-next-line no-undef
const dbURI = process.env.DB_URL;

const connectDB = async () => {
  try {
    await mongoose.connect(dbURI);

    console.log('Connecté à MongoDB');
  } catch (error) {
    console.error('Erreur de connexion à MongoDB :', error);
    // eslint-disable-next-line no-undef
    process.exit(1);
  }
};

module.exports = connectDB;
