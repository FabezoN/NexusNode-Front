import React, { useState } from 'react';
import './form.css'
import Logo from "../assets/LogoNexusNode.png";

const LoginForm: React.FC = () => {
    const [LoginForm, setFormData] = useState({
        email: '',
        password: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...LoginForm, [name]: value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Envoi des données du formulaire
        console.log('Formulaire soumis :', LoginForm);
        // Réinitialisation du formulaire
        setFormData({
            email: '',
            password: ''
        });
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
