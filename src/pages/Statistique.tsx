import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout/Layout';
import './AdminPage.css';
import { fetchTotalCommande, fetchTotalSales } from '../class/commande';

const Statistique: React.FC = () => {
    const navigate = useNavigate();
    const [totalCommande, setTotalCommande] = useState<number>(0);
    const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear());
    const [productStats, setProductStats] = useState<any[]>([]);

    useEffect(() => {
        const checkUserRole = () => {
            const storage = sessionStorage.getItem('user');
            if (storage) {
                const userObject = JSON.parse(storage);
                const userRole = userObject.info.role;

                if (userRole !== 2) {
                    navigate('/error404'); // Redirige vers la page d'accueil
                }
            } else {
                navigate('/'); // Redirige vers la page d'accueil si pas de données utilisateur
            }
        };

        const fetchData = async (year: number) => {
            try {
                const commandeData = await fetchTotalCommande(year);
                const salesData = await fetchTotalSales(year);
                //console.log(salesData);
                setTotalCommande(commandeData.nbCommande);
                setProductStats(salesData);
            } catch (error) {
                console.error('Erreur lors de la récupération des données:', error);
            }
        };

        checkUserRole();
        fetchData(selectedYear);
    }, [navigate, selectedYear]);

    const handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const year = parseInt(event.target.value);
        setSelectedYear(year);
    };

    const currentYear = new Date().getFullYear();
    const options = [];
    for (let i = 0; i < 10; i++) {
        const year = currentYear - i - 1;
        options.push(<option key={year} value={year}>{year}</option>);
    }

    return (
        <Layout>
        <h2 className="titre">Statistique</h2>
            <div>
                <div className="AnnéeCours">
                    <h3>Affichage des données en fonction de l'année : </h3>
                    <select className="SelectAnnée" value={selectedYear} onChange={handleYearChange}>
                        <option value={new Date().getFullYear()}>Année en cours</option>
                        {options}
                    </select>
                </div>
                <div className="TotalCommande">
                    <h3>TOTAL COMMANDE</h3>
                    <h3>{totalCommande}</h3>
                </div>
                <div className="ChiffreAff">
                    <div>
                        <h2>CHIFFRE D'AFFAIRES</h2>
                    </div>
                    <div>
                        <table>
                            <thead>
                            <tr>
                                <th>Produit</th>
                                <th>Quantité vendue</th>
                                <th>Revenu total</th>
                            </tr>
                            </thead>
                            <tbody>
                            {productStats && productStats.length > 0 && productStats.map((product: any, index: number) => (
                                <tr key={index}>
                                    <td>{product.libelle_produit}</td>
                                    <td>{product.quantite_totale}</td>
                                    <td>{product.revenu_total}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Statistique;
