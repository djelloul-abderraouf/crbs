import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import photo from'../assets/C R B S 2.png'

const Navbar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <nav className="navbar">
             <img to="/" src={photo} alt="Logo" className="navbar-logo-img" />
            
            <button className="navbar-toggle" onClick={toggleMobileMenu}>
                ☰
            </button>
            <ul className={`navbar-links ${isMobileMenuOpen ? 'active' : ''}`}>
                <li><Link to="/dashboard" onClick={() => setIsMobileMenuOpen(false)}>Dashboard</Link></li>
                <li><Link to="/add-player" onClick={() => setIsMobileMenuOpen(false)}>Ajouter joueur</Link></li>
                <li><Link to="/players" onClick={() => setIsMobileMenuOpen(false)}>Liste des joueurs</Link></li>
                <li><Link to="/add-category" onClick={() => setIsMobileMenuOpen(false)}>Ajouter une categorie</Link></li>
            </ul>
        </nav>
    );
};

export default Navbar;
