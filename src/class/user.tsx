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
    //console.log("coucou")
    try {
        const response = await fetch(`${URL_API}/users/sign-up`, {
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
        //console.log(result);
        alert('Utilisateur enregistré avec succès!');
    } catch (error: any) { // Spécifier le type d'erreur comme `any`
        console.error('Erreur lors de l\'enregistrement:', error);
        alert(error.message);
    }
}

export async function loginUser(loginForm: LoginForm) {
    //console.log(loginForm);
    try {
        const response = await fetch(`${URL_API}/users/sign-in`, {
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
        //console.log(result);
        return result;
        // Ici, tu peux rediriger l'utilisateur ou sauvegarder les informations de l'utilisateur (sans le mot de passe) dans le localStorage/sessionStorage par exemple.
    } catch (error: any) { // Spécifier le type d'erreur comme `any`
        console.error('Erreur lors de la connexion', error);
        alert(error.message);
    }
}

