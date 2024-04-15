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
        return await response.json();
    } catch (error) {
        console.error('Erreur lors de la récupération des commandes:', error);
    }
}
