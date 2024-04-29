import React, { useState } from "react";
import './ModalePaiement.css';
import { FetchPaiement } from "../class/paiements";

interface ModalePaiementProps {
    onClose: () => void;
}

const ModalePaiement: React.FC<ModalePaiementProps> = ({ onClose }) => {
    const [cardNumber, setCardNumber] = useState("");
    const [cvv, setCvv] = useState("");
    const [expiryDate, setExpiryDate] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            // Appel à FetchPaiement avec la date et l'heure actuelles et "Réussi" comme état
            await FetchPaiement({ datePaiement: new Date().toISOString(), Etat: "Réussi" });

            console.log("Paiement effectué avec succès.");

            // Fermer la modale après la soumission réussie
            onClose();
        } catch (error) {
            console.error("Erreur lors du paiement:", error);
            // Gérer l'erreur ici
        }
    };

    return (
        <div className="modal2">
            <div className="modal2-content">
                <p>Adresse ajoutée</p>
                <h2>Paiement de la commande</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <input type="number" placeholder="Numéro de carte" required className="input-formP" value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <input type="date" placeholder="Date d'expiration" required className="input-formP" value={expiryDate} onChange={(e) => setExpiryDate(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <input type="number" placeholder="CVV" required className="input-formP" value={cvv} onChange={(e) => setCvv(e.target.value)} />
                    </div>
                    <button type="submit">Payer</button>
                    <button onClick={onClose}>Annuler</button>
                </form>
            </div>
        </div>
    );
};

export default ModalePaiement;
