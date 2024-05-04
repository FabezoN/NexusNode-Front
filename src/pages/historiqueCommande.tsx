import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import Layout from '../components/Layout/Layout';
import './AdminPage.css';
import { fetchAllCommandesById } from '../class/commande';
import { BsFiletypePdf } from "react-icons/bs";
import { URL_API } from '../env';

interface ICommande {
    idCommande: number;
    dateCommande: string;
    idUser: number;
    TotalHT: number;
    PrixTotal: number;
    AdresseLivraison: string;
    DetailsProduits: string;
    NomComplet: string;
    nomFacture: string;
    cheminFacture: string;
}

const CommandesPage: React.FC = () => {
    const navigate = useNavigate();
    const [commandes, setCommandes] = useState<ICommande[]>([]);
    const [search, setSearch] = useState('');

    useEffect(() => {
        const storage = sessionStorage.getItem('user');
        if (storage) {
            const userObject = JSON.parse(storage);
            if (userObject.info.role !== 2) {  // Assuming role '2' is for admin
                navigate('/error404');
                return;
            }
        } else {
            navigate('/');
            return;
        }

        const fetchData = async () => {
            try {
                const storage = sessionStorage.getItem('user');
                if (storage) {
                    const userObject = JSON.parse(storage);
                    const userId = userObject.info.id

                    const allCommandes = await fetchAllCommandesById(userId);

                    setCommandes(allCommandes);
                }
            } catch (error) {
                console.error('Erreur lors de la récupération des commandes:', error);
                setCommandes([]); // Assure-toi que commandes est toujours un tableau
            }
        };


        fetchData();
    }, [navigate]);

    const viewPDF = (filename: string) => {
        const url = `${URL_API}/facture/${filename}.pdf`;
        window.open(url, '_blank');

    };

    const filteredCommandes = commandes && commandes.length > 0 ? commandes.filter(commande =>
        commande.idCommande.toString().includes(search) ||
        commande.NomComplet.toLowerCase().includes(search.toLowerCase())
    ) : [];


    return (
        <Layout>
            <div>
                <h4>Liste des commandes</h4>
                <input
                    type="text"
                    placeholder="Recherche par ID de commande, nom du client..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <table>
                    <thead>
                    <tr>
                        <th>Date</th>
                        <th>ID Commande</th>
                        <th>Client</th>
                        <th>Total TTC</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {filteredCommandes.map((commande) => (
                        <tr key={commande.idCommande}>
                            <td>{new Date(commande.dateCommande).toLocaleDateString()}</td>
                            <td>{commande.idCommande}</td>
                            <td>{commande.NomComplet}</td>
                            <td>{commande.PrixTotal ? commande.PrixTotal.toFixed(2) : '0.00'}€</td>
                            <td>
                                <button onClick={() => viewPDF(commande.nomFacture)}>
                                    <BsFiletypePdf size={20} className='Icon'/>
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>

                <NavLink to="/adminpage">
                    <button>Retour</button>
                </NavLink>
            </div>
        </Layout>
    );
};

export default CommandesPage;
