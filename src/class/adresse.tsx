interface AdresseData {
    rue: string;
    ville: string;
    CDP: string;
    Pays: string;
    user: number;
}


export async function FetchAdresse(Adressedata: { rue: string; ville: string; CDP: string; pays: string,userID: number  | undefined}) {
    let result = null;
    try {
        const response = await fetch('http://localhost:3000/adresse/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(Adressedata),
        });

        if (!response.ok) {
            throw new Error('Erreur lors de l\'ajout de l\'adresse');
        }
        result = await response.json();
        console.log(result)
    } catch (error: any) { // Spécifier le type d'erreur comme `any`
        console.error('Erreur lors de l\'ajout de l\'adresse', error);
        alert(error.message);
    }
    return result;
}
