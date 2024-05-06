import Layout from "@/components/layout";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Categories() {
    const [editedCategorie, setEditedCategorie] = useState(null);
    const [name, setName] = useState('');
    const [parentCategorie, setParentCategorie] = useState('');
    const [categories, setCategories] = useState([]);
    useEffect(() => {
        fetchCategories();
    }, []);
    function fetchCategories() {
        axios.get('/api/categories').then(result => {
            setCategories(result.data);
        });
    }
    async function saveCategories(ev) {
        ev.preventDefault();
        const data = { name, parentCategorie };

        if (editedCategorie) {
            data._id = editedCategorie._id;
            await axios.put('/api/categories', data);
            setEditedCategorie(null);
        } else {
            await axios.post('/api/categories', data);
        }

        setName('');
        fetchCategories();
    }
    function editCategorie(categorie) {
        setEditedCategorie(categorie);
        setName(categorie.name);
        setParentCategorie(categorie.parent?._id);
    }
    return (
        <Layout>
            <h1>Catégories</h1>
            <label>{editedCategorie
                ? `Modifier categorie ${editedCategorie.name}`
                : 'Ajouté une nouvelle catégorie'}
            </label>
            <form onSubmit={saveCategories} className="flex gap-1">
                <input
                    className="mb-0"
                    type="text"
                    placeholder={"Nom de la catégories"}
                    onChange={ev => setName(ev.target.value)}
                    value={name}
                />
                <select className="mb-0"
                    onChange={ev => setParentCategorie(ev.target.value)}
                    value={parentCategorie}>
                    <option value="">catégories sans parents</option>
                    {categories.length > 0 && categories.map
                        (categorie => (

                            <option value={categorie._id}>{categorie.name}</option>

                        ))};
                </select>
                <button type="submit" className="btn-primary py-1">Sauvegarder</button>
            </form>

            <table className="basic mt-4">
                <thead>
                    <tr>
                        <td>Nom de la catégories</td>
                        <td>parent de la catégorie</td>
                        <td></td>
                    </tr>
                </thead>
                <tbody>
                    {categories.length > 0 && categories.map
                        (categorie => (

                            <tr>
                                <td>{categorie.name}</td>
                                <td>{categorie?.parent?.name}</td>
                                <td>
                                    <button
                                        onClick={() => editCategorie(categorie)}
                                        className="btn-primary mr-1"
                                    >Modifier</button>
                                    <button
                                        className="btn-primary mr-1"
                                    >Supprimer</button>
                                </td>
                            </tr>

                        ))}
                </tbody>
            </table>
        </Layout>
    );
}
