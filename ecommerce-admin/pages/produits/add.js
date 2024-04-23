import ProduitForm from "@/components/ProduitForm.js"
import Layout from "@/components/layout"

export default function NewProduct() {
 return (
    <Layout>
        <h1>Ajouté un nouveau Produit</h1>
        <ProduitForm></ProduitForm>
    </Layout>
)
}