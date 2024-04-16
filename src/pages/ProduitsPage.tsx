import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import { fetchProduitsCategorie } from "../class/produit";
import './ProduitPage.css';
import AddToCartFunction from "../components/Hooks/AddToCartFunction";

const ProduitsPage: React.FC = () => {
    const [produitdetails, setProduitdetails] = useState<any[]>([]);
    const [categorieNom, setCategorieNom] = useState<string>("");
    const [selectedQuantity, setSelectedQuantity] = useState<number>(1);
    const { id } = useParams<{ id: string }>();

    useEffect(() => {
        const fetchProduitsDetailData = async () => {
            try {
                if (id) {
                    const dataProduitDetail = await fetchProduitsCategorie(id);
                    setProduitdetails(dataProduitDetail);
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
                            <select className="SelectProduits" onChange={(e) => setSelectedQuantity(parseInt(e.target.value))}>
                                {Array.from(Array(9).keys()).map((value, index) => (
                                    <option key={index} value={value + 1}>{value + 1}</option>
                                ))}
                            </select>
                            <AddToCartFunction productId={produit.idMateriel} selectedQuantity={selectedQuantity} libelleId={produit.libelle} prix={produit.prix} />
                        </div>
                    </div>
                ))}
            </div>
        </Layout>
    );
};

export default ProduitsPage;
