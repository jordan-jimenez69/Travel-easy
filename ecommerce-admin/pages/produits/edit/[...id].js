import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ProduitForm from "@/components/ProduitForm"
import Layout from "@/components/layout";

export default function EditProduitPage() {
    const [produitInfo, setproduitInfo] = useState(null);
    const router = useRouter();
    const { id } = router.query
    useEffect(() => {
        if (!id) {
            return;
        }
        axios.get('/api/produits?id=' + id).then(response => {
            setproduitInfo(response.data);
        })
    }, [id]);
    return (
        <Layout>

            <h1>Modifier Produit</h1>
            {produitInfo && (

                <ProduitForm {...produitInfo} />
            )}
        </Layout>
    )
} 