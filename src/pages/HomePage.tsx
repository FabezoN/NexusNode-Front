import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import { NavLink } from "react-router-dom"; // Import de NavLink
import './HomePage.css';
import { fetchProduits } from "../class/produit";
import AddToCartFunction from "../components/Hooks/AddToCartFunction";

const HomePage: React.FC = () => {
    const [produits, setProduits] = useState<any[]>([]);

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
            <h1 className="TitreProduits">Tous nos produits par catégorie</h1>
            <div className="AllProduits">
                {Object.entries(trierProduitsParCategorie()).map(([categorie, produits]) => (
                    <div key={categorie} className="Categorie">
                        <h3>{categorie} :</h3> {/* Utilisation du libellé de la catégorie */}
                        {produits.map(produit => (
                            <div key={produit.id} className="Produits">
                                <p>{produit.materiel_libelle} - {produit.prix} €</p>
                                <AddToCartFunction productId={produit.idMateriel} selectedQuantity={1} libelleId={produit.materiel_libelle} prix={produit.prix} />
                            </div>
                        ))}
                        {/* Lien vers la page de détails de la catégorie */}
                        <NavLink to={`/categorieproduit/${produits[0].id_Categorie}`} className="link-to-category-details">
                            Voir plus
                        </NavLink>
                    </div>
                ))}
            </div>
        </Layout>
    );
};

export default HomePage;