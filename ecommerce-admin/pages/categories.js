import Layout from "@/components/layout";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Categories() {
    const [editedCategorie, setEditedCategorie] = useState(null);
    const [name, setName] = useState('');
    const [parentCategorie, setParentCategorie] = useState('');
    const [categories, setCategories] = useState([]);
    const [proprietes, setProprietes] = useState([]);

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
        const data = {
            name, proprietes: proprietes.map(p => ({
                name: p.name, values: p.values.split(','),
            }))
        };

        if (parentCategorie) {
            data.parentCategorie = parentCategorie;
        }

        if (editedCategorie) {
            data._id = editedCategorie._id;
            await axios.put('/api/categories', data);
            setEditedCategorie(null);
        } else {
            await axios.post('/api/categories', data);
        }

        setName('');
        setParentCategorie('');
        setProprietes([]);
        fetchCategories();
    }
    async function deleteCategorie(categorieId) {
        if (window.confirm('Vous voulez vraiment supprimer la catégorie ?')) {
        await axios.delete(`/api/categories?id=${categorieId}`);
        fetchCategories();
        }
    }

    function editCategorie(categorie) {
        setEditedCategorie(categorie);
        setName(categorie.name);
        setParentCategorie(categorie.parent ? categorie.parent._id : '');
        setProprietes(categorie.proprietes.map(({ name, values }) => ({
            name,
            values: values.join(',')
        }))
        );
    }
    function addProprietes() {
        setProprietes(prev => {
            return [...prev, { name: '', value: '' }];
        });
    }
    function handleProprieteNameChange(index, propriete, newName) {
        setProprietes(prev => {
            const proprietes = [...prev];
            proprietes[index].name = newName;
            return proprietes;
        });
    }
    function handleProprieteValuesChange(index, propriete, newValues) {
        setProprietes(prev => {
            const proprietes = [...prev];
            proprietes[index].values = newValues;
            return proprietes;
        });
    }
    function removePropriete(indexToRemove) {
        if (window.confirm('Vous voulez vraiment supprimer la catégorie ?')) {
            setProprietes(prev => {
                return [...prev].filter((p, pIndex) => {
                    return pIndex !== indexToRemove;
                });
                return newProprietes;
            }); 
        }
    }

    return (
        <Layout>
            <h1>Catégories</h1>
            <label>{editedCategorie
                ? `Modifier categorie ${editedCategorie.name}`
                : 'Ajouté une nouvelle catégorie'}
            </label>
            <form onSubmit={saveCategories}>
                <div className="flex gap-1">
                    <input
                        type="text"
                        placeholder={"Nom de la catégories"}
                        onChange={ev => setName(ev.target.value)}
                        value={name}
                    />
                    <select
                        onChange={ev => setParentCategorie(ev.target.value)}
                        value={parentCategorie}
                    >
                        <option value="">Catégories sans parent</option>
                        {categories.length > 0 && categories.map(categorie => (
                            <option value={categorie._id}>{categorie.name}</option>
                        ))}
                    </select>
                </div>

                <div className="mb-2">
                    <label className="block">Propriétés</label>
                    <button
                        onClick={addProprietes}
                        type="button"
                        className="btn-default mb-2">
                        ajouté une propriété
                    </button>
                    {proprietes.length > 0 && proprietes.map
                        ((propriete, index) => (
                            <div className="flex gap-1">
                                <input type="text"
                                    value={propriete.name}
                                    onChange={ev => handleProprieteNameChange(index, propriete, ev.target.value)}
                                    placeholder="nom de la propriété">
                                </input>
                                <input type="text"
                                    onChange={ev => handleProprieteValuesChange(index, propriete, ev.target.value)}
                                    value={propriete.values}
                                    placeholder="Valeurs">
                                </input>
                                <button
                                    onClick={() => removePropriete(index)}
                                    className="btn-default mb-2"
                                >Supprimer</button>
                            </div>
                        ))}
                </div>

                <div className="flex gap-1">
                    {editedCategorie && (
                        <button
                            onClick={() => {
                                setEditedCategorie(null);
                                setName('');
                                setParentCategorie('');
                                setProprietes([]);
                            }}
                            type="button"
                            className="btn-default py-1">Retour</button>
                    )}
                    <button type="submit" className="btn-primary py-1">Sauvegarder</button>
                </div>

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
                                        onClick={() => deleteCategorie(categorie._id)} 
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
