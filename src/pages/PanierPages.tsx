import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import './PanierPages.css'
import { BsFillTrash3Fill } from "react-icons/bs";

interface CartItem {
    id: number;
    libelle: string;
    prix: number;
    quantite: number;
}

const PanierPages: React.FC = () => {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);

    useEffect(() => {
        const cartData = localStorage.getItem("cart");
        if (cartData) {
            const cartItemsArray: CartItem[] = [];
            const cartObject = JSON.parse(cartData);
            for (const key in cartObject) {
                const [id, libelle, prixStr] = key.split("/");
                const prix = parseFloat(prixStr);
                const quantite = cartObject[key];
                cartItemsArray.push({ id: parseInt(id), libelle, prix, quantite });
            }
            setCartItems(cartItemsArray);
        }
    }, []);

    const calculateItemTotal = (item: CartItem): number => {
        return parseFloat((item.prix * item.quantite).toFixed(2));
    };

    const calculateTotal = (): number => {
        const total = cartItems.reduce((total, item) => total + calculateItemTotal(item), 0);
        return parseFloat(total.toFixed(2));
    };

    const removeItem = (id: number) => {
        const updatedCartItems = cartItems.map(item => {
            if (item.id === id && item.quantite > 0) {
                const updatedQuantite = item.quantite - 1;
                if (updatedQuantite === 0) {
                    // Supprimer l'article du localStorage si la quantité devient 0
                    localStorage.removeItem(`cart/${item.id}/${item.libelle}/${item.prix}`);
                    return null; // Retourne null pour exclure l'article du panier mis à jour
                } else {
                    localStorage.setItem(`cart/${item.id}/${item.libelle}/${item.prix}`, updatedQuantite.toString());
                    return { ...item, quantite: updatedQuantite };
                }
            }
            return item;
        }).filter(item => item !== null) as CartItem[]; // Filtre les éléments null
        setCartItems(updatedCartItems);
    };

    return (
        <Layout>
            <h1 className="TitreProduits">Ma Commande : </h1>
            <div className="AllP">
                <div className="LeftP">
                    <div className="AllProduit">
                        <h3>Mon Panier :</h3>
                        {cartItems.map((item, index) => (
                            <div key={index} className="UnProduit">
                                <div>Libellé: {item.libelle}</div>
                                <div>Prix unitaire: {item.prix}€</div>
                                <div className="QuantitéTrash">
                                    <div>Quantité: {item.quantite}</div>
                                    <BsFillTrash3Fill className="Icons" onClick={() => removeItem(item.id)} />
                                </div>
                                <div>Total pour cet article: {calculateItemTotal(item)}€</div>
                            </div>
                        ))}
                    </div>
                    <div>Total général : {calculateTotal()}€</div>
                </div>
                <div className="RightP">
                </div>
            </div>
        </Layout>
    );
};

export default PanierPages;
