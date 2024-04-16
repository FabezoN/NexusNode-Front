import React, { useEffect, useState } from "react";
import Layout from "../components /Layout/Layout";
import { NavLink } from "react-router-dom"; // Import de NavLink
import './HomePage.css';
import { fetchProduits } from "../class/produit";
import {FaBasketShopping} from "react-icons/fa6";


const HomePage: React.FC = () => {
    const [produits, setProduits] = useState<any[]>([]); // État pour stocker les produits

    useEffect(() => {
        const fetchProduitsdata = async () => {
            try {
                const dataproduit = await fetchProduits();
                setProduits(dataproduit); // Met à jour l'état des produits
            } catch (error) {
                console.error('Erreur lors de la récupération des commandes:', error);
            }
        };
        fetchProduitsdata();
    }, []);

    // Fonction pour trier les produits par catégorie
    const trierProduitsParCategorie = () => {
        const produitsParCategorie: { [key: string]: any[] } = {};

        produits.forEach(produit => {
            if (!produitsParCategorie[produit.categorie_libelle]) {
                produitsParCategorie[produit.categorie_libelle] = [];
            }
            produitsParCategorie[produit.categorie_libelle].push(produit);
        });

        return produitsParCategorie;
    };

    return (
        <Layout>
            <div>
                <h1>Home Page</h1>
                <h2>Ceci est la page d'accueil</h2>
            </div>
        </Layout>
    );
};

export default HomePage;
