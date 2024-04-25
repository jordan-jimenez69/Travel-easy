import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

export default function ProduitForm({
    _id,
    title: existingtitle,
    description: existingdescription,
    price: existingprice,
    level: existinglevel,
    saison: existingsaison
}) {
    const [title, setTitle] = useState(existingtitle || '');
    const [level, setLevel] = useState(existinglevel || '');
    const [saison, setSaison] = useState(existingsaison || '');
    const [price, setPrice] = useState(existingprice || '');
    const [description, setDescription] = useState(existingdescription || '');
    const [goToProduits, setGoToProduits] = useState(false);
    const router = useRouter();

    async function saveProduct(ev) {
        ev.preventDefault();

        const data = { title, level, price, description, saison };

        if (_id) {
            await axios.put('/api/produits', { ...data, _id });
        } else {
            await axios.post('/api/produits', data);
        }
        setGoToProduits(true);
    }
    if (goToProduits) {
        router.push('/produits');
    }

    return (
        <form onSubmit={saveProduct}>

            <div className="form-group-strict">
                <label>Nom du produit</label>
                <input
                    type="text"
                    placeholder="Nom du produit"
                    value={title}
                    onChange={ev => setTitle(ev.target.value)}
                />
            </div>

            <div className="form-group">
                <label>Niveau</label>
                <select
                    className="form-select"
                    value={level}
                    onChange={ev => setLevel(ev.target.value)}
                >
                    <option value="debutant">Débutant</option>
                    <option value="intermediaire">Intermédiaire</option>
                    <option value="expert">Expert</option>
                </select>
            </div>

            <div className="form-group-strict">
                <label>Prix</label>
                <input
                    type="number"
                    placeholder="Prix"
                    value={price}
                    onChange={ev => setPrice(ev.target.value)}
                />
            </div>

            <div className="form-group">
                <label>Saison</label>
                <select
                    className="form-select"
                    value={saison}
                    onChange={ev => setSaison(ev.target.value)}
                >
                    <option value="ete">Eté</option>
                    <option value="hiver">Hiver</option>
                    <option value="allSaison">Tout saison</option>
                </select>
            </div>

            <div className="form-group-strict">
                <label>Description</label>
                <textarea
                    placeholder="Description"
                    value={description}
                    onChange={ev => setDescription(ev.target.value)}
                ></textarea>
            </div>

            <button type="submit" className="btn-primary">
                Sauvegarder
            </button>

        </form>
    );
}