import React, { ReactNode } from 'react';
import './Layout.css'
import Logo from '../../assets/LogoNexusNode.png';
import {Link} from "react-router-dom";
import Paniers from '../../assets/icons8-panier-90.png';
import { CgProfile } from "react-icons/cg";
import { FaBasketShopping } from "react-icons/fa6";
import {getInfoUser} from '../../class/user'

interface LayoutProps {
    children: ReactNode;
}

interface UserInfo {
    auth: boolean;
    token: string;
    info: {
        id: number;
        role: number;
        nom: string;
        mail: string;
        prenom: string;
    };
}
if (sessionStorage.getItem('user') !==null){
    const storage = sessionStorage.getItem('user');
    if (storage) {
        const userObject: UserInfo = JSON.parse(storage); // Assure-toi que le JSON correspond à l'interface
        console.log('salut toi', userObject.info);
    }
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
                        <FaBasketShopping size={40} className="Icons"></FaBasketShopping>
                    </div>
                    <div className="ProfilN">
                        <CgProfile size={40} className="Icons"></CgProfile>
                    </div>
                </div>
            </header>
            {children}
        </div>
    );
};

export default Layout;
