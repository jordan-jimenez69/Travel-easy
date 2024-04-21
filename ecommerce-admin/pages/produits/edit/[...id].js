/*import Layout from "@/components/layout";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function EditProduitPage() {
    const router = useRouter();
    const { id } = router.query
    useEffect(() => {
        if (!id){
            return;
        }
        axios.get('/api/produits?id=' + id).then(response => {
            console.log(response.data);
        })
    }, [id]);
    return (
        <Layout>
            Page edit
        </Layout>
    )
} */