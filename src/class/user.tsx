// Définir une interface pour les données du formulaire
interface FormData {
    email: string;
    prenom: string;
    nom: string;
    password: string;
    role: number;
}

export async function registerUser(formData: FormData) {
    console.log(formData);
    try {
        const response = await fetch('http://localhost:3000/users/sign-up', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        if (!response.ok) {
            throw new Error('Erreur lors de l\'enregistrement');
        }

        const result = await response.json();
        console.log(result);
        alert('Utilisateur enregistré avec succès!');
    } catch (error: any) { // Spécifier le type d'erreur comme `any`
        console.error('Erreur lors de l\'enregistrement:', error);
        alert(error.message);
    }
}

