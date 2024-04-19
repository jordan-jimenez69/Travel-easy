import Layout from "@/components/layout"

export default function NewProduct() {
return (
<Layout>
    <h1>Ajouté un nouveau Produit</h1>
    <label>Nom du produit</label>
    <input type="text" placeholder="Nom du produit"/>

    <label>Niveau</label>
    <input type="text" placeholder="Niveau"></input>

    <label>Prix</label>
    <input type="number" placeholder="Prix"></input>

    <label>Description</label>
    <textarea placeholder="Description"></textarea>

    <button className="btn-primary">Sauvegarder</button>
</Layout>
);
}