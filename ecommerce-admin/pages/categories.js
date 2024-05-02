import Layout from "@/components/layout";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Categories() {
    const [name, setName] = useState('');
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
        await axios.post('/api/categories', { name });
        setName('');
        fetchCategories();
    }
    return (
        <Layout>
            <h1>Catégories</h1>
            <label>nom de la nouvelle Catégories</label>
            <form onSubmit={saveCategories} className="flex gap-1">
                <input
                    className="mb-0"
                    type="text"
                    placeholder={"Nom de la catégories"}
                    onChange={ev => setName(ev.target.value)}
                    value={name}
                />
                <select className="mb-0">
                    <option value="0">catégories sans parents</option>
                    {categories.length > 0 && categories.map
                        (categorie => (

                            <option value={categorie._id}>{categorie.name}</option> 

                        ))}
                </select>
                <button type="submit" className="btn-primary py-1">Sauvegarder</button>
            </form>

            <table className="basic mt-4">
                <thead>
                    <tr>
                        <td>Nom de la catégories</td>
                    </tr>
                </thead>
                <tbody>
                    {categories.length > 0 && categories.map
                        (categorie => (

                            <tr>
                                <td>{categorie.name}</td>
                            </tr>

                        ))}
                </tbody>
            </table>
        </Layout>
    );
}
