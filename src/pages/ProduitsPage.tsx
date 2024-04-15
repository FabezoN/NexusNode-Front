import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Layout from "../components /Layout/Layout";
import { fetchProduitsCategorie } from "../class/produit";

const ProduitsPage: React.FC = () => {
    const [produitdetails, setproduitdetails] = useState<any[]>([]); // État pour stocker les produits
    const { id } = useParams<{ id: string }>(); // Récupère l'ID de la catégorie depuis l'URL

    useEffect(() => {
        const fetchProduitsdetaildata = async () => {
            try {
                if (id) { // Vérifie si id est défini
                    const datapdetailroduit = await fetchProduitsCategorie(id);
                    setproduitdetails(datapdetailroduit); // Met à jour l'état des produits
                    console.log(datapdetailroduit);
                } else {
                    console.error('Aucun ID de catégorie trouvé dans l\'URL');
                }
            } catch (error) {
                console.error('Erreur lors de la récupération des commandes:', error);
            }
        };
        fetchProduitsdetaildata();
    }, [id]); // Ajout de id comme dépendance pour réexécuter l'effet lorsque id change

    return (
        <Layout>
            <h2 className="TitreProduit">DetailsProduits</h2>
            {/* Affichez les détails du produit ici */}
        </Layout>
    );
};

export default ProduitsPage;
