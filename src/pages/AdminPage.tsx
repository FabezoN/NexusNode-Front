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
               // console.log('Données des commandes:', data);
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
                <div className="buttonsCate">
                    <NavLink to="/CommandePage">
                        <button className="CategoBtn">Voir toutes les commandes</button>
                    </NavLink>
                </div>
                <div className="buttonsCate">
                    <NavLink to="/AdminProduit">
                        <button className="CategoBtn">Voir tous les produits</button>
                    </NavLink>

                </div>
                <div className="buttonsCate">
                    <NavLink to="/statistique">
                        <button className="CategoBtn">Statistiques de vente</button>
                    </NavLink>
                </div>
            </div>
        </Layout>
    );
};

export default AdminPage;
