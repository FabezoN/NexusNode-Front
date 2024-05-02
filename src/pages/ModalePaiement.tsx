import React, { useState } from "react";
import './ModalePaiement.css';
import { FetchPaiement } from "../class/paiements";
import { PostCommande } from "../class/commande";
import {URL_API} from '../env'
import {useNavigate} from "react-router-dom";


interface ModalePaiementProps {
    onClose: () => void;
    onPaymentSuccess: (idAdresse: number) => void;
    idAdresse: number;
    idUser: number;
}

const ModalePaiement: React.FC<ModalePaiementProps> = ({ onClose, onPaymentSuccess, idAdresse,idUser }) => { // Ajouter idAdresse comme argument
    const [cardNumber, setCardNumber] = useState("");
    const [cvv, setCvv] = useState("");
    const [expiryDate, setExpiryDate] = useState("");
    const navigate = useNavigate(); // Utilise useNavigate pour la navigation

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const formattedDate = new Date().toISOString().slice(0, 19).replace('T', ' ');
            const etat = "Réussi";
            const paiementResponse = await FetchPaiement({ datePaiement: formattedDate, Etat: etat });

            if (paiementResponse && paiementResponse.idPaiement) {
                // Génération du nom de la facture
                const userStorage = sessionStorage.getItem("user");
                let nomFacture = "";

                if (userStorage) {
                    const userObject = JSON.parse(userStorage);
                    const nom = userObject.info.nom;
                    const date = new Date();
                    const formattedDate = date.toISOString().replace(/-/g, "").replace(/:/g, "").replace(".", "").replace("T", ""); // Formatage de la date pour enlever les caractères spéciaux
                    nomFacture = `${nom}_${formattedDate}`;
                } else {
                    throw new Error("Données utilisateur introuvables dans le stockage de session.");
                }

                const idPaiement = paiementResponse.idPaiement;
                const cheminFacture = `/factures/${nomFacture}.pdf`;

                await PostCommande({ dateCommande: formattedDate, nomFacture, cheminFacture, idPaiement, idAdresse, idUser });
                onClose(); // Supposons que onClose est une fonction pour fermer le formulaire de paiement
                localStorage.clear();
                onPaymentSuccess(idAdresse); // Supposons que c'est une fonction de gestion après paiement réussi
                const pathFacture = `${URL_API}/Factures/${nomFacture}.pdf`
                // Ouverture de la nouvelle fenêtre avec la facture PDF
                navigate('/panier');

                window.open(pathFacture, '_blank');
            } else {
                throw new Error("La réponse de FetchPaiement est vide ou ne contient pas d'éléments.");
            }
        } catch (error) {
            console.error("Erreur lors du paiement:", error);
        }
    };








    return (
        <div className="modal2">
            <div className="modal2-content">
                <p>Adresse ajoutée</p>
                <h2>Paiement de la commande</h2>
                <form>
                    <div className="form-group">
                        <input type="number" placeholder="Numéro de carte" required className="input-formP" value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <input type="date" placeholder="Date d'expiration" required className="input-formP" value={expiryDate} onChange={(e) => setExpiryDate(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <input type="number" placeholder="CVV" required className="input-formP" value={cvv} onChange={(e) => setCvv(e.target.value)} />
                    </div>
                    <button type="submit" onClick={handleSubmit}>Payer</button>
                    <button onClick={onClose}>Annuler</button>
                </form>
            </div>
        </div>
    );
};

export default ModalePaiement;
