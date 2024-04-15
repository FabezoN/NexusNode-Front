import React, { useEffect } from "react";
import Layout from "../components /Layout/Layout";
import './AdminPage.css'
import { fetchCommandes } from "../class/commande";

const AdminPage: React.FC = () => {
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchCommandes();
                console.log('Données des commandes:', data);
            } catch (error) {
                console.error('Erreur lors de la récupération des commandes:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <Layout>
            <h2 className="titre">Page d'administration</h2>
            <div className="categories">
                <div className="commandes">

                </div>
                <div className="produits"></div>
                <div className="statistique"></div>
            </div>
        </Layout>
    );
};

export default AdminPage;
