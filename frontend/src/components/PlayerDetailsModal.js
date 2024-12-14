import React, { useState } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import './PlayerDetailsModal.css';

Modal.setAppElement('#root'); // Nécessaire pour éviter les avertissements d'accessibilité

const PlayerDetailsModal = ({ player, onClose, onPlayerUpdate }) => {
    const [formData, setFormData] = useState({ ...player });

    const handleChange = (e) => {
        const { name, value } = e.target;
        const keys = name.split('.');
        if (keys.length > 1) {
            // Pour les champs imbriqués comme registrationFee.isPaid
            setFormData((prevData) => ({
                ...prevData,
                [keys[0]]: {
                    ...prevData[keys[0]],
                    [keys[1]]: keys[1] === 'isPaid' ? e.target.checked : value,
                },
            }));
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    // Mettre à jour un joueur
    const handleUpdate = async () => {
        try {
            await axios.put(`${process.env.REACT_APP_API_URL}/api/players/${player._id}`, formData);
            alert('Player updated successfully!');
            onClose();
            onPlayerUpdate((prevPlayers) =>
                prevPlayers.map((p) => (p._id === player._id ? formData : p))
            );
        } catch (error) {
            console.error('Error updating player:', error);
            alert('Failed to update player.');
        }
    };

    // Supprimer un joueur
    const handleDelete = async () => {
        try {
            await axios.delete(`${process.env.REACT_APP_API_URL}/api/players/${player._id}`);
            alert('Player deleted successfully!');
            onClose();
            onPlayerUpdate((prevPlayers) =>
                prevPlayers.filter((p) => p._id !== player._id)
            );
        } catch (error) {
            console.error('Error deleting player:', error);
            alert('Failed to delete player.');
        }
    };

    return (
        <Modal isOpen onRequestClose={onClose} className="modal" overlayClassName="overlay">
            <h2>Details du joueur</h2>
            <form>
                <input
                    type="text"
                    name="firstName"
                    placeholder="Nom"
                    value={formData.firstName}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="lastName"
                    placeholder="Prenom"
                    value={formData.lastName}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="phoneNumber"
                    placeholder="Num de telephone"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                />
                <textarea
                    name="remarks"
                    placeholder="Remarque"
                    value={formData.remarks}
                    onChange={handleChange}
                />
                <h3>Frais d'inscriptions</h3>
                <div className="checkbox-group">
                    <input
                        type="checkbox"
                        name="registrationFee.isPaid"
                        checked={formData.registrationFee.isPaid}
                        onChange={handleChange}
                    />
                    <label>payé</label>
                </div>
                <input
                    type="number"
                    name="registrationFee.amount"
                    placeholder="Montant"
                    value={formData.registrationFee.amount}
                    onChange={handleChange}
                />

                <h3>Frais de vetements</h3>
                <div className="checkbox-group">
                    <input
                        type="checkbox"
                        name="clothingFee.isPaid"
                        checked={formData.clothingFee.isPaid}
                        onChange={handleChange}
                    />
                    <label>payé</label>
                </div>
                <input
                    type="number"
                    name="clothingFee.amount"
                    placeholder="Montant"
                    value={formData.clothingFee.amount}
                    onChange={handleChange}
                />

                <button type="button" onClick={handleUpdate}>
                    Modifier joueur
                </button>
                <button type="button" onClick={handleDelete} className="delete-button">
                    Supprimer joueur
                </button>
                <button type="button" onClick={onClose}>
                    Fermé
                </button>
            </form>
        </Modal>
    );
};

export default PlayerDetailsModal;
