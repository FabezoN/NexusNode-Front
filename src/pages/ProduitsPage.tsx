import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import { fetchProduitsCategorie } from "../class/produit";
import './ProduitPage.css';
import { HiShoppingCart } from "react-icons/hi";

const ProduitsPage: React.FC = () => {
    const [produitdetails, setProduitdetails] = useState<any[]>([]);
    const [categorieNom, setCategorieNom] = useState<string>(""); // État pour stocker le nom de la catégorie
    const { id } = useParams<{ id: string }>();

    useEffect(() => {
        const fetchProduitsDetailData = async () => {
            try {
                if (id) {
                    const dataProduitDetail = await fetchProduitsCategorie(id);
                    setProduitdetails(dataProduitDetail);
                    // Mettre à jour le nom de la catégorie si les détails du produit contiennent une catégorie
                    if (dataProduitDetail.length > 0) {
                        setCategorieNom(dataProduitDetail[0].categorieNom);
                    }
                } else {
                    console.error("Aucun ID de catégorie trouvé dans l'URL");
                }
            } catch (error) {
                console.error("Erreur lors de la récupération des produits :", error);
            }
        };
        fetchProduitsDetailData();
    }, [id]);

    return (
        <Layout>
            <h1 className="TitreProduit">Nos produits {categorieNom && ` - ${categorieNom}`}</h1>
            <div className="ProduitParCatégories">
                {produitdetails.map((produit, index) => (
                    <div key={index} className="Produit">
                        <h3 className="NomProduit">{produit.libelle}</h3>
                        <p className="Description">Description : {produit.description}</p>
                        <p>Prix : {produit.prix} €</p>
                        <div className="AjoutPanier">
                            <select className="SelectProduits">
                                {Array.from(Array(9).keys()).map((value, index) => (
                                    <option key={index} value={value + 1}>{value + 1}</option>
                                ))}
                            </select>
                            <HiShoppingCart size={25} className="Icons"/>
                        </div>
                    </div>
                ))}
            </div>
        </Layout>
    );
};

export default ProduitsPage;
