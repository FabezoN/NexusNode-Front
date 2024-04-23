import axios from 'axios';

export async function fetchCommandes() {
    try {
        const response = await fetch('http://localhost:3000/commande/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Erreur lors de la récupération des commandes');
        }
        return await response.json();
    } catch (error) {
        console.error('Erreur lors de la récupération des commandes:', error);
    }
}
export const fetchTotalSales = async (year: number) => {
    console.log(year, 'année fetchTotalSales ')

    try {
        const response = await axios.get(`http://localhost:3000/commande/total-ventes/${year}`);
        return response.data;
    } catch (error) {
        throw new Error('Erreur lors de la récupération du chiffre d\'affaires total');
    }
};
export async function fetchTotalCommande(year: number) {
    console.log(year, 'année fetchTotalCommande ')
    try {
        const response = await fetch(`http://localhost:3000/commande/totalCommande/${year}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Erreur lors de la récupération des commandes');
        }
        return await response.json();
    } catch (error) {
        console.error('Erreur lors de la récupération des commandes:', error);
    }
}
