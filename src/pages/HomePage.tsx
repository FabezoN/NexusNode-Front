// HomePage.tsx
import React from "react";
import Layout from "../components /Layout/Layout";
import './HomePage.css'

const HomePage: React.FC = () => {
    return (
        <Layout>
            <div>
                <h1>Home Page</h1>
                <h2>Ceci est la page d'accueil</h2>
            </div>
        </Layout>
    );
};

export default HomePage;
