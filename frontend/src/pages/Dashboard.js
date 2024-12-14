import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from 'chart.js';
import { Doughnut, Bar } from 'react-chartjs-2';
import './Dashboard.css';

// Enregistrez les composants nécessaires pour Chart.js
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

const Dashboard = () => {
    const [players, setPlayers] = useState([]);
    const [stats, setStats] = useState({
        registrationPaid: 0,
        registrationUnpaid: 0,
        clothingPaid: 0,
        clothingUnpaid: 0,
        totalRegistration: 0,
        totalClothing: 0,
    });

    useEffect(() => {
        const fetchPlayers = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/players`);
                setPlayers(response.data);
                calculateStats(response.data);
            } catch (error) {
                console.error('Erreur lors de la récupération des joueurs :', error);
            }
        };
        fetchPlayers();
    }, []);

    const calculateStats = (players) => {
        let registrationPaid = 0;
        let registrationUnpaid = 0;
        let clothingPaid = 0;
        let clothingUnpaid = 0;
        let totalRegistration = 0;
        let totalClothing = 0;

        players.forEach((player) => {
            if (player.registrationFee.isPaid) {
                registrationPaid++;
                totalRegistration += player.registrationFee.amount;
            } else {
                registrationUnpaid++;
            }

            if (player.clothingFee.isPaid) {
                clothingPaid++;
                totalClothing += player.clothingFee.amount;
            } else {
                clothingUnpaid++;
            }
        });

        setStats({
            registrationPaid,
            registrationUnpaid,
            clothingPaid,
            clothingUnpaid,
            totalRegistration,
            totalClothing,
        });
    };

    return (
        <div>
            <h1>Dashboard</h1>
            <div className="stats">
                <div className="stat">
                    <h3>Frais d'inscription</h3>
                    <Doughnut
                        data={{
                            labels: ['payé', 'impayé'],
                            datasets: [
                                {
                                    data: [stats.registrationPaid, stats.registrationUnpaid],
                                    backgroundColor: ['#4caf50', '#f44336'],
                                },
                            ],
                        }}
                    />
                </div>
                <div className="stat">
                    <h3>Frais de vêtements</h3>
                    <Doughnut
                        data={{
                            labels: ['payé', 'impayé'],
                            datasets: [
                                {
                                    data: [stats.clothingPaid, stats.clothingUnpaid],
                                    backgroundColor: ['#4caf50', '#f44336'],
                                },
                            ],
                        }}
                    />
                </div>
            </div>
            <div className="totals">
                <h3>Montant total</h3>
                <Bar
                    data={{
                        labels: ['Frais inscription', 'Frais vêtements', 'Total'],
                        datasets: [
                            {
                                label: 'Montant total',
                                data: [
                                    stats.totalRegistration,
                                    stats.totalClothing,
                                    stats.totalRegistration + stats.totalClothing,
                                ],
                                backgroundColor: ['#2196f3', '#ff9800', '#9c27b0'],
                            },
                        ],
                    }}
                />
            </div>
        </div>
    );
};

export default Dashboard;
