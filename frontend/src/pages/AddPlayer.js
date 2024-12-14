import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AddPlayer.css';


const AddPlayer = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        phoneNumber: '',
        dateOfBirth: '',
        ageCategory: '',
        registrationFee: 0,
        clothingFee: 0,
        remarks: '',
    });
    const [categories, setCategories] = useState([]);

    // Fetch categories from the backend
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/categories');
                setCategories(response.data);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };
        fetchCategories();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/players', formData);
            alert('Player added successfully!');
        } catch (error) {
            console.error('Error adding player:', error);
            alert('Failed to add player.');
        }
    };

    return (
        <form className="form" onSubmit={handleSubmit}>
            <h1>Ajouter un joueur</h1>
            <input
                type="text"
                name="firstName"
                placeholder="Nom"
                value={formData.firstName}
                onChange={handleChange}
                required
            />
            <input
                type="text"
                name="lastName"
                placeholder="prenom"
                value={formData.lastName}
                onChange={handleChange}
                required
            />
            <input
                type="text"
                name="phoneNumber"
                placeholder="numero de telephone"
                value={formData.phoneNumber}
                onChange={handleChange}
                required
            />
            <input
                type="date"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleChange}
                required
            />
            <select
                name="ageCategory"
                value={formData.ageCategory}
                onChange={handleChange}
                required
            >
                <option value="">Selectionner une categorie</option>
                {categories.map((category) => (
                    <option key={category._id} value={category._id}>
                        {category.name}
                    </option>
                ))}
            </select>
            {/* <input
                type="number"
                name="registrationFee"
                placeholder="Frais d'inscription"
                value={formData.registrationFee}
                onChange={handleChange}
            />
            <input
                type="number"
                name="clothingFee"
                placeholder="Frais de vetements"
                value={formData.clothingFee}
                onChange={handleChange}
            /> */}
            <textarea
                name="remarks"
                placeholder="Remarque"
                value={formData.remarks}
                onChange={handleChange}
            />
            <button type="submit">Ajouter</button>
        </form>
    );
};

export default AddPlayer;
