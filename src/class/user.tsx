import {URL_API} from '../env'


interface FormData {
    email: string;
    prenom: string;
    nom: string;
    password: string;
    role: number;
}

interface  LoginForm {
    email: string;
    password: string;
}

export async function registerUser(formData: FormData) {
    try {
        const response = await fetch(`http://localhost:3000/users/sign-up`, {
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
        alert('Utilisateur enregistré avec succès!');
    } catch (error: any) {
        console.error('Erreur lors de l\'enregistrement:', error);
        alert(error.message);
    }
}

export async function loginUser(loginForm: LoginForm) {
    try {
        const response = await fetch(`http://localhost:3000/users/sign-in`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(loginForm),
        });

        if (!response.ok) {
            throw new Error('Erreur lors de la connexion');
        }

        const result = await response.json();
        alert('Connexion réussie!');
        return result;
    } catch (error: any) {
        console.error('Erreur lors de la connexion', error);
        alert(error.message);
    }
}

