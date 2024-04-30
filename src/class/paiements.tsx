export async function FetchPaiement(PaiementData: { datePaiement: string, Etat: string }) {
    let result = null;
    try {
        const response = await fetch('http://localhost:3000/paiement/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(PaiementData),
        });
        if (!response.ok) {
            throw new Error('Echec du paiement');
        }
         result = await response.json();
    } catch (error: any) { // Spécifier le type d'erreur comme `any`
        console.error('Erreur lors de l\'ajout du paiement', error);
        alert(error.message);
    }
    return result;
}
