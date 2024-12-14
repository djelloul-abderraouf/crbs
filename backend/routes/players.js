const express = require('express');
const Player = require('../models/Player');
const router = express.Router();

// Obtenir tous les joueurs
router.get('/', async (req, res) => {
    try {
        const players = await Player.find().populate('ageCategory');
        res.json(players);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Ajouter un joueur
router.post('/', async (req, res) => {
    const player = new Player(req.body);
    try {
        await player.save();
        res.status(201).json(player);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Mettre à jour un joueur
router.put('/:id', async (req, res) => {
    try {
        const player = await Player.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(player);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Supprimer un joueur
router.delete('/:id', async (req, res) => {
    try {
        await Player.findByIdAndDelete(req.params.id);
        res.status(204).send();
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;
