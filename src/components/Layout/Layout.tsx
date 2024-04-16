import React, { useState, useEffect } from 'react';
import './Layout.css';
import Logo from '../../assets/LogoNexusNode.png';
import { Link, NavLink } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { FaBasketShopping } from "react-icons/fa6";


interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
    const [userRole, setUserRole] = useState<number | null>(null);

    useEffect(() => {
        const storage = sessionStorage.getItem('user');
        if (storage) {
            const userObject = JSON.parse(storage);
            setUserRole(userObject.info.role);
        }
    }, []);

    return (
        <div>
            <header>
                <div className="LogoN">
                    <Link to="/">
                        <img alt="Logo" className="Logo" src={Logo} />
                    </Link>
                </div>
                <div className="Nom">
                    <p className="Nexusnode">Nexus Node</p>
                </div>
                <div className="Right">
                    <div className="SearchBar">
                        <input className="InputS" placeholder="Rechercher un produit" />
                    </div>
                    <div className="PanierN">
                        <FaBasketShopping size={40} className="Icons" />
                    </div>
                    <div className="ProfilN"
                         onMouseEnter={() => userRole && setIsProfileMenuOpen(true)}
                         onMouseLeave={() => setIsProfileMenuOpen(false)}>
                        {userRole ? (
                            <React.Fragment>
                                <CgProfile size={40} className="Icons" />
                                {isProfileMenuOpen && (
                                    <div className="ProfileMenu">
                                        {userRole === 1 && (
                                            <React.Fragment>
                                                <NavLink to="/profile" className="MenuOption">Profil</NavLink>
                                                <NavLink to="/login" className="MenuOption">Déconnexion</NavLink>
                                            </React.Fragment>
                                        )}
                                        {userRole === 2 && (
                                            <React.Fragment>
                                                <NavLink to="/adminpage" className="MenuOption">Panel</NavLink>
                                                <NavLink to="/login" className="MenuOption">Déconnexion</NavLink>
                                            </React.Fragment>
                                        )}
                                    </div>
                                )}
                            </React.Fragment>
                        ) : (
                            <NavLink to="/login">
                                <CgProfile size={40} className="Icons" />
                            </NavLink>
                        )}

                    </div>
                </div>
            </header>
            {children}
        </div>
    );
};

export default Layout;
