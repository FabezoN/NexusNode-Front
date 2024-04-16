import React, {ReactNode} from 'react';
import './Layout.css'
import Logo from '../../assets/LogoNexusNode.png';
import {Link, NavLink} from "react-router-dom";
import {CgProfile} from "react-icons/cg";
import {FaBasketShopping} from "react-icons/fa6";

interface LayoutProps {
    children: ReactNode;
}
if (sessionStorage.getItem('user') !== null) {
    const storage = sessionStorage.getItem('user');
    if (storage !== null) { // Vérifie que storage n'est pas null avant de continuer
        const userObject = JSON.parse(storage); // Maintenant sûr que storage est une chaîne non-nulle
        const idUser = userObject.info; // Accéder à la propriété id dans l'objet info
    }
}

const Layout: React.FC<LayoutProps> = ({children}) => {
    return (
        <div>
            <header>
                <div className="LogoN">
                    <Link to="/">
                        <img alt="Logo" className="Logo" src={Logo}></img>
                    </Link>
                </div>
                <div className="Nom">
                    <p className="Nexusnode">Nexus Node</p>
                </div>
                <div className="Right">
                    <div className="SearchBar">
                        <input className="InputS" placeholder="Rechercher un produit"></input>
                    </div>
                    <div className="PanierN">
                        <FaBasketShopping size={40} className="Icons"></FaBasketShopping>
                    </div>
                    <div className="ProfilN">
                        <NavLink to="/login">
                            <CgProfile size={40} className="Icons" ></CgProfile>
                        </NavLink>
                    </div>
                </div>
            </header>
            {children}
        </div>
    );
};

export default Layout;
