import axios from "axios";

export async function fetchProduits() {
    try {
        const response = await fetch('http://localhost:3000/materiel/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Erreur lors de la récupération des matériaux');
        }
        return await response.json();
        // Traitez les données récupérées ici, par exemple, mettez-les à jour dans votre application
    } catch (error) {
        console.error('Erreur lors de la récupération des matériaux:', error);
        // Gérez l'erreur ici, par exemple, affichez un message d'erreur à l'utilisateur
    }
}
export async function fetchProduitsCategorie(idCategorie: string) {
    try {
        const response = await fetch(`http://localhost:3000/materiel/${idCategorie}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Erreur lors de la récupération des matériaux');
        }
        return await response.json();
        // Traitez les données récupérées ici, par exemple, mettez-les à jour dans votre application
    } catch (error) {
        console.error('Erreur lors de la récupération des matériaux:', error);
        // Gérez l'erreur ici, par exemple, affichez un message d'erreur à l'utilisateur
    }
}

export async function getCategorie() {
    try {
        const response = await fetch('http://localhost:3000/categorie/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Erreur lors de la récupération des catégories');
        }
        return await response.json();
    } catch (error) {
        console.error('Erreur lors de la récupération des catégories:', error);
        // Gérez l'erreur ici, par exemple, affichez un message d'erreur à l'utilisateur
    }
}
// Fonction pour enregistrer un produit

export async function  saveProduct(formData: FormData){
    try {

        const response = await axios.post('http://localhost:3000/materiel/update', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data;
    } catch (error) {
        console.error('Erreur lors de la Modif Produit:', error);
    }
};

export async function getCategorieById(idCat: string){
    try {
        const response = await fetch(`http://localhost:3000/categorie/${idCat}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Erreur lors de la récupération des catégories');
        }
        return await response.json();
    } catch (error) {
        console.error('Erreur lors de la récupération des catégories:', error);
        // Gérez l'erreur ici, par exemple, affichez un message d'erreur à l'utilisateur
    }
};

