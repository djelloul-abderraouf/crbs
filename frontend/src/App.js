import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AddPlayer from './pages/AddPlayer';
import PlayersList from './pages/PlayersList';
import AddCategory from './pages/AddCategory';
import Dashboard from './pages/Dashboard';
import Navbar from './components/Navbar';
import './App.css';


const App = () => {
    return (
        <Router>
            <Navbar />
            <div className="container">
                <Routes>
                    {/* Dashboard comme page principale */}
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/add-player" element={<AddPlayer />} />
                    <Route path="/players" element={<PlayersList />} />
                    <Route path="/add-category" element={<AddCategory />} />
                    {/* Redirection pour les routes non trouvées */}
                    <Route path="*" element={<Navigate to="/" />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
