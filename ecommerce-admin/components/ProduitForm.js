import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

export default function ProduitForm({
    _id,
    title: existingtitle,
    description: existingdescription,
    price: existingprice,
    categorie: assignedcategorie,
    images:existingImages,
    proprietes: assignedProprietes,
}) {
    const [title, setTitle] = useState(existingtitle || '');
    const [price, setPrice] = useState(existingprice || '');
    const [images,setImages] = useState(existingImages || []);
    const [description, setDescription] = useState(existingdescription || '');
    const [categorie, setCategorie] = useState(assignedcategorie || '');
    const [productProprietes, setProductProprietes] = useState(assignedProprietes || {});
    const [goToProduits, setGoToProduits] = useState(false);
    const [categories, setCategories] = useState([]);
    const router = useRouter();
    useEffect(() => {
        axios.get('/api/categories').then(result => {
            setCategories(result.data);
        })
    }, []);

    async function saveProduct(ev) {
        ev.preventDefault();

        if (!categorie) {
            alert("Selectionner une categorie !")
            return;
        };

        const data = {
            title, price, description, categorie,
            images, proprietes : productProprietes,};

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

    async function uploadImages(ev) {
        const files = ev.target?.files;
        if (files?.length > 0) {
            const data = new FormData();
            for (const file of files) {
                data.append('file', file);
            }
            const res = await axios.post ('/api/upload/', data);
            setImages(oldImages => {
                return [...oldImages, ...res.data.links];
            });
            
        }
    }

    function setProductProp(propName, value) {
        setProductProprietes(prev => {
            const newProductProps = { ...prev };
            newProductProps[propName] = value;
            return newProductProps
        })
    }

    const proprietesToFill = [];
    if (categories.length > 0 && categorie) {
        let catInfo = categories.find(({ _id }) => _id === categorie);
        proprietesToFill.push(...catInfo.proprietes);
        while (catInfo?.parent?._id) {
            const parentCat = categories.find(({ _id }) => _id ===
                catInfo?.parent?._id);
            proprietesToFill.push(parentCat.proprietes);
            catInfo = parentCat;
        }
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

            <label className="flex gap-1 mb-1">Catégorie</label>
            <select value={categorie}
                onChange={ev => setCategorie(ev.target.value)}>
                <option value=''>Ucategorized</option>
                {categories.length > 0 && categories.map(c => (
                    <option value={c._id}>{c.name}</option>
                ))}
            </select>

            <label
            className="flex gap-1 mb-1"
            >Propriété</label>
            {proprietesToFill.length > 0 && proprietesToFill.map(p => (
                
                <div className="flex gap-1">
                    {p.name}
                    <select
                        value={productProprietes[p.name]}
                        onChange={ev => setProductProp(p.name, ev.target.value)}>

                        {p.values.map(v => (
                            <option value={v}>{v}</option>
                        ))}
                    </select>
                </div>
            ))}

            <div className="form-group-strict">
                <label>Photo</label>
                <div className="mt-2 flex flex-wrap gap-2">
                   {!!images?.length && images.map(link => (
                    <div key={link} className="h-24">
                        <img src={link} alt="" className="rounded-lg"/>
                    </div>
                   ))}
                    <label className="w-24 h-24 border flex text-center cursor-pointer items-center justify-center text-sm gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-upload" viewBox="0 0 16 16">
                            <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5" />
                            <path d="M7.646 1.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 2.707V11.5a.5.5 0 0 1-1 0V2.707L5.354 4.854a.5.5 0 1 1-.708-.708z" />
                        </svg>
                        <div>upload</div>
                        <input
                            type="file"
                            className="hidden"
                            onChange={uploadImages} />
                    </label>
                        <div>
                            Pas de Photo
                        </div>
                
                </div>
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

        </form >
    );
}