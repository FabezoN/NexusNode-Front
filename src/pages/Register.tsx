import React, { useState } from 'react';
import './form.css';
import Logo from '../assets/LogoNexusNode.png'

const Register: React.FC = () => {
    const [formData, setFormData] = useState({
        email: '',
        firstName: '',
        lastName: '',
        password: '',
        confirmPassword: ''
    });
    const [passwordsMatch, setPasswordsMatch] = useState(true);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (formData.password === formData.confirmPassword) {
            // Envoi des données du formulaire
            console.log('Formulaire soumis :', formData);
            // Réinitialisation du formulaire
            setFormData({
                email: '',
                firstName: '',
                lastName: '',
                password: '',
                confirmPassword: ''
            });
            setPasswordsMatch(true);
        } else {
            setPasswordsMatch(false);
        }
    };

    return (
        <div className="Register">
            <div className="TopForm">
                <img alt="Logo" className="Logohere" src={Logo}></img>
                <h1>Nexus Node</h1>
            </div>
            <form onSubmit={handleSubmit}>
                <h2 className="Titre">S'enregister</h2>
                <div className="object-form">
                    <input className="input-form" type="email" id="email" name="email" value={formData.email}
                           onChange={handleChange} required placeholder="Email"/>
                </div>
                <div className="object-form">
                    <input className="input-form" type="text" id="firstName" name="firstName" value={formData.firstName}
                           onChange={handleChange} required placeholder="Prénom"/>
                </div>
                <div className="object-form">
                    <input className="input-form" type="text" id="lastName" name="lastName" value={formData.lastName}
                           onChange={handleChange} required placeholder="Nom"/>
                </div>
                <div className="object-form">
                    <input className="input-form" type="password" id="password" name="password"
                           value={formData.password} onChange={handleChange} required placeholder="Mot de passe"/>
                </div>
                <div className="object-form">
                    <input className="input-form" type="password" id="confirmPassword" name="confirmPassword"
                           value={formData.confirmPassword} onChange={handleChange} required
                           placeholder="Confirmez le mot de passe"/>
                </div>
                {!passwordsMatch && <p style={{color: 'red'}}>Les mots de passe ne correspondent pas.</p>}
                <button type="submit" className="submit-form">S'inscrire</button>
            </form>
        </div>
    );
};

export default Register;
