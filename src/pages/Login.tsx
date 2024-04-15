import React, {useState} from 'react';
import './form.css'
import Logo from "../assets/LogoNexusNode.png";
import {loginUser} from "../class/user";
import {useNavigate} from "react-router-dom";

const LoginForm: React.FC = () => {
    const [LoginForm, setFormData] = useState({
        email: '',
        password: ''
    });
    const navigate = useNavigate(); // Utilise useNavigate pour la navigation
    const [errorMessage, setErrorMessage] = React.useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setFormData({...LoginForm, [name]: value});
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMessage('');
        try {
            // Envoi des données du formulaire
            const data = await loginUser(LoginForm);
            // Réinitialisation du formulaire
            const role = data.info.role
            setFormData({
                email: '',
                password: ''
            });
            sessionStorage.setItem('user', JSON.stringify(data)); // Adapte cette ligne si nécessaire

            if(role ==1 ){ /** If user role is 1 we should return HomePage */
                navigate('/');
            }
            if(role ==2 ){ /** If user role is 2 we should returne AdminPage */
            navigate('/AdminPage');
            }
            if(role ==3 ){ /** If user role is 3 we should returne SupportPage */
            navigate('/SupportPage');
            }
            navigate('/');
        } catch (error) {
            console.error('Erreur lors de la connexion:', error);
            // Gérer l'erreur ici, par exemple, afficher un message d'erreur à l'utilisateur
            setErrorMessage('Erreur lors de la connexion. Veuillez réessayer.');
        }
    };

    return (
        <div className="Login">
            <div className="TopForm">
                <img alt="Logo" className="Logohere" src={Logo}></img>
                <h1>Nexus Node</h1>
            </div>
            <form onSubmit={handleSubmit}>
                <h2 className="Titre">Se connecter</h2>
                <div className="object-form">
                    <input className="input-form" type="email" id="email" name="email" value={LoginForm.email}
                           onChange={handleChange} required placeholder="Email"/>
                </div>
                <div className="object-form">
                    <input className="input-form" type="password" id="password" name="password"
                           value={LoginForm.password} onChange={handleChange} required placeholder="Mot de passe"/>
                </div>
                <button type="submit">Se connecter</button>
            </form>
        </div>
    );
};

export default LoginForm;
