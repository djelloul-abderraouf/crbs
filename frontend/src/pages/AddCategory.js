import React, { useState } from 'react';
import axios from 'axios';
import './AddCategory.css';

const AddCategory = () => {
    const [categoryName, setCategoryName] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/categories', { name: categoryName });
            alert('Category added successfully!');
            setCategoryName(''); // Réinitialiser le champ après ajout
        } catch (error) {
            console.error(error);
            alert('Failed to add category.');
        }
    };

    return (
        <div className="add-category">
            <form onSubmit={handleSubmit}>
                <h1>Ajouter categorie</h1>
                <input
                    type="text"
                    placeholder="nom de la categorie"
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
