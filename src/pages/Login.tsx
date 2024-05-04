import React, { useState } from 'react';
import './form.css'
import Logo from "../assets/LogoNexusNode.png";
import {loginUser, registerUser} from "../class/user";
import {NavLink, useNavigate} from "react-router-dom";

const LoginForm: React.FC = () => {
    sessionStorage.clear();
    const [LoginForm, setFormData] = useState({
        email: '',
        password: ''
    });
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = React.useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...LoginForm, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        sessionStorage.clear();
        localStorage.clear();
        e.preventDefault();
        setErrorMessage('');
        try {
           const data =  await loginUser(LoginForm);
           if(data !== undefined){
               const user = JSON.stringify(data);
               sessionStorage.setItem('user', user);
               setFormData({
                   email: '',
                   password: ''
               });
               navigate('/');
           }
        } catch (error) {
            console.error('Erreur lors de la connexion:', error);
            navigate('/login');
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
                <NavLink to="/register">
                    <button> S'inscrire</button>
                </NavLink>
            </form>
        </div>
    );
};

export default LoginForm;
