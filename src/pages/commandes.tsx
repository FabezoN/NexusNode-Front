import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components /Layout/Layout';
import './AdminPage.css';
import { fetchCommandes } from '../class/commande';

const Commandes: React.FC = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const storage = sessionStorage.getItem('user');
        if (storage) {
            const userObject = JSON.parse(storage);
            const userRole = userObject.info.role;

            if (userRole !== 2) {
                navigate('/'); // Redirige vers la page d'accueil
            }
        } else {
            navigate('/'); // Redirige vers la page d'accueil si pas de données utilisateur
        }

        const fetchData = async () => {
            try {
                const data = await fetchCommandes();
                console.log('Données des commandes:', data);
            } catch (error) {
                console.error('Erreur lors de la récupération des commandes:', error);
            }
        };

        fetchData();
    }, [navigate]);

    return (
        <Layout>
            <div>
                <h4>
                    listes des commandes
                    
                </h4>
            </div>
        </Layout>
    );
};

export default Commandes;
