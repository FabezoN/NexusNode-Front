export async function fetchCommandes() {
    try {
        const response = await fetch('http://localhost:3000/commandes/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Erreur lors de la récupération des commandes');
        }

        const data = await response.json();
        console.log('Commandes récupérées:', data);
        // Traitez les données récupérées ici, par exemple, mettez-les à jour dans votre application
    } catch (error) {
        console.error('Erreur lors de la récupération des commandes:', error);
        // Gérez l'erreur ici, par exemple, affichez un message d'erreur à l'utilisateur
    }
}
