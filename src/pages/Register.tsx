import React, { useState } from 'react';
import './Register.css';

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
            <h1>S'enregister</h1>
        <form onSubmit={handleSubmit}>
            <div>
                <input className="input-form" type="email" id="email" name="email" value={formData.email} onChange={handleChange} required placeholder="Email" />
            </div>
            <div>
                <input className="input-form" type="text" id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} required placeholder="Prénom" />
            </div>
            <div>
                <input className="input-form" type="text" id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} required placeholder="Nom"/>
            </div>
            <div>
                <input className="input-form" type="password" id="password" name="password" value={formData.password} onChange={handleChange} required placeholder="Mot de passe" />
            </div>
            <div>
                <input className="input-form" type="password" id="confirmPassword" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required placeholder="Confirmez le mot de passe" />
            </div>
            {!passwordsMatch && <p style={{ color: 'red' }}>Les mots de passe ne correspondent pas.</p>}
            <button type="submit" className="submit-form">S'inscrire</button>
        </form>
        </div>
    );
};

export default Register;
