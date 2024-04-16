import React, { useEffect } from 'react';
import {NavLink, useNavigate } from 'react-router-dom';
import Layout from '../components/Layout/Layout';
import './AdminPage.css';
import { fetchCommandes } from '../class/commande';

const AdminPage: React.FC = () => {
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
            <h2 className="titre">Page d'administration</h2>
            <div className="categories">
                <div className="commandes">
                    <NavLink to="/commandes">
                        <button>Consulter</button>
                    </NavLink>
                </div>
                <div className="produits">
                    <NavLink to="/gestionsProduits">
                        <button>Produits</button>
                    </NavLink>

                </div>
                <div className="statistique">
                    <NavLink to="/statistique">
                        <button>Statistique</button>
                    </NavLink>
                </div>
            </div>
        </Layout>
    );
};

export default AdminPage;
