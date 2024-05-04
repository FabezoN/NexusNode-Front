import React, {useState} from 'react';
import './form.css';
import Logo from '../assets/LogoNexusNode.png';
import {registerUser} from '../class/user';
import {NavLink, useNavigate} from "react-router-dom";

const Register: React.FC = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        nom: '',
        prenom: '',
        email: '',
        password: '',
        role: 1,
    });
    const [formPassword, setFormPassword] = useState({
        confirmPassword: '',
    });
    const [passwordsMatch, setPasswordsMatch] = useState(true);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        if (name === 'confirmPassword') {
            setFormPassword({...formPassword, [name]: value});
        } else {
            setFormData({...formData, [name]: value});
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (formData.password === formPassword.confirmPassword) {
            registerUser(formData);
            setFormData({
                nom: '',
                prenom: '',
                email: '',
                password: '',
                role: 1,
            });
            setFormPassword({
                confirmPassword: '',
            });
            setPasswordsMatch(true);
            navigate('/login');
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
                    <input className="input-form" type="text" id="firstName" name="prenom" value={formData.prenom}
                           onChange={handleChange} required placeholder="Prénom"/>
                </div>
                <div className="object-form">
                    <input className="input-form" type="text" id="lastName" name="nom" value={formData.nom}
                           onChange={handleChange} required placeholder="Nom"/>
                </div>
                <div className="object-form">
                    <input className="input-form" type="password" id="password" name="password"
                           value={formData.password} onChange={handleChange} required placeholder="Mot de passe"/>
                </div>
                <div className="object-form">
                    <input className="input-form" type="password" id="confirmPassword" name="confirmPassword"
                           value={formPassword.confirmPassword} onChange={handleChange} required
                           placeholder="Confirmez le mot de passe"/>
                </div>
                {!passwordsMatch && <p style={{color: 'red'}}>Les mots de passe ne correspondent pas.</p>}
                    <button type="submit" className="submit-form">S'inscrire</button>

            </form>
        </div>
    );
};

export default Register;
