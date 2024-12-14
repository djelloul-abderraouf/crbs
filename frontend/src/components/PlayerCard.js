import React from 'react';

const PlayerCard = ({ player }) => {
    return (
        <div>
            <h2>{player.firstName} {player.lastName}</h2>
            <p>Telephone: {player.phoneNumber}</p>
            <p>Categorie: {player.ageCategory.name}</p>
        </div>
    );
};

export default PlayerCard;
