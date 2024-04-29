import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import './PanierPages.css';
import { BsFillTrash3Fill } from "react-icons/bs";
import { FetchAdresse } from "../class/adresse";
import ModalePaiement from "./ModalePaiement";

interface CartItem {
    id: number;
    libelle: string;
    prix: number;
    quantite: number;
}

const PanierPages: React.FC = () => {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [showModal, setShowModal] = useState(false);
    const [adresseForm, setAdresseForm] = useState({
        rue: '',
        ville: '',
        CDP: '',
        pays: ''
    });
    const [paymentSuccess, setPaymentSuccess] = useState(false);

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
                    localStorage.removeItem(`cart/${item.id}`);
                    return null;
                } else {
                    localStorage.setItem(`cart/${item.id}`, updatedQuantite.toString());
                    return { ...item, quantite: updatedQuantite };
                }
            }
            return item;
        }).filter(item => item !== null) as CartItem[];
        setCartItems(updatedCartItems);
    };

    const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setAdresseForm(prevState => ({ ...prevState, [name]: value }));
    };

    const handlePaymentSuccess = () => {
        setPaymentSuccess(true);
        setShowModal(false);
    };

    const handlePaymentCancel = () => {
        setShowModal(false);
    };

    const handleSubmitAddress = async (e: React.FormEvent) => {
        e.preventDefault(); // Empêcher le comportement par défaut du formulaire
        // Votre logique de validation et de soumission d'adresse ici
        setShowModal(true);
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
                    <h3>Adresse de livraison :</h3>
                    <form className="Formulaire" onSubmit={handleSubmitAddress}>
                        <div className="object-form2">
                            <input className="input-form" type="text" id="rue" name="rue" value={adresseForm.rue} onChange={handleAddressChange} required placeholder="Rue" />
                        </div>
                        <div className="object-form2">
                            <input className="input-form" type="text" id="ville" name="ville" value={adresseForm.ville} onChange={handleAddressChange} required placeholder="Ville" />
                        </div>
                        <div className="object-form2">
                            <input className="input-form" type="text" id="CDP" name="CDP" value={adresseForm.CDP} onChange={handleAddressChange} required placeholder="Code Postal" />
                        </div>
                        <div className="object-form2">
                            <input className="input-form" type="text" id="pays" name="pays" value={adresseForm.pays} onChange={handleAddressChange} required placeholder="Pays" />
                        </div>
                        <button type="submit" >Confirmer mon adresse</button>
                    </form>
                </div>
            </div>
            {showModal && <ModalePaiement onClose={handlePaymentCancel} onPaymentSuccess={handlePaymentSuccess} />}
            {paymentSuccess}
        </Layout>
    );
};

export default PanierPages;
