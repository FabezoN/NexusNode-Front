import React, { useEffect, useState, ChangeEvent } from 'react';
import Layout from '../components/Layout/Layout';
import { NavLink } from 'react-router-dom';
import { fetchProduits, getCategorie, getCategorieById, saveProduct } from '../class/produit';
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

    useEffect(() => {
        const initFetch = async () => {
            setProduits(await fetchProduits());
            setCategorie(await getCategorie());
        };
        initFetch();
    }, []);

    const handleRowClick = (product: any) => {
        setSelectedProduct(product);
        setFormData(product);
    };

    const handleCloseModal = () => {
        setSelectedProduct(null);
    };

    const handleFormChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement> | Date) => {
        if (typeof e === 'object' && e !== null && 'target' in e) {
            const {name, value} = e.target;
            setFormData((prevState: any) => ({
                ...prevState,
                [name]: value
            }));
        } else {
            setFormData((prevState: any) => ({
                ...prevState,
                dateSortie: e ? e.toISOString() : null
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
        const updatedProduct = {
            ...selectedProduct,
            image: imageFile ? `${formData.idCategorie}_${selectedProduct.idMateriel}` : selectedProduct.image,
            PATH_Image: imageFile ? `/${formData.libelle}/${formData.idCategorie}_${selectedProduct.idMateriel}` : selectedProduct.PATH_Image,
            dateSortie: formData.dateSortie || selectedProduct.dateSortie,
            description: formData.description || selectedProduct.description,
            prix: formData.prix || selectedProduct.prix,
            id_Categorie: formData.idCategorie || selectedProduct.id_Categorie,
            materiel_libelle: formData.materiel_libelle || selectedProduct.materiel_libelle
        };

        console.log('Produit mis à jour:', updatedProduct);
        setFormData({});
        setSelectedProduct(null);
        setImageFile(null);
    };

    const handleCategorieChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const selectedId = e.target.value;
        const cat = categorie.find(c => c.idCategorie === selectedId);
        setSelectedCategorie(cat);
        setNewCategorieName(cat ? cat.libelle : "");
    };

    const handleSaveCategorie = async () => {
        if (selectedCategorie) {
            //await saveCategorie({ ...selectedCategorie, libelle: newCategorieName });
        } else {
            //  await saveCategorie({ libelle: newCategorieName });
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
            setNewCategorieName(''); // Vide le champ si aucune catégorie n'est trouvée
            setSelectedCategorie(null);
        }
    };


    return (
        <Layout>
            <h2 className="titre">Page Produits</h2>
            <NavLink to="/adminpage">
                <button>Retour</button>
            </NavLink>
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
                        <td>{new Date(produit.dateSortie).toLocaleDateString()}</td>
                    </tr>
                ))}
                </tbody>
            </table>

            <Modal isOpen={selectedProduct !== null} onClose={handleCloseModal}>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="libelle">Libellé:</label>
                        <input type="text" id="libelle" name="materiel_libelle" value={formData.materiel_libelle}
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
                </form>
            </Modal>
        </Layout>
    );
}

export default AdminProduit;
