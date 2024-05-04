import axios from 'axios';
import {URL_API} from '../env'

export async function fetchCommandes() {
    try {
        const response = await fetch(`${URL_API}/commande/`, {
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
export async function fetchAllCommandes() {
    try {
        const response = await fetch(`${URL_API}/commande/all`, {
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
export async function fetchAllCommandesById(idUser:string) {
    try {
        const response = await fetch(`${URL_API}/commande/${idUser}`, {
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
    //console.log(year, 'année fetchTotalSales ')

    try {
        const response = await axios.get(`${URL_API}/commande/total-ventes/${year}`);
        return response.data;
    } catch (error) {
        throw new Error('Erreur lors de la récupération du chiffre d\'affaires total');
    }
};
export async function fetchTotalCommande(year: number) {
    //console.log(year, 'année fetchTotalCommande ')
    try {
        const response = await fetch(`${URL_API}/commande/totalCommande/${year}`, {
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

export async function PostCommande(CommandeData: { dateCommande: string, nomFacture: string, cheminFacture: string, idPaiement: number, idAdresse: number, idUser: number}) {
    //console.log(CommandeData);
    const cartItemsArray: { id: number, quantite: number }[] = [];

    const cartData = localStorage.getItem("cart");
    if (cartData) {
        const cartObject: { [key: string]: number } = JSON.parse(cartData);

        Object.entries(cartObject).forEach(([key, quantite]) => {
            const [idStr] = key.split("/");
            const id = parseInt(idStr); // Convertir l'ID en nombre
            cartItemsArray.push({ id, quantite });
        });

        //console.log(cartItemsArray); // Afficher les données extraites
    }

    try {
        const requestData = { ...CommandeData, cartItems: cartItemsArray };

        const response = await fetch(`${URL_API}/commande/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestData),
        });
        if (!response.ok) {
            throw new Error('Echec de l\'ajout de la commande');
        }
        const result = await response.json();
    } catch (error: any) { // Spécifier le type d'erreur comme `any`
        console.error('Erreur de l\'ajout de la commande', error);
        alert(error.message);
    }
}



