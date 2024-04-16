import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
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
            <h1 className="TitreProduit">Tout nos produits par catégorie</h1>
            <div className="AllProduits">
                {Object.entries(trierProduitsParCategorie()).map(([categorie, produits]) => (
                    <NavLink key={categorie} to={`/categorieproduit/${produits[0].id_Categorie}`} className="Categorie">
                        <div>
                            <h3>{categorie} :</h3> {/* Utilisation du libellé de la catégorie */}
                            {produits.map(produit => (
                                <div key={produit.id} className="Produit">
                                    <p>{produit.materiel_libelle} - {produit.prix} €</p>
                                    <FaBasketShopping size={20} className="Icons"></FaBasketShopping>
                                </div>
                            ))}
                        </div>
                    </NavLink>
                ))}
            </div>
        </Layout>
    );
};

export default HomePage;