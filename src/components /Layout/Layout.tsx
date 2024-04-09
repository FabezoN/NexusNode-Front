import React, { ReactNode } from 'react';
import './Layout.css'
import Logo from '../../assets/LogoNexusNode.png';
import {Link} from "react-router-dom";
import Paniers from '../../assets/icons8-panier-90.png'
import Profils from '../../assets/icons8-utilisateur-90.png';


interface LayoutProps {
    children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
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
                        <img alt="Panier" className="Panier" src={Paniers}></img>
                    </div>
                    <div className="ProfilN">
                        <img alt="Profil" className="Profil" src={Profils}></img>
                    </div>
                </div>
            </header>
            {children}
        </div>
    );
};

export default Layout;
