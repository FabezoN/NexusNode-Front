import axios from "axios";
import {URL_API} from '../env'
export async function fetchProduits() {
    try {
        const response = await fetch(`${URL_API}/materiel`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Erreur lors de la récupération des matériaux');
        }
        return await response.json();
    } catch (error) {
        console.error('Erreur lors de la récupération des matériaux:', error);
    }
}

export async function addCategorie(libelle: string) {
    const formData  ={
        "libelle": libelle,
    }
    try {
        const response = await fetch(`${URL_API}/categorie/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        if (!response.ok) {
            throw new Error('Erreur lors de l\'ajout de la catégorie');
        }

        const result = await response.json();
        alert('Catégorie enregistré avec succès!');
    } catch (error: any) {
        console.error('Erreur lors de l\'ajout de la catégorie:', error);
        alert(error.message);
    }
}
    interface CategorieFormData {
        idCategorie: number;
        libelle: string;
    }

    export async function updateCategorie(idCategorie:number, libelle: string) {
    const formData={
        "idCategorie" : idCategorie,
        "libelle" : libelle

    }
        try {
            const response = await fetch(`${URL_API}/categorie/`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error('Erreur lors de la modification de la catégorie.');
            }

            const result = await response.json();
            alert('Catégorie modifié avec succès!');
        } catch (error: any) {
            console.error('Erreur lors de la modification de la catégorie', error);
            alert(error.message);
        }
    }


export async function fetchProduitsCategorie(idCategorie: string) {
    try {
        const response = await fetch(`${URL_API}/materiel/${idCategorie}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Erreur lors de la récupération des matériaux');
        }
        return await response.json();
    } catch (error) {
        console.error('Erreur lors de la récupération des matériaux:', error);
    }
}
export async function deleteCategorie(idCategorie: string) {
    try {
        const response = await fetch(`${URL_API}/categorie/${idCategorie}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Erreur lors de la récupération des matériaux');
        }
        return await response.json();
    } catch (error) {
        console.error('Erreur lors de la récupération des matériaux:', error);
    }
}
export async function getCategorie() {
    try {
        const response = await fetch(`${URL_API}/categorie/`, {
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
    }
}
interface ProductFormData {
    idMateriel: string;
    libelle: string;
    description: string;
    prix: string;
    dateSortie: string;
    idCategorie: string;
    image?: File;
}


export async function updateProduct(formData: ProductFormData) {
    try {
        const idMateriel = formData.idMateriel
        const response = await axios.patch(`${URL_API}/materiel/${idMateriel}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data;
    } catch (error) {
        console.error('Erreur lors de la modification du produit:', error);
    }
}
export async function addProduct(formData: ProductFormData) {
  try{
        const response = await axios.post(`${URL_API}/materiel/`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data;
    } catch (error) {
        console.error('Erreur lors de la modification du produit:', error);
    }
}

export async function deleteProduct(idProduit: string) {
    try{
        const response = await axios.delete(`${URL_API}/materiel/${idProduit}`,{
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data;
    } catch (error) {
        console.error('Erreur lors de la modification du produit:', error);
    }
}



export async function getCategorieById(idCat: string){
    try {
        const response = await fetch(`${URL_API}/categorie/${idCat}`, {
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
    }
};

