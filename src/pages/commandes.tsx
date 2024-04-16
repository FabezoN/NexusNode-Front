import React, { useState, useEffect } from 'react';
import {NavLink, useNavigate } from 'react-router-dom';
import Layout from '../components/Layout/Layout';
import Modal from '../components/Modal/Modal';
import './AdminPage.css';
import { fetchCommandes } from '../class/commande';
import { BsFiletypePdf } from "react-icons/bs";

interface ICommande {
    idCommande: number;
    dateCommande: string;
    idUser: number;
    TotalHT: number;
    TotalTTC: number;
    AdresseLivraison: string;
    DetailsProduits: string;
    NomClient: string;
}

const Commandes: React.FC = () => {
    const navigate = useNavigate();
    const [commandes, setCommandes] = useState<ICommande[]>([]);
    const [isModalOpen, setModalOpen] = useState(false);
    const [selectedCommande, setSelectedCommande] = useState<ICommande | null>(null);
    const [search, setSearch] = useState('');  // État pour la valeur de recherche

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
        if (pdf) {
            window.open(pdf, '_blank');
        } else {
            console.error("Le chemin du fichier PDF est vide.");
        }
    };

    // Fonction pour filtrer les commandes
    const filteredCommandes = commandes.filter(commande =>
        commande.idCommande.toString().includes(search) ||
        commande.idUser.toString().includes(search) ||
        commande.NomClient.toString().includes(search)

    );
    console.log(commandes);
    return (
        <Layout>
            <div>
                <h4>Liste des commandes</h4>
                <input
                    type="text"
                    placeholder="Recherche par ID de commande ou ID utilisateur..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <table>
                    <thead>
                    <tr>
                        <th>Date de la commande</th>
                        <th>ID de commande</th>
                        <th>Numéro Client</th>
                        <th>Prix HT</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {filteredCommandes.map((commande) => (
                        <tr key={commande.idCommande}>
                            <td>{new Date(commande.dateCommande).toLocaleDateString()}</td>
                            <td>{commande.idCommande}</td>
                            <td>{commande.idUser}</td>
                            <td>{commande.TotalHT}€</td>
                            <td>
                                <button onClick={() => handleDetailsClick(commande)}>
                                    Voir Détails
                                </button>
                                <BsFiletypePdf size={20} className='Icon' onClick={() => viewPDF(commande.DetailsProduits)}/>
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
                            <p>Client: {selectedCommande.NomClient} </p>
                            <p>Date de la commande: {new Date(selectedCommande.dateCommande).toLocaleDateString()}</p>
                            <p>Total HT: {selectedCommande.TotalHT} €</p>
                            <p>Total TTC: {selectedCommande.TotalTTC} €</p>
                            <p>Adresse de livraison: {selectedCommande.AdresseLivraison}</p>
                            <p>Détails des produits: {selectedCommande.DetailsProduits}</p>
                        </div>
                    )}
                </Modal>
                <NavLink to="/adminpage">
                    <button>Retour</button>
                </NavLink>
            </div>
        </Layout>
    );
};

export default Commandes;
