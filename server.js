const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const playerRoutes = require('./backend/routes/players');
const categoryRoutes = require('./backend/routes/categories');

dotenv.config(); // Charge les variables d'environnement depuis le fichier .env
const app = express();

// Middleware
app.use(express.json()); // Permet de traiter les requêtes JSON
app.use(cors()); // Autorise les requêtes cross-origin

// Connexion à MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.log('MongoDB connection error:', err));





    app.use('/api/players', playerRoutes);
    app.use('/api/categories', categoryRoutes);









// Lancement du serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
