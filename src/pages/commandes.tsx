import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout/Layout';
import Modal from '../components/Modal/Modal'; // Assure-toi que le chemin vers le composant Modal est correct
import './AdminPage.css';
import { fetchCommandes } from '../class/commande';
import { BsFiletypePdf } from "react-icons/bs";

interface ICommande {
    cheminFacture: string;
    dateCommande: string;
    idAdresse: number;
    idCommande: number;
    idPaiement: number;
    idUser: number;
    nomFacture: string;
}

const Commandes: React.FC = () => {
    const navigate = useNavigate();
    const [commandes, setCommandes] = useState<ICommande[]>([]);
    const [isModalOpen, setModalOpen] = useState(false);
    const [selectedCommande, setSelectedCommande] = useState<ICommande | null>(null);

    useEffect(() => {
        const storage = sessionStorage.getItem('user');
        if (storage) {
            const userObject = JSON.parse(storage);
            if (userObject.info.role !== 2) {
                navigate('/');
                return;
            }
        } else {
            navigate('/');
            return;
        }

        const fetchData = async () => {
            try {
                const allCommandes = await fetchCommandes();
                setCommandes(allCommandes);
                console.log(allCommandes);
            } catch (error) {
                console.error('Erreur lors de la récupération des commandes:', error);
            }
        };

        fetchData();
    }, [navigate]);

    const handleDetailsClick = (commande: ICommande) => {
        setSelectedCommande(commande);
        setModalOpen(true);
    };

    const viewPDF = (pdf: string) => {
        // Vérifie si le chemin PDF n'est pas vide
        if (pdf) {
            console.log(pdf);
            // Ouvre le PDF dans un nouvel onglet
            window.open(pdf, '_blank');
        } else {
            console.error("Le chemin du fichier PDF est vide.");
        }
    };


    return (
        <Layout>
            <div>
                <h4>Liste des commandes</h4>
                <table>
                    <thead>
                    <tr>
                        <th>Date de la commande</th>
                        <th>ID de commande</th>
                        <th>Nom de la facture</th>
                        <th>Actions</th>
                        <th>
                            Export
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {commandes.map((commande) => (
                        <tr key={commande.idCommande}>
                            <td>{new Date(commande.dateCommande).toLocaleDateString()}</td>
                            <td>{commande.idCommande}</td>
                            <td>{commande.nomFacture}</td>
                            <td>
                                <button onClick={() => handleDetailsClick(commande)}>
                                    Voir Détails
                                </button>
                            </td>
                            <td>
                                <div className='Buttons'>
                                    <BsFiletypePdf  size={20} className='Icon' onClick={() => viewPDF(commande.cheminFacture)}/>

                                </div>
                            </td>

                        </tr>
                    ))}
                    </tbody>
                </table>
                <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
                    {selectedCommande && (
                        <div>
                            <h5>Détails de la Commande</h5>
                            <p>ID de commande: {selectedCommande.idCommande}</p>
                            <p>Date de la commande: {new Date(selectedCommande.dateCommande).toLocaleDateString()}</p>
                            <p>Nom de la facture: {selectedCommande.nomFacture}</p>
                            <p>Chemin de la facture: {selectedCommande.cheminFacture}</p>
                        </div>
                    )}
                </Modal>
            </div>
        </Layout>
    );
};

export default Commandes;
