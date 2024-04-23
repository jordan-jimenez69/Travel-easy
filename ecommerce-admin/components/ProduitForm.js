import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

export default function ProduitForm ({
    title:existingtitle, 
    description:existingdescription, 
    price:existingprice, 
    level:existinglevel
}) {
    const [title, setTitle] = useState(existingtitle || '');
    const [level, setLevel] = useState(existinglevel || '');
    const [price, setPrice] = useState(existingprice ||'');
    const [description, setDescription] = useState(existingdescription ||'');
    const [goToProduits, setGoToProduits] = useState(false);
    const router = useRouter();

    async function createProduct(ev) {
        ev.preventDefault();
        const data = { title, level, price, description };
        await axios.post('/api/produits', data);

        setGoToProduits(true);
    }
    if (goToProduits) {
        router.push('/produits');
    }

    return (
            <form onSubmit={createProduct}>

                <label>Nom du produit</label>
                <input type="text" placeholder="Nom du produit"
                    value={title} onChange={ev => setTitle(ev.target.value)} />

                <label>Niveau</label>
                <input type="text" placeholder="Niveau"
                    value={level} onChange={ev => setLevel(ev.target.value)}></input>

                <label>Prix</label>
                <input type="number" placeholder="Prix"
                    value={price} onChange={ev => setPrice(ev.target.value)}></input>

                <label>Description</label>
                <textarea placeholder="Description"
                    value={description} onChange={ev => setDescription(ev.target.value)}></textarea>

                <button type="submit"
                    className="btn-primary">Sauvegarder</button>

            </form>
    );
}