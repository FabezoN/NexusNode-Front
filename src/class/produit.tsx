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

