import React, { useEffect, useState, ChangeEvent } from 'react';
import Layout from '../components/Layout/Layout';
import { NavLink } from 'react-router-dom';
import { fetchProduits, getCategorie, getCategorieById, updateCategorie, addCategorie, deleteCategorie, saveProduct, addProduct } from '../class/produit';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Modal from '../components/Modal/Modal';

const AdminProduit: React.FC = () => {
    const [produits, setProduits] = useState<any[]>([]);
    const [categorie, setCategorie] = useState<any[]>([]);
    const [selectedProduct, setSelectedProduct] = useState<any | null>(null);
    const [formData, setFormData] = useState<any>({});
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [showCategorieModal, setShowCategorieModal] = useState<boolean>(false);
    const [selectedCategorie, setSelectedCategorie] = useState<any | null>(null);
    const [newCategorieName, setNewCategorieName] = useState<string>("");
    const [showAddProductModal, setShowAddProductModal] = useState<boolean>(false);
    const [newProductFormData, setNewProductFormData] = useState<any>({});

    useEffect(() => {
        const initFetch = async () => {
            setProduits(await fetchProduits());
            setCategorie(await getCategorie());
        };
        initFetch();
    }, []);

    const handleRowClick = (product: any) => {
        setImageFile(null)
        setSelectedProduct(product);
        setFormData(product);
    };

    const handleCloseModal = () => {
        setSelectedProduct(null);
    };

    const handleFormChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement> | Date) => {
        if (typeof e === 'object' && e !== null && 'target' in e) {
            const { name, value } = e.target;
            setFormData((prevState: any) => ({
                ...prevState,
                [name]: value
            }));
        } else {
            // Si la date est passée depuis le DatePicker, convertissez-la directement en chaîne de caractères
            const dateString = e ? e.toISOString() : ''; // Convertir en chaîne de caractères
            setFormData((prevState: any) => ({
                ...prevState,
                dateSortie: dateString
            }));
        }
    };


    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setImageFile(e.target.files[0]);
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!selectedProduct) {
            console.error('Aucun produit sélectionné.');
            return;
        }

        try {
            const formData = new FormData(e.currentTarget);

            // Récupérer la valeur de la date depuis le DatePicker et la formater au format souhaité
            const dateSortie = formData.get('dateSortie') as string; // Récupérer la date au format ISO
            const formattedDate = dateSortie ? new Date(dateSortie).toLocaleDateString() : ''; // Formater la date

            // Créer un objet JSON à partir des données du formulaire
            const productData: any = {
                idMateriel: selectedProduct.idMateriel,
                libelle: formData.get('libelle')?.toString() || '',
                description: formData.get('description')?.toString() || '',
                prix: formData.get('prix')?.toString() || '',
                dateSortie: formattedDate, // Utiliser la date formatée
                idCategorie: formData.get('idCategorie')?.toString() || selectedProduct.id_Categorie,
                image: imageFile !== null ? imageFile : undefined
            };

            const response = await saveProduct(productData);

            setFormData({});
            setSelectedProduct(null);
            setImageFile(null);
        } catch (error) {
            console.error('Erreur lors de la modification du produit:', error);
        }
    };


    const handleSaveCategorie = async () => {
        if (selectedCategorie[0]) {
            await updateCategorie(selectedCategorie[0].idCategorie,newCategorieName);
            setNewCategorieName('');
        } else {
            await addCategorie(newCategorieName);
            setNewCategorieName('');
        }
        setCategorie(await getCategorie());
        setShowCategorieModal(false);
    };

    const setuneCategorie = async (e: ChangeEvent<HTMLSelectElement>) => {
        const idCategorie = e.target.value;
        const dataCategorie = await getCategorieById(idCategorie);

        if (dataCategorie && dataCategorie[0].libelle) {
            setNewCategorieName(dataCategorie[0].libelle);
            setSelectedCategorie(dataCategorie);
        } else {
            setNewCategorieName('');
            setSelectedCategorie(null);
        }
    };

    const handleDeleteCategorie = async () => {
        if (selectedCategorie) {
            await deleteCategorie(selectedCategorie[0].idCategorie);
            setCategorie(await getCategorie());
            setNewCategorieName('');
            setSelectedCategorie(null);
        } else {
            console.error('Aucune catégorie sélectionnée pour la suppression.');
        }
    };

    const toggleAddProductModal = () => {
        setShowAddProductModal(!showAddProductModal);
    };

    return (
        <Layout>
            <h2 className="titre">Page Produits</h2>
            <NavLink to="/adminpage">
                <button>Retour</button>
            </NavLink>
            <button onClick={toggleAddProductModal}>Ajouter</button>

            <table>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Libellé</th>
                    <th>Prix</th>
                    <th>Catégorie</th>
                    <th>Date de sortie</th>
                </tr>
                </thead>
                <tbody>
                {produits.map(produit => (
                    <tr key={produit.idMateriel} onClick={() => handleRowClick(produit)}>
                        <td>{produit.idMateriel}</td>
                        <td>{produit.materiel_libelle}</td>
                        <td>{produit.prix}</td>
                        <td>{produit.categorie_libelle}</td>
                        <td>{new Date(produit.dateSortie).toLocaleDateString()}</td>
                    </tr>
                ))}
                </tbody>
            </table>

            <Modal isOpen={selectedProduct !== null} onClose={handleCloseModal}>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="libelle">Libellé:</label>
                        <input type="text" id="libelle" name="libelle" value={formData.materiel_libelle || ''}
                               onChange={handleFormChange}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Description:</label>
                        <textarea
                            id="description"
                            name="description"
                            rows={4}
                            cols={40}
                            value={formData.description || ''}
                            onChange={handleFormChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="prix">Prix:</label>
                        <input type="text" id="prix" name="prix" value={formData.prix || ''}
                               onChange={handleFormChange}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="categorie">Catégorie:</label>
                        <select id="categorie" name="idCategorie" value={formData.idCategorie || ''}
                                onChange={handleFormChange}>
                            {categorie.map((cat) => (
                                <option key={cat.idCategorie} value={cat.idCategorie}>{cat.libelle}</option>
                            ))}
                        </select>
                        <button type="button" onClick={() => setShowCategorieModal(true)}>Gérer les catégories</button>
                    </div>
                    <div className="form-group">
                        <label htmlFor="dateSortie">Date de sortie:</label>
                        <DatePicker
                            id="dateSortie"
                            name="dateSortie"
                            selected={formData.dateSortie ? new Date(formData.dateSortie) : null}
                            onChange={(date: Date) => handleFormChange(date)}
                            dateFormat="dd/MM/yyyy"
                            placeholderText="Sélectionner une date"
                            showYearDropdown
                            scrollableYearDropdown
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="image">Image:</label>
                        <input type="file" id="image" name="image" onChange={handleImageChange}/>
                    </div>
                    <button type="submit">Modifier</button>
                </form>
            </Modal>

            <Modal isOpen={showCategorieModal} onClose={() => setShowCategorieModal(false)}>
                <form onSubmit={(e) => {
                    e.preventDefault();
                    handleSaveCategorie();
                }}>
                    <select id="categorie" name="idCategorie"
                            value={selectedCategorie ? selectedCategorie.idCategorie : ''}
                            onChange={setuneCategorie}>
                        <option value="">Sélectionner une catégorie</option>
                        {categorie.map((cat) => (
                            <option key={cat.idCategorie} value={cat.idCategorie}>{cat.libelle}</option>
                        ))}
                    </select>
                    <label htmlFor="categorieName">Nom de la catégorie:</label>
                    <input
                        type="text"
                        id="categorieName"
                        value={newCategorieName}
                        onChange={(e) => setNewCategorieName(e.target.value)}
                    />
                    <button type="submit">{selectedCategorie ? 'Modifier' : 'Ajouter'}</button>
                    <button type="button" onClick={handleDeleteCategorie} disabled={!selectedCategorie}>
                        Supprimer
                    </button>
                </form>
            </Modal>
        </Layout>
    );
}

export default AdminProduit;
