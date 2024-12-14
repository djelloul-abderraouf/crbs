import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PlayerDetailsModal from '../components/PlayerDetailsModal';
import './PlayersList.css';

const PlayersList = () => {
    const [players, setPlayers] = useState([]);
    const [categories, setCategories] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('');
    const [registrationFeeFilter, setRegistrationFeeFilter] = useState('');
    const [clothingFeeFilter, setClothingFeeFilter] = useState('');
    const [selectedPlayer, setSelectedPlayer] = useState(null);

    useEffect(() => {
        const fetchPlayers = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/players`);
                setPlayers(response.data);
            } catch (error) {
                console.error('Error fetching players:', error);
            }
        };
        fetchPlayers();
    }, []);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/categories`);
                setCategories(response.data);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };
        fetchCategories();
    }, []);

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleFilterCategory = (e) => {
        setCategoryFilter(e.target.value);
    };

    const handleFilterRegistrationFee = (e) => {
        setRegistrationFeeFilter(e.target.value);
    };

    const handleFilterClothingFee = (e) => {
        setClothingFeeFilter(e.target.value);
    };

    const filteredPlayers = players.filter((player) => {
        const matchesSearch =
            player.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            player.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            player.phoneNumber.includes(searchQuery);

        const matchesCategory = categoryFilter
            ? player.ageCategory && player.ageCategory._id === categoryFilter
            : true;

        const matchesRegistrationFee =
            registrationFeeFilter === 'paid'
                ? player.registrationFee.isPaid
                : registrationFeeFilter === 'unpaid'
                ? !player.registrationFee.isPaid
                : true;

        const matchesClothingFee =
            clothingFeeFilter === 'paid'
                ? player.clothingFee.isPaid
                : clothingFeeFilter === 'unpaid'
                ? !player.clothingFee.isPaid
                : true;

        return matchesSearch && matchesCategory && matchesRegistrationFee && matchesClothingFee;
    });

    const handleOpenModal = (player) => {
        setSelectedPlayer(player);
    };

    const handleCloseModal = () => {
        setSelectedPlayer(null);
    };

    return (
        <div className="players-list">
            <h1>Liste des joueurs</h1>
            <div className="filter-bar">
                <input
                    type="text"
                    placeholder="Rechercher par nom ou numéro de téléphone"
                    value={searchQuery}
                    onChange={handleSearch}
                />
                <select onChange={handleFilterCategory} value={categoryFilter}>
                    <option value="">Toutes les catégories</option>
                    {categories.map((category) => (
                        <option key={category._id} value={category._id}>
                            {category.name}
                        </option>
                    ))}
                </select>
                <select onChange={handleFilterRegistrationFee} value={registrationFeeFilter}>
                    <option value="">Frais d'inscription</option>
                    <option value="paid">Payé</option>
                    <option value="unpaid">Impayé</option>
                </select>
                <select onChange={handleFilterClothingFee} value={clothingFeeFilter}>
                    <option value="">Frais de vêtements</option>
                    <option value="paid">Payé</option>
                    <option value="unpaid">Impayé</option>
                </select>
            </div>
            <div className="player-cards">
                {filteredPlayers.map((player) => (
                    <div className="player-box" key={player._id}>
                        <div className="player-info">
                            <h3>{`${player.firstName} ${player.lastName}`}</h3>
                            <p><strong>Numéro de téléphone :</strong> {player.phoneNumber}</p>
                            <p><strong>Catégorie :</strong> {player.ageCategory?.name || 'N/A'}</p>
                            <p><strong>Inscription payé :</strong> {player.registrationFee.isPaid ? 'Oui' : 'Non'}</p>
                            <p><strong>Vêtements payé :</strong> {player.clothingFee.isPaid ? 'Oui' : 'Non'}</p>
                        </div>
                        <div className="player-actions">
                            <button onClick={() => handleOpenModal(player)}>Détails</button>
                        </div>
                    </div>
                ))}
            </div>
            {selectedPlayer && (
                <PlayerDetailsModal
                    player={selectedPlayer}
                    onClose={handleCloseModal}
                    onPlayerUpdate={setPlayers}
                />
            )}
        </div>
    );
};

export default PlayersList;
