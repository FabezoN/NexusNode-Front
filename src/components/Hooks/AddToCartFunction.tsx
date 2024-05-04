import React, { useState } from "react";
import { HiShoppingCart } from "react-icons/hi";

interface AddToCartFunctionProps {
    productId: number;
    selectedQuantity: number;
    libelleId: string;
    prix: number;
}

const AddToCartFunction: React.FC<AddToCartFunctionProps> = ({ productId, selectedQuantity, libelleId, prix }) => {
    const [showPopup, setShowPopup] = useState(false);

    const addToCart = () => {
        const existingCart = JSON.parse(localStorage.getItem("cart") || "{}");
        const cartKey = `${productId}/${libelleId}/${prix}`;
        const updatedCart = {
            ...existingCart,
            [cartKey]: (existingCart[cartKey] || 0) + selectedQuantity
        };
        localStorage.setItem("cart", JSON.stringify(updatedCart));
        setShowPopup(true);
        setTimeout(() => {
            setShowPopup(false);
        }, 2000);
    };

    return (
        <div className="add-to-cart-container">
            <HiShoppingCart onClick={addToCart} size={25} className="Icons" />
            {showPopup && (
                <div className="popup-container">
                    <div className="popup">
                        <p>Article ajouté au panier</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AddToCartFunction;
