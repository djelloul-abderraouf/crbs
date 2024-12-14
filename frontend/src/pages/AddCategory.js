import React, { useState } from 'react';
import axios from 'axios';
import './AddCategory.css';

const AddCategory = () => {
    const [categoryName, setCategoryName] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${process.env.REACT_APP_API_URL}/api/categories`, { name: categoryName });
            alert('Catégorie ajoutée avec succès !');
            setCategoryName(''); // Réinitialiser le champ après ajout
        } catch (error) {
            console.error('Erreur lors de l\'ajout de la catégorie :', error);
            alert('Échec de l\'ajout de la catégorie.');
        }
    };

    return (
        <div className="add-category">
            <form onSubmit={handleSubmit}>
                <h1>Ajouter catégorie</h1>
                <input
                    type="text"
                    placeholder="Nom de la catégorie"
                    value={categoryName}
                    onChange={(e) => setCategoryName(e.target.value)}
                    required
                />
                <button type="submit">Ajouter</button>
            </form>
        </div>
    );
};

export default AddCategory;
