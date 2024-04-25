import ProduitForm from "@/components/ProduitForm.js"
import Layout from "@/components/layout"
import { useRouter } from "next/router";

export default function NewProduct() {
    const router = useRouter();
    function goBack() {
        router.push('/produits')
    }
    return (
        <Layout>
            <h1>Ajouté un nouveau Produit</h1>
            <ProduitForm></ProduitForm>
            <button className="btn-return-product"
                onClick={goBack}>Retour</button>
        </Layout>
    )
}