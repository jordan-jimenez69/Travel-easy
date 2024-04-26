import { useRouter } from "next/router";
import Layout from "@/components/layout";
import axios from "axios";
import { useEffect, useState } from "react";

export default function DeleteProduitPage() {
    const router = useRouter();
    const [produitInfo, setProduitInfo] = useState();
    const { id } = router.query
    useEffect(() => {
        if (!id) {
            return;
        }
        axios.get('/api/produits?id=' + id).then(response => {
            setProduitInfo(response.data);
        });
    }, [id]);
    function goBack() {
        router.push('/produits')
    }

    async function DeleteProduit() {
        await axios.delete('/api/produits?id=' + id);
        goBack();
        }

    return (
            <Layout>
                <h1 className="text-center">Vous voulez vous vraiment supprimer
                    &nbsp;"{produitInfo?.title}" ?
                </h1>
                <div className="flex gap-2 justify-center">

                    <button
                        onClick={DeleteProduit}
                        className="btn-red">Oui
                    </button>

                    <button className="btn-default"
                        onClick={goBack}>Non</button>
                </div>

            </Layout>
        )
    } 